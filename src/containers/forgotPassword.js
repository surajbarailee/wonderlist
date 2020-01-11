import React, { Component } from "react";
import "../app.css";

export default class forgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
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
              style={{ width: "90%", height: "30px", fontSize: "20px" }}
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="buttons">
            <input
              type="button"
              value="Cancel"
              className="button cancel"
              onClick={this.props.forgotPassword}
            />
            <input
              type="button"
              value="ResetPassword"
              className="button"
              onClick={() => {
                this.props.resetPassword(this.state.email);
              }}
            />
            <br />
            {this.props.error}
          </div>
        </div>
      </div>
    );
  }
}
