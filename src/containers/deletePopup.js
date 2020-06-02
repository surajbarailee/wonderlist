import React, { Component } from "react";

export default class DeletePopup extends Component {
  render() {
    return (
      <div className="delete-popup-container">
        <div className="delete-popup">
          <div className="delete-message">
            <h2>Delete To-do?</h2>
            <h4>The to-do will be deleted forever</h4>
          </div>
          <div className="buttons">
            <input
              type="button"
              value="Delete"
              className="buttoncss"
              style={{ width: "150px" }}
              onClick={() => this.props.deleteFunctionExecute("delete")}
            />
            <input
              type="button"
              value="Cancel"
              className="buttoncss"
              style={{ width: "150px" }}
              onClick={() => this.props.deleteFunctionExecute("cancel")}
            />
          </div>
        </div>
      </div>
    );
  }
}
