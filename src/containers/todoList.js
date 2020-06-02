import React, { Component } from "react";
import "../app.css";
import star from "../wallpapers/star.png";
import starred from "../wallpapers/starred.svg";

export default class todoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      value: this.props.value,
      comment: this.props.comment,
      DefaultChecked: this.props.DefaultChecked,
      date: this.props.date,
      starred: this.props.starred,
      visible: false,
      x: 0,
      y: 0,
    };
  }
  showFunctionBar = () => {
    this.props.showFunctionBar(this.state.id);
  };

  render() {
    return (
      <div className="todolist-container">
        <div className="todolist" id={this.props.id}>
          <input
            type="checkbox"
            checked={this.state.DefaultChecked}
            onChange={() => {
              this.props.todoListChanger(
                this.state.id,
                this.state.DefaultChecked
              );
            }}
          />
          <div
            onClick={this.showFunctionBar}
            onContextMenu={this.handleClickMouse}
          >
            {this.props.value}
          </div>
          <img
            src={this.props.starred ? starred : star}
            alt="star"
            className="star"
            onClick={() => {
              this.props.starredFunction(this.props.id, this.props.starred);
            }}
          />
        </div>
        {/* {righclickDiv} */}
      </div>
    );
  }
}
