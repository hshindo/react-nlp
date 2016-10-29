import React from "react";
import currentTheme from "./Theme";

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
          border: currentTheme.labelBorder,
          borderRadius: 3,
          transform: "translateX(-50%)",
          color: currentTheme.labelColor,
          padding: currentTheme.labelPadding
        }}>{text}</span>
      </div>
    );
  }
}

export default AnnotationLabel;
