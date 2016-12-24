import React from "react";
import BaseComponent from "./BaseComponent";

class SVGCanvas extends BaseComponent {
  render() {
    const {width, height} = this.props;
    return (
      <svg width={width} height={height}>
        {this.props.children}
      </svg>
    )
  }
}

export default SVGCanvas;
