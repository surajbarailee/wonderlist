import React, { Component } from "react";
import "../src/app.css";
const formcss = {
  textAlign: "center"
};
const inputcss = {
  height: "30px",
  width: "250px",
  fontFamily: "Arial",
  fontSize: "20px",
  borderRadius: "5px",
  border: "1px solid black",
  padding: "5px",
  margin: "10px"
};
export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  loginValues = e => {
    e.preventDefault();
    this.props.signup(this.state.email, this.state.password);
  };

  render() {
    return (
      <div style={formcss} className="main-wrapper">
        <form onSubmit={this.loginValues}>
          <input
            style={inputcss}
            type="email"
            placeholder="Email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            required
          />
          <br />
          <input
            style={inputcss}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
            required
          />

          <br />
          <input
            type="submit"
            value="Signup"
            className="Buttoncss "
            style={{
              width: "100px",
              height: "35px",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "2px"
            }}
          />
          <br />
          <button
            onClick={() => {
              this.props.newUser(false);
            }}
            className="Buttoncss "
            style={{
              width: "100px",
              height: "35px",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "2px"
            }}
          >
            LogIn
          </button>
          <br />
          {this.props.warning}
        </form>
      </div>
    );
  }
}
