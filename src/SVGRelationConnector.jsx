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
  const y = minY + (yMargin);
  return {x: x, y: y};
}

class SVGRelationConnector extends BaseComponent {
  render() {
    const { markerType, markerId, start, end, type, label, heightAdj, isUpper, relLabelHovered, onMouseOver, onMouseOut } = this.props;
    const text = label.split("-")[0];
    const markerUrl = "url(#" + markerId + ")";
    const cp = detectCurvePoint(start, end);
    
	let height = (heightAdj>0) ? 13*heightAdj+10 : 13*heightAdj+10;
    let labelHeight = height;
    
    if (isUpper == true) {cp.y += 18;}
    
	const pad = (start.x <= end.x) ? 10 : -10;
	
	let startX = start.x;
    let endX = end.x;
    if (start.x < end.x) {
      startX += start.width * 1/2;
      endX -= end.width * 1/2;
    } else if (start.x > end.x) {
      startX -= start.width * 1/2;
      endX += end.width * 1/2;
	}
	
	let controlStart = [startX, cp.y-height];
	let controlEnd = [endX, cp.y-height];
	
	let dAttr =	" M " + (startX|0) + "," +(start.y|0) + 
				" Q " + controlStart[0] + "," + controlStart[1] + " " + (startX + pad|0) + "," + (cp.y - height|0) + 
				" M " + (startX + pad|0) + "," + (cp.y - height|0) + 
				" L " + (endX - pad|0) + "," + (cp.y-height|0) + 
				" M " + (endX - pad|0) + "," + (cp.y-height|0) + 
				" Q " + controlEnd[0] + "," + controlEnd[1] + " " + + (endX|0) + "," + (end.y|0);
				
	const strokeWidth = (label == relLabelHovered) ? "2" : "1";
    
    let markerStart = null;
	let markerEnd = null;
	
	switch (markerType) {
      case "ht":
        markerStart = markerUrl;
        break;
	  case "th":
	  case "one-way":
        markerEnd = markerUrl;
		break;
	  case "two-way":
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
        <path d={dAttr} fill="none" stroke={this.context.theme.relationColor} strokeWidth={strokeWidth} markerStart={markerStart} markerEnd={markerEnd} />
        <SVGRelationLabel text={text} x={cp.x|0} y={cp.y-15 - labelHeight|0} labelId={label} relLabelHovered={relLabelHovered} onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
      </g>
    )
  }
}

export default SVGRelationConnector;
