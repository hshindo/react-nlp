import React from "react";
import BaseComponent from "./BaseComponent";

class AnnotationLabel extends BaseComponent {
  render() {
    const { text, color, isTarget, onMouseOver, onMouseOut, id } = this.props;
    const { theme } = this.context;
    const widthValue = isTarget ? 2 : 1;
    return (
      <span style={{
        position: "absolute",
        left: "50%",
        backgroundColor: color,
        border: theme.labelBorder,
        borderWidth: widthValue,
        borderRadius: 0,
        transform: "translateX(-50%)",
        color: theme.labelColor,
        padding: theme.labelPadding,
        whiteSpace: "nowrap",
        cursor: "pointer",
        fontSize: theme.labelFontSize
      }} onMouseOver={onMouseOver} onMouseOut={onMouseOut} id={id}>{text}</span>
    );
  }
}

/**
 * Use for height detection.
 */
export class AnnotationLabelLayoutOnly extends BaseComponent {
  render() {
    const { theme } = this.context;
    return (
      <span style={{
        border: theme.labelBorder,
        borderRadius: 0,
        padding: theme.labelPadding,
        visibility: "hidden",
        display: "block",
        fontSize: theme.labelFontSize
      }}>_DUMMY_</span>
    );
  }
}
export default AnnotationLabel;
