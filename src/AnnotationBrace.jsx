import React from "react";

class AnnotationBrace extends React.Component {
  render() {
    const bodyStyle = {
      position: "relative",
      width: "100%",
      height: "30%"
    };
    const lineStyle = {
      position: "absolute",
      display: "block",
      color: "#fff",
      width: "100%",
      height: "5px",
      bottom: 0,
      boxSizing: "border-box",
      borderTop: "solid 1px black",
      borderLeft: "solid 1px black",
      borderRight: "solid 1px black",
      borderTopLeftRadius: "3px",
      borderTopRightRadius: "3px"
    };
    const arrowBaseStyle = {
      display: "block",
      position: "absolute",
      height: 0,
      width: 0,
      bottom: "5px",
      left: "50%",
      transform: "translateX(-50%)",
      borderWidth: "3px",
      borderColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: 0,
      borderBottomColor: "black"
    };
    const arrowOverlayStyle = {
      display: "block",
      position: "absolute",
      height: 0,
      width: 0,
      bottom: "4px",
      left: "50%",
      transform: "translateX(-50%)",
      borderWidth: "3px",
      borderColor: "transparent",
      borderStyle: "solid",
      borderTopWidth: 0,
      borderBottomColor: "white"
    };
    return (
      <div style={bodyStyle}>
        <span style={arrowBaseStyle}></span>
        <span style={lineStyle}></span>
        <span style={arrowOverlayStyle}></span>
      </div>
    );
  }
}

export default AnnotationBrace;
