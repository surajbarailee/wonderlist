import React, { Component } from "react";
import "../src/app.css";
const formcss = {
  paddingTop: "15%",
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
export default class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  loginValues = e => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };
  render() {
    return (
      <div className="main-wrapper">
        <div style={formcss}>
          <form onSubmit={this.loginValues}>
            <input
              type="email"
              placeholder="Email"
              style={inputcss}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              style={inputcss}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              required
            />
            <br />
            <input
              type="submit"
              value="Login"
              className="Buttoncss "
              style={{
                width: "100px",
                height: "35px",
                fontSize: "20px",
                padding: "5px",
                borderRadius: "2px"
              }}
            />
          </form>
          <button
            onClick={this.props.newUser}
            className="Buttoncss "
            style={{
              width: "80px",
              height: "35px",
              fontSize: "20px",
              padding: "5px",
              borderRadius: "2px"
            }}
          >
            SignUp
          </button>
          <br />
          <label onClick={this.props.forgotPassword} className="forgotPassword">
            Forgot Password
          </label>
          <br />
          {this.props.warning}
        </div>
      </div>
    );
  }
}
