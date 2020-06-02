import React, { Component } from "react";
import "../src/app.css";
import mylogo from "./wallpapers/mylogo.png";
const formcss = {
  paddingTop: "10%",
  textAlign: "center",
};
const logocss = {
  width: "200px",
};
export default class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  loginValues = (e) => {
    e.preventDefault();
    this.props.signup(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className="main-wrapper">
        <div style={formcss}>
          <div>
            <img src={mylogo} alt="logo" style={logocss} />
          </div>
          <form onSubmit={this.loginValues}>
            <input
              className="inputcss"
              type="email"
              placeholder="Email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              required
            />
            <br />
            <input
              className="inputcss"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              required
            />

            <br />
            <input type="submit" value="Signup" className="buttoncss" />
          </form>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              this.props.newUser(false);
            }}
          >
            Login
          </span>
          <br />
          <div className="warning">{this.props.warning}</div>
        </div>
      </div>
    );
  }
}
