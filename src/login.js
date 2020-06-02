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
export default class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  loginValues = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
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
              type="email"
              placeholder="Email"
              className="inputcss"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              className="inputcss"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              required
            />
            <br />
            <input type="submit" value="Login" className="buttoncss" />
          </form>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <label
              onClick={this.props.forgotPassword}
              className="forgotPassword"
            >
              Forgot Password
            </label>
          </div>
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            <span onClick={this.props.newUser} className="signup">
              Create a new Account
            </span>
          </div>

          <div className="warning">{this.props.warning}</div>
        </div>
      </div>
    );
  }
}
