import React, { Component } from "react";
import "./Loading.css";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
};
export default class Loading extends Component {
  state = {
    showloader: false,
  };
  render() {
    if (this.state.showloader) {
      return (
        <div style={{ margin: "0 auto", textAlign: "center" }}>
          Oops!! It seems you dont have any todos...
        </div>
      );
    } else {
      setTimeout(() => {
        this.setState({ showloader: true });
      }, 5000);
      return <div className="loader" style={style}></div>;
    }
  }
}
