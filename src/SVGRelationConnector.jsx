import React from "react";
import BaseComponent from "./BaseComponent";
import SVGRelationLabel from "./SVGRelationLabel";

function detectCurvePoint(t1, t2) {
  const minX = Math.min(t1.x, t2.x);
  const minY = Math.min(t1.y, t2.y);

  const xMargin = Math.abs(t2.x - t1.x);
  const yMargin = Math.abs(t2.y - t1.y);

  let x = minX + (xMargin / 2);
  let y = minY + (yMargin / 2);
  
  if (xMargin < 5) {
    x += 10;
  }
  if (yMargin < 5) {
    y -= 10;
  }

  return {x: x, y: y - 20};
}

class SVGRelationConnector extends BaseComponent {
  render() {
    const { markerType, markerId, start, end, label, heightAdj } = this.props;
    const markerUrl = "url(#" + markerId + ")";
    const cp = detectCurvePoint(start, end);
    
    let height = 13*heightAdj
    let pad = (start.x < end.x) ? 5 : -5;
    let dAttr = "M" + (start.x|0) + "," + (start.y|0) + " L " + (start.x + pad|0) + "," + (cp.y - height|0) + " " + (end.x - pad|0) + "," + (cp.y-height|0) + " " + (end.x|0) + "," + (end.y|0);
    
    let markerStart = null;
    let markerEnd = null;
    switch (markerType) {
      case "ht":
        markerStart = markerUrl;
        break;
      case "th":
        markerEnd = markerUrl;
        break;
      case "hh":
        markerStart = markerUrl;
        markerEnd = markerUrl;
        break;
      case "tt":
      default:
        // nothing to do
    }
    return (
      <g>
        <path d={dAttr} fill="none" stroke={this.context.theme.relationColor} strokeWidth="1" markerStart={markerStart} markerEnd={markerEnd} />
        <SVGRelationLabel text={label} x={cp.x|0} y={cp.y-15 - height|0} />
      </g>
    )
  }
}

export default SVGRelationConnector;
