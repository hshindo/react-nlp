import React from "react";

class AnnotationLabel extends React.Component {
  render() {
    const { text, color } = this.props;
    return (
      <div style={{
        position: "relative",
        width: "100%",
        height: "70%"
      }}>
        <span style={{
          position: "absolute",
          left: "50%",
          backgroundColor: color,
          border: "solid 1px gray",
          borderRadius: 3,
          transform: "translateX(-50%)",
          padding: "2px 3px"
        }}>{text}</span>
      </div>
    );
  }
}

export default AnnotationLabel;
