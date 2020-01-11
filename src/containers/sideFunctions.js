import React, { Component } from "react";
import "../app.css";
import star from "../wallpapers/star.png";
import starred from "../wallpapers/starred.svg";
import deleteicon from "../others/delete.svg";
import backicon from "../others/rightarrow.png";
import DeletePopup from "./deletePopup";

export default class sideFunctions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.data.value,
      check: this.props.data.DefaultChecked,
      comment: this.props.data.comment,
      starred: this.props.data.starred,
      deletepopup: false,
      email: this.props.username.replace("dot", ".")
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.todoListChanger = this.todoListChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFunction = this.deleteFunction.bind(this);
    this.deleteFunctionExecute = this.deleteFunctionExecute.bind(this);
  }
  handleSubmit() {
    this.props.changetodo(this.state.inputValue, this.props.data.id);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      inputValue: e.target.value
    });
  }
  todoListChanger(change) {
    if (change === "checked") {
      if (this.state.check === "") {
        var value = this.props.data.DefaultChecked;
        this.setState({
          check: !value
        });
      } else {
        this.setState(prevState => ({
          check: !prevState.check
        }));
      }
      this.props.todoListChanger(this.props.data.id, this.state.check);
    }
    if (change === "starred") {
      if (this.state.check === "") {
        value = this.props.data.starred;
        this.setState({
          starred: !value
        });
      } else {
        this.setState(prevState => ({
          starred: !prevState.starred
        }));
      }
      this.props.starredFunction(this.props.data.id, this.state.starred);
    }
  }
  handleComment(e) {
    this.setState({
      comment: e.target.value
    });
  }
  handleSubmitComment() {
    this.props.todoCommentChanger(this.props.data.id, this.state.comment);
  }
  deleteFunction() {
    this.setState({
      deletepopup: true
    });
  }
  deleteFunctionExecute(value) {
    if (value === "delete") {
      this.props.deleteFunction(this.props.data.id);
      this.props.openCloseFunction();
    }

    this.setState({
      deletepopup: false
    });
  }

  render() {
    return (
      <div className="functions-div-open">
        <div
          className="todolist"
          style={{
            padding: "20px 0px 10px 0px",
            borderBottom: "1px solid #f0f0f0"
          }}
        >
          <input
            type="checkbox"
            checked={this.state.check}
            onChange={() => {
              this.todoListChanger("checked");
            }}
          />
          <div>
            <form
              onSubmit={() => {
                this.handleSubmit(this.state.inputValue, this.props.data.id);
              }}
            >
              <input
                type="text"
                value={this.state.inputValue}
                style={{
                  width: "90%",
                  height: "30px",
                  border: "none",
                  fontSize: "15px"
                }}
                onChange={this.handleChange}
              />
            </form>
          </div>
          <img
            src={this.state.starred ? starred : star}
            alt="star"
            className="star"
            onClick={() => {
              this.todoListChanger("starred");
            }}
          />
        </div>
        <div className="comment-body">
          Comments
          <hr />
          <b>{this.state.email}</b>
          <br />{" "}
          <label style={{ paddingLeft: "10px" }}>{this.state.comment}</label>
        </div>
        <div className="comment-container">
          <form
            onSubmit={this.handleSubmitComment}
            style={{ textAlign: "center" }}
          >
            <input
              type="text"
              className="comment-box"
              placeholder="Add a comment"
              onChange={this.handleComment}
            />
          </form>
          <div className="bottom-most-container">
            <img
              src={backicon}
              width="18px"
              className="back-arrow"
              alt="backicon"
              onClick={this.props.openCloseFunction}
            />
            <label>Created on {this.props.data.date}</label>
            <div className="delete-icon">
              <img
                src={deleteicon}
                width="18px"
                className="back-arrow"
                alt="deleteicon"
                onClick={this.deleteFunction}
              />
            </div>
          </div>
        </div>
        {this.state.deletepopup ? (
          <DeletePopup deleteFunctionExecute={this.deleteFunctionExecute} />
        ) : null}
      </div>
    );
  }
}
