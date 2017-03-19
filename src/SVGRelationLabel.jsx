import React from "react";
import BaseComponent from "./BaseComponent";

export default class SVGRelationLabel extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      offsetX: 0,
      offsetY: 0 // unused
    };
  }
  componentDidMount() {
    if (this.refs.text) {
      const rect = this.refs.text.getBoundingClientRect();
      this.setState({
        offsetX: rect.width / 2,
        offsetY: rect.height / 2
      });
    }
  }
  render() {
    const { text, x, y, labelId, relLabelHovered, onMouseOver, onMouseOut } = this.props;
    const { offsetX, offsetY } = this.state;
    const { theme } = this.context;
    const weight = (labelId == relLabelHovered) ? "bold" : "normal";
    return (
      <foreignObject x={x - offsetX} y={y} ref="container">
        <span className="relationLabel" ref="text" xmlns="http://www.w3.org/1999/xhtml" style={{
          padding: theme.relationLabelPadding,
          color: theme.relationLabelColor,
          backgroundColor: theme.relationLabelBgColor,
          fontSize: theme.relationLabelFontSize,
          fontWeight: weight,
          pointerEvents: "auto"
        }} onMouseOver={onMouseOver.bind(this, labelId)} onMouseOut={onMouseOut.bind(this)} >
          {text}
        </span>
      </foreignObject>
    );
  }
}
