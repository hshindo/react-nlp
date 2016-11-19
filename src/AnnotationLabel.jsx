import React from "react";
import currentTheme from "./Theme";

class AnnotationLabel extends React.Component {
  render() {
    const { text, color, onMouseOver, onMouseOut } = this.props;
    return (
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
    );
  }
}

/**
 * Use for height detection.
 */
export class AnnotationLabelLayoutOnly extends React.Component {
  render() {
    return (
      <span style={{
        border: currentTheme.labelBorder,
        borderRadius: 3,
        padding: currentTheme.labelPadding,
        visibility: "hidden",
        display: "block"
      }}>_DUMMY_</span>
    );
  }
}
export default AnnotationLabel;
