import React from "react";
import currentTheme from "./Theme";

class AnnotationLabel extends React.Component {
  render() {
    const { text, color, onMouseOver, onMouseOut } = this.props;
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
          padding: currentTheme.labelPadding,
          whiteSpace: "nowrap",
          cursor: "pointer"
        }} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>{text}</span>
      </div>
    );
  }
}

export default AnnotationLabel;
