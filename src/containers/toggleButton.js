import React, { Component } from "react";

export default class toggleButton extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));

    this.props.hideToDo();
  }
  render() {
    return (
      <div style={{ width: "90%", margin: "0 auto" }}>
        <button className="Buttoncss" onClick={this.handleClick}>
          {this.state.toggle
            ? `${this.props.data()} COMPLETED TO-DOS`
            : "HIDE COMPLETED TO-DOS"}
        </button>
      </div>
    );
  }
}
