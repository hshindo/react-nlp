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
        // set label's x_pos
        const t1Pos = labelsX.indexOf(t1Cent);
        const t2Pos = labelsX.indexOf(t2Cent);
        labelsPos.push([i, Math.min(t1Pos, t2Pos), Math.max(t1Pos, t2Pos), Math.abs(t1Pos - t2Pos)]);
        console.log(i, Math.min(t1Pos, t2Pos), Math.max(t1Pos, t2Pos), Math.abs(t1Pos - t2Pos));
      }
    });
    
    
    let labelsHeight = {};
    let max_pos = Math.max.apply({}, labelsPos);
    let height = 0;
    while (labelsPos.length != 0) {
      // arrange relation label by height
      labelsPos.sort(function(a, b){
        if(a[3] < b[3]) return -1;
        if(a[3] > b[3]) return 1;
        return 0;
      });
      // arrows pointing itself
      while (labelsPos[0][3] == 0) {
        labelsHeight[labelsPos[0][0]] = height+1;
        labelsPos.shift();
      }
      let tmp = [];
      let arrowCrossFlg = false;
      let crossRFoot = false;
      let crossLFoot = false;
      let sameFromTo = false;
      while (arrowCrossFlg == false) {
        labelsHeight[labelsPos[0][0]] = height;
        tmp.push(labelsPos[0]);
        labelsPos.shift();
        if (labelsPos.length == 0) {break;}
        for (let i = 0; i < tmp.length; i++) {
          // IDで見てる、距離じゃない。neタグで狂ってる
          crossLFoot = labelsPos[0][1] < tmp[i][1] && tmp[i][1] < labelsPos[0][2];
          crossRFoot = labelsPos[0][1] < tmp[i][2] && tmp[i][2] < labelsPos[0][2];
          sameFromTo = labelsPos[0][1] == tmp[i][1] && tmp[i][2] == labelsPos[0][2];
          if ((crossRFoot && crossLFoot) || crossRFoot || crossLFoot || sameFromTo) {
            arrowCrossFlg = true;
            break;
          }
        }
      }
      height += 1;
    }
    // assign relation label's height --↑
    
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
                                heightAdj={labelsHeight[i]}
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
