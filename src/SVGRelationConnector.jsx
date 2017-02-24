import React from "react";
import BaseComponent from "./BaseComponent";
import SVGRelationLabel from "./SVGRelationLabel";

function detectCurvePoint(t1, t2) {
  const minX = Math.min(t1.x, t2.x);
  const minY = Math.min(t1.y, t2.y);

  let xMargin = Math.abs(t2.x - t1.x);
  let yMargin = Math.abs(t2.y - t1.y);
  
  if (t1.x < t2.x) {
    xMargin = xMargin + (t1.width-t2.width)*1/2;
  } else if (t1.x > t2.x) {
    xMargin = xMargin - (t1.width-t2.width)*1/2;
  }
  
  const x = minX + (xMargin / 2);
  let y = minY + (yMargin);
  
  return {x: x, y: y - 18};
}

class SVGRelationConnector extends BaseComponent {
  render() {
    const { markerType, markerId, start, end, label, heightAdj } = this.props;
    const markerUrl = "url(#" + markerId + ")";
    const cp = detectCurvePoint(start, end);
    
    let pad = (start.x < end.x) ? 5 : -5;
  
    let height = 15*heightAdj;
    let labelHeight = height;
    
    let startX = start.x;
    let endX = end.x;
    if (start.x < end.x) {
      startX += start.width * 1/2;
      endX -= end.width * 1/2;
    } else if (start.x > end.x) {
      startX -= start.width * 1/2;
      endX += end.width * 1/2;
    }
    
    let dAttr = "M" + (startX|0) + "," +(start.y|0) + " L " + (startX + pad|0) + "," + (cp.y - height|0) + " " + (endX - pad|0) + "," + (cp.y-height|0) + " " + (endX|0) + "," + (end.y-2|0);
    
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
        <SVGRelationLabel text={label} x={cp.x|0} y={cp.y-15 - labelHeight|0} />
      </g>
    )
  }
}

export default SVGRelationConnector;
