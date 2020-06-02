import React from "react";
import "./app.css";
import Topbar from "./containers/topBar";
import InputBox from "./containers/inputBox";
import TodoList from "./containers/todoList.js";
import ToggleButton from "./containers/toggleButton.js";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import Loading from "./containers/Loading";
import SideFunctions from "./containers/sideFunctions";
import Login from "./login";
import Signup from "./signup";
import Verify from "./containers/verify.js";
import ForgotPassword from "./containers/forgotPassword";

let audio = new Audio("/click.mp3");
let audio1 = new Audio("/unclick.mp3");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      list: [],
      todoExists: false,
      hidedata: false,
      user: null,
      functionopen: false,
      todoIndex: {},
      email: "",
      newUser: false,
      changed: "",
      verified: true,
      error: "",
      forgotPassword: false,
      forgotemail: "",
    };
  }

  componentDidMount() {
    this.app = firebase.initializeApp(DB_CONFIG);
    this.app.auth().onAuthStateChanged((user) => {
      if (user) {
        var path = user.email.replace(".", "dot");
        this.setState(
          { user, email: path, verified: user.emailVerified },
          () => {
            this.db = this.app
              .database()
              .ref()
              .child(`wonderlist/${this.state.email}/`);
            var previousState = this.state.list;
            this.db.on("child_added", (snap) => {
              previousState.push({
                id: snap.key,
                body: snap.val().body,
                comment: snap.val().comment,
                checked: snap.val().checked,
                date: snap.val().date,
                starred: snap.val().starred,
              });
              this.setState({
                list: previousState,
              });
            });
            this.db.on("child_changed", (snap) => {
              var objIndex;
              if (this.state.changed === "checked") {
                objIndex = previousState.findIndex(
                  (obj) => obj.id === snap.key
                );
                previousState[objIndex].checked = !previousState[objIndex]
                  .checked;
                this.setState({
                  list: previousState,
                  changed: "",
                });
              }
              if (this.state.changed === "starred") {
                objIndex = previousState.findIndex(
                  (obj) => obj.id === snap.key
                );
                previousState[objIndex].starred = !previousState[objIndex]
                  .starred;
                this.setState({
                  list: previousState,
                  changed: "",
                });
              }
            });
            this.db.on("child_removed", (snap) => {
              var filtered = this.state.list.filter(function (el) {
                return el.id !== snap.key;
              });

              this.setState({
                list: filtered,
              });
            });
          }
        );
      } else {
        this.setState({ user: null });
      }
    });
  }
  newUser = () => {
    this.setState((prevState) => ({
      newUser: !prevState.newUser,
      error: "",
    }));
  };
  deleteFunction = (id) => {
    var database = firebase.database();
    database.ref(`wonderlist/${this.state.email}/${id}`).remove();
  };
  hideToDo = () => {
    this.setState((prevState) => ({
      hidedata: !prevState.hidedata,
    }));
  };
  todoCommentChanger = (id, comment) => {
    var database = firebase.database();

    database
      .ref(`wonderlist/${this.state.email}/${id}`)
      .update({ comment }, () => {
        var newlist = this.state.list;
        var i;
        for (i = 0; i < newlist.length; i++) {
          if (id === this.state.list[i].id) {
            newlist[i].comment = comment;
            break;
          }
        }
        this.setState({
          list: [...newlist],
        });
      });
  };
  counterFunction = () => {
    var count = this.state.list.reduce(
      (acc, cur) => (cur.checked === true ? ++acc : acc),
      0
    );

    return count;
  };

  showFunctionBar = (id) => {
    var i;
    var value, comment, DefaultChecked, date, starred;
    var newlist = this.state.list;
    for (i = 0; i < newlist.length; i++) {
      if (id === this.state.list[i].id) {
        value = this.state.list[i].body;
        comment = this.state.list[i].comment;
        DefaultChecked = this.state.list[i].DefaultChecked;
        date = this.state.list[i].date;
        starred = this.state.list[i].starred;
        break;
      }
    }
    this.setState(
      {
        functionopen: false,
        todoIndex: {
          id: id,
          value: value,
          comment: comment,
          DefaultChecked: DefaultChecked,
          date: date,
          starred: starred,
        },
      },
      () => {
        this.setState({ functionopen: true });
      }
    );
  };
  changetodo = (newtodo, id1) => {
    var i;
    var newlist = this.state.list;
    for (i = 0; i < newlist.length; i++) {
      if (id1 === this.state.list[i].id) {
        console.log("found");
        newlist[i].body = newtodo;
        break;
      }
    }
    this.setState({
      list: [...newlist],
    });

    var database = firebase.database();
    database.ref(`wonderlist/${this.state.email}/${id1}/body`).set(newtodo);
  };
  todoListChanger = (id1, status) => {
    this.setState(
      {
        changed: "checked",
      },
      () => {
        if (!status) {
          audio.play();
        } else {
          audio1.play();
        }
        var database = firebase.database();
        database
          .ref(`wonderlist/${this.state.email}/${id1}/checked`)
          .set(!status);
      }
    );
  };
  starredFunction = (idStar, statusStar) => {
    this.setState(
      {
        changed: "starred",
      },
      () => {
        if (!statusStar) {
          audio.play();
        } else {
          audio1.play();
        }
        var database = firebase.database();
        database
          .ref(`wonderlist/${this.state.email}/${idStar}/starred`)
          .set(!statusStar);
      }
    );
  };
  forgotPassword = () => {
    this.setState((prevState) => ({
      forgotPassword: !prevState.forgotPassword,
      error: "",
    }));
  };
  addList = (holder) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "/" + mm + "/" + yyyy;

    this.app
      .database()
      .ref()
      .child(`wonderlist/${this.state.email}/`)
      .push()
      .set({
        body: holder,
        comment: "Nothing",
        checked: false,
        date: today,
        starred: false,
      });
  };
  openCloseFunction = () => {
    this.setState({ functionopen: false });
  };
  resetPassword = (emailAddress) => {
    var auth = firebase.auth();

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => {
        this.setState({
          error: "Reset Email sent Successfully",
          forgotemail: "",
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };
  signup = (email, password) => {
    this.app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };
  login = (email, password) => {
    this.app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };
  signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          email: "",
        });
      })
      .catch(function (error) {
        console.log("could not signout for some reason", error.message);
      });
  };

  verifyEmail = () => {
    var user = firebase.auth().currentUser;
    if (!user.emailVerified) {
      user
        .sendEmailVerification()
        .then(() => {
          this.setState({
            error: "message sent",
            newUser: false,
            forgotPassword: false,
            user: null,
          });
        })
        .catch((error) => {
          console.log("not found");
          this.setState({ error: error.message });
        });
    } else {
      this.setState({
        error: "seems the email trying to be used has already registered",
      });
    }
  };
  orderFunction = (orderType) => {
    if (orderType === "alphabet") {
      function compareValues(key, order = "asc") {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }

          const varA =
            typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
          const varB =
            typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return order === "desc" ? comparison * -1 : comparison;
        };
      }
      var newlist = this.state.list.sort(compareValues("body", "asc"));
      this.setState({
        list: newlist,
      });
    } else {
      var templist = [];
      this.state.list.map((list) => {
        if (list.starred) {
          templist.splice(0, 0, list);
          return null;
        } else {
          templist.push(list);
          return null;
        }
      });

      this.setState({
        list: templist,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.forgotPassword ? (
          <ForgotPassword
            forgotPassword={this.forgotPassword}
            error={this.state.error}
            resetPassword={this.resetPassword}
          />
        ) : null}
        {this.state.user === null ? (
          this.state.newUser ? (
            <Signup
              signup={this.signup}
              newUser={this.newUser}
              warning={this.state.error}
            />
          ) : (
            <Login
              login={this.login}
              newUser={this.newUser}
              warning={this.state.error}
              forgotPassword={this.forgotPassword}
            />
          )
        ) : (
          <div className="main-wrapper">
            {!this.state.verified ? (
              <Verify
                verifyEmail={this.verifyEmail}
                warning={this.state.error}
              />
            ) : (
              <div
                className="app"
                style={
                  this.state.functionopen ? { marginRight: "350px" } : null
                }
              >
                <div>
                  <Topbar
                    orderFunction={this.orderFunction}
                    signout={this.signout}
                  />
                  <InputBox addList={this.addList} />
                  {this.state.list.length === 0 ? (
                    <Loading />
                  ) : (
                    <div className="otherComponent">
                      {this.state.list.map((todos) => {
                        if (!todos.checked) {
                          return (
                            <TodoList
                              value={todos.body}
                              key={todos.id}
                              id={todos.id}
                              DefaultChecked={todos.checked}
                              date={todos.date}
                              todoListChanger={this.todoListChanger}
                              showFunctionBar={this.showFunctionBar}
                              comment={todos.comment}
                              starred={todos.starred}
                              starredFunction={this.starredFunction}
                              todos={todos}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                      <ToggleButton
                        data={this.counterFunction}
                        hideToDo={this.hideToDo}
                      />

                      {this.state.list.map((todos) => {
                        if (todos.checked && !this.state.hidedata) {
                          return (
                            <TodoList
                              value={todos.body}
                              key={todos.id}
                              id={todos.id}
                              date={todos.date}
                              DefaultChecked={todos.checked}
                              todoListChanger={this.todoListChanger}
                              showFunctionBar={this.showFunctionBar}
                              comment={todos.comment}
                              starredFunction={this.starredFunction}
                              starred={todos.starred}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  )}
                  {this.state.functionopen ? (
                    <SideFunctions
                      data={this.state.todoIndex}
                      changetodo={this.changetodo}
                      todoListChanger={this.todoListChanger}
                      caller="SideFunction"
                      todoCommentChanger={this.todoCommentChanger}
                      openCloseFunction={this.openCloseFunction}
                      deleteFunction={this.deleteFunction}
                      starredFunction={this.starredFunction}
                      username={this.state.email}
                    />
                  ) : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default App;
