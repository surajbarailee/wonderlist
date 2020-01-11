import React, { Component } from "react";
import "../app.css";
var holder = "";
export default class inputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.addListener = this.addListener.bind(this);
    this.valueSender = this.valueSender.bind(this);
  }
  addListener(e) {
    this.setState({
      value: e.target.value
    });
    holder = e.target.value;
  }
  valueSender(e) {
    e.preventDefault();
    if (holder !== "") {
      this.props.addList(holder);
      this.setState({
        value: ""
      });
    }
  }
  render() {
    return (
      <div className="todoinput-container" style={{ paddingTop: "20px" }}>
        <form onSubmit={this.valueSender}>
          <input
            type="text"
            placeholder="Add a todo.."
            className="todoinput"
            name="todoinput"
            onChange={this.addListener}
            value={this.state.value}
          />
        </form>
      </div>
    );
  }
}
