import React from "react";
const notverified = {
  width: "50%",
  margin: "0 auto",
  border: "1px solid black",
  backgroundColor: "white",
  opacity: "0.7",
  padding: "5px"
};
const button = {
  backgroundColor: "#4CAF50" /* Green */,
  border: "none",
  color: "white",
  padding: "10px 30px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer"
};
export default function verify(props) {
  return (
    <div style={notverified}>
      Please Click the button below to verify your account.We will send you the
      verification link.Please refresh/Re Login the page after verification.
      <br></br>
      <div style={{ textAlign: "center" }}>
        <button style={button} onClick={props.verifyEmail}>
          Verify
        </button>
        <br />
        {this.props.warning}
      </div>
    </div>
  );
}
