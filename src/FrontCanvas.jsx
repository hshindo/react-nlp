import React from "react";
import ReactDOM from "react-dom";
import BaseComponent from "./BaseComponent";
import SVGCanvas from "./SVGCanvas";
import SVGRelationConnector from "./SVGRelationConnector";
import SVGConnectorMarker from "./SVGConnectorMarker";

import {CONNECTOR_MARKER_ID} from "./Constants";

function detectYPosition(offsetY, rect1, rect2) {
  if (rect1.top === rect2.top) {
    return [
      rect1.top - offsetY,
      rect2.top - offsetY
    ];
  }
  if (rect1.top < rect2.top) {
    return [
      rect1.top - offsetY,
      rect2.top - offsetY
    ]
  }
  if (rect1.top > rect2.top) {
    return [
      rect1.top - offsetY,
      rect2.top - offsetY
    ]
  }
}
class FrontCanvas extends BaseComponent {
  componentDidMount() {
    this.domNode = ReactDOM.findDOMNode(this);
    this.props.updateHandler.handle(this.handleUpdate.bind(this));
    this.state = {
      update: false
    };
  }
  componentDidUpdate() {
    this.domNode = ReactDOM.findDOMNode(this);
  }
  handleUpdate() {
    this.setState({
      update: true
    });
  }
  render() {
    const {relations} = this.props;
    const {labelIdService} = this.context;
    if (!(relations && relations.length)) {
      return null;
    }
    const connectors = [];
    let offset = {top: 0, left: 0};
    if (this.domNode) {
      offset = this.domNode.getBoundingClientRect();
    }
    
    // assign relation label's height --↓
    let labelsX = [];
    relations.forEach((relation, i) => {
      const t1Id = labelIdService.getLabelId(relation[1], relation[2]);
      const t2Id = labelIdService.getLabelId(relation[3], relation[4]);
      const t1 = document.getElementById(t1Id);
      const t2 = document.getElementById(t2Id);
      if (t1 && t2) {
        const t1Rect = t1.getBoundingClientRect();
        const t2Rect = t2.getBoundingClientRect();
        const t1Cent = t1Rect.left + t1Rect.width*1/2;
        const t2Cent = t2Rect.left + t2Rect.width*1/2;
        // set label's x_pos
        labelsX.push(t1Cent, t2Cent);
      }
    });
    // delete overlap in x_pos
    labelsX = labelsX.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
    // order by x_pos
    labelsX.sort(function(a, b){
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });
    
    let labelsPos = [];
    relations.forEach((relation, i) => {
      const t1Id = labelIdService.getLabelId(relation[1], relation[2]);
      const t2Id = labelIdService.getLabelId(relation[3], relation[4]);
      const t1 = document.getElementById(t1Id);
      const t2 = document.getElementById(t2Id);
      if (t1 && t2) {
        const t1Rect = t1.getBoundingClientRect();
        const t2Rect = t2.getBoundingClientRect();
        const t1Cent = t1Rect.left + t1Rect.width*1/2;
        const t2Cent = t2Rect.left + t2Rect.width*1/2;
        // ordering by x_order
        const t1Order = labelsX.indexOf(t1Cent);
        const t2Order = labelsX.indexOf(t2Cent);
        labelsPos.push([i, t1Order, t2Order]);
      }
    });
    
    let labelsHeight = {}; // [[id, from, to], height]
    let height = 0;
    while (labelsPos.length != 0) {
      
      // arrange relation label by height
      labelsPos.sort(function(a, b){
        if (Math.abs(a[1] - a[2]) < Math.abs(b[1] - b[2])) return -1;
        if (Math.abs(a[1] - a[2]) > Math.abs(b[1] - b[2])) return 1;
        return 0;
      });
      // arrows pointing itself is height 1
      while (labelsPos[0][1] == labelsPos[0][2]) {
        labelsHeight[labelsPos[0][0]] = [labelsPos[0], 1];
        labelsPos.shift();
      }
      
      let tmp = [];
      for (var key in labelsHeight) {
        if (labelsHeight[key][1] == height) { tmp.push(labelsHeight[key][0]); }
      }
      
      let arrowCrossFlg = false;
      while (1) {
        let labelHeight = 0;
        const gap = Math.abs(labelsPos[0][1] - labelsPos[0][2]);
        const minOrder = Math.min(labelsPos[0][1], labelsPos[0][2]);
        const maxOrder = Math.max(labelsPos[0][1], labelsPos[0][2]);
        
        for (let i = 0; i < tmp.length; i++) {
          const minOrder_tmp = Math.min(tmp[i][1], tmp[i][2]);
          const maxOrder_tmp = Math.max(tmp[i][1], tmp[i][2]);
          if ( minOrder == minOrder_tmp && maxOrder_tmp == maxOrder ) {
            labelHeight += 1;
          }
          if (minOrder <= minOrder_tmp && maxOrder_tmp <= maxOrder && !(minOrder == minOrder_tmp && maxOrder_tmp == maxOrder) ) { arrowCrossFlg = true; }
        }
        if (arrowCrossFlg) { break; }
        
        labelHeight += height;
        labelsHeight[labelsPos[0][0]] = [labelsPos[0], labelHeight];
        if (labelHeight == height) { tmp.push(labelsPos[0]); }
        labelsPos.shift();
        if (labelsPos.length == 0) { break; }
      }
      height += 1;
    }
    // assign relation label's height --↑
    
    let yPosList = new Set([]);
    relations.forEach((relation, i) => {
      const type = relation[0];
      const t1Id = labelIdService.getLabelId(relation[1], relation[2]);
      const t2Id = labelIdService.getLabelId(relation[3], relation[4]);
      const label = relation[5];
      const t1 = document.getElementById(t1Id);
      const t2 = document.getElementById(t2Id);
      if (t1 && t2) {
        const t1Rect = t1.getBoundingClientRect();
        const t2Rect = t2.getBoundingClientRect();

        const yPos = detectYPosition(offset.top, t1Rect, t2Rect);
        const t1Top = yPos[0];
        const t1Left = t1Rect.left - offset.left;
        const t2Top = yPos[1];
        const t2Left = t2Rect.left - offset.left;
        
        let ne2ne = false;
        yPosList.add(t1Top);
        yPosList.add(t2Top);
        if (yPosList.size == 2 && t1Top == Math.min.apply(null, Array.from(yPosList)) && t2Top == Math.min.apply(null, Array.from(yPosList))) {ne2ne = true;}

        const t1Pos = {
          x: t1Left + (t1Rect.width / 2),
          y: t1Top,
          width: t1Rect.width
        };
        const t2Pos = {
          x: t2Left + (t2Rect.width / 2),
          y: t2Top,
          width: t2Rect.width
        };
        connectors.push(
          <SVGRelationConnector markerType={relation[0]}
                                markerId={CONNECTOR_MARKER_ID}
                                start={t1Pos}
                                end={t2Pos}
                                key={i}
                                label={relation[5]}
                                heightAdj={labelsHeight[i][1]}
                                ne2ne={ne2ne}
          />
        );
      }
    });
    
    var scrollsize = window.innerWidth;
    return (
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10,
        width: scrollsize,
        height: "100%"
      }}>
        <SVGCanvas width="100%" height="100%">
          <SVGConnectorMarker id={CONNECTOR_MARKER_ID} />
          {connectors}
        </SVGCanvas>
      </div>
    );
  }
}

export default FrontCanvas;
