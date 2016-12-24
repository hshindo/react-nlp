import React from "react";
import BaseComponent from "./BaseComponent";

class SVGConnectorMarker extends BaseComponent {
  render() {
    const { id } = this.props;
    return (
      <marker id={id} viewBox="0 0 10 10" refX="5" refY="5" markerUnits="strokeWidth" preserveAspectRatio="none" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <polygon points="0,0 0,10 10,5" fill={this.context.theme.relationColor} />
      </marker>
    );
  }
}

export default SVGConnectorMarker;
