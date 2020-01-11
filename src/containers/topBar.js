import React, { Component } from "react";
import icon1 from "../others/sort.svg";
import logout from "../others/logout.svg";
import "../app.css";
const TopBar = {
  fontFamily: "Arial",
  fontSize: "20px",
  fontStyle: "normal",
  color: "white",
  backgroundColor: "#668964",
  display: "grid",
  gridTemplateColumns: "auto 50px 50px 30px",
  height: "55px",
  zIndex: "-1"
};

export default class topbar extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }
  render() {
    return (
      <div style={TopBar}>
        <div style={{ margin: "15px 0px 0px 50px" }}>WonderList</div>
        <div className="dropdown ">
          <div className="icons-div">
            <img src={icon1} alt="icon12" className="icons" />
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
            onClick={this.props.signout}
          />
        </div>
      </div>
    );
  }
}
