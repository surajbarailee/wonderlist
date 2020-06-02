import React, { Component } from "react";
import "../app.css";

export default class forgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
    };
  }
  render() {
    return (
      <div className="delete-popup-container">
        <div className="delete-popup">
          <div className="delete-message">
            <h2>Please enter your email address</h2>
            <h4>You will get the link to reset the password in your email</h4>
            <input
              type="email"
              required
              className="inputcss"
              style={{ border: "1px solid black" }}
              value={this.state.email}
              placeholder="Email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div>
            <input
              type="button"
              value="Cancel"
              className="button cancel"
              onClick={this.props.forgotPassword}
            />
            <input
              type="button"
              value="ResetPassword"
              className="buttoncss"
              style={{ width: "300px", marginRight: "15px" }}
              onClick={() => {
                this.props.resetPassword(this.state.email);
              }}
            />

            <div
              style={{ textAlign: "center", margin: "5px", fontSize: "20px" }}
            >
              {this.props.error}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
