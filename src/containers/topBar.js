import React, { Component } from "react";
import icon1 from "../others/sort1.svg";
import logout from "../others/logout1.svg";
import mylogo from "../wallpapers/mylogo.png";
import "../app.css";
const logocss = {
  width: "80px",
};
export default class topbar extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }
  render() {
    return (
      <div className="topBar">
        <div style={{ margin: "0px 0px 0px 70px" }}>
          <img src={mylogo} alt="logo" style={logocss} />
        </div>
        <div className="dropdown ">
          <div className="icons-div">
            <img src={icon1} alt="sorticon" className="icons" />
          </div>

          <div className="dropdown-content ">
            <button
              className="abutton"
              onClick={() => {
                this.props.orderFunction("alphabet");
              }}
            >
              Order By:Alphabet
            </button>
            <button
              className="abutton"
              onClick={() => {
                this.props.orderFunction("starred");
              }}
            >
              Order By:Priority
            </button>
          </div>
        </div>
        <div className="icons-div">
          <img
            src={logout}
            alt="icon12"
            className="icons"
            style={{ height: "20px" }}
            onClick={this.props.signout}
          />
        </div>
      </div>
    );
  }
}
