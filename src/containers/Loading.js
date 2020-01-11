import React, { Component } from "react";
import "./Loading.css";
const style = {
  position: "absolute",
  top: "30%",
  left: "50%"
};
export default class Loading extends Component {
  render() {
    return <div className="loader" style={style}></div>;
  }
}
