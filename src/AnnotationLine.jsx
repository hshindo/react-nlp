import React from "react";
import BaseComponent from "./BaseComponent";

import AnnotationLabel, {AnnotationLabelLayoutOnly} from "./AnnotationLabel";

class AnnotationLine extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      target: -1
    };
  }
  onLabelMouseOver(index) {
    this.setState({
      target: index
    });
  }
  onLabelMouseOut() {
    this.setState({
      target: -1
    });
  }
  render() {
    const { fontSize, labels, tIds, onMouseOver, onMouseOut} = this.props;
    const boxes = [];
    labels.forEach((label, i) => {
      const isTagHovered = this.state.target === i;
      
      let isRelHovered = false;
      if (tIds.length == 0) {isRelHovered = false;}
      else {
        for (let j = 0; j < tIds.length; j++) {
          const from = tIds[j][0];
          const to = tIds[j][1];
          if (label.id == from || label.id == to) {isRelHovered = true}
        }
      }
      
      const isTarget = isTagHovered || isRelHovered;
      const styles = {
        position: "absolute",
        left: label.x,
        width: label.width,
        textAlign: "center",
        fontSize: fontSize,
        height: "100%",
        top: 0,
        zIndex: isTarget ? 1 : 0
      };
      boxes.push(
        <div style={styles} key={i}>
          <AnnotationLabel
              id={label.id}
              text={label.name}
              color={label.color}
              target={this.state.target}
              isTarget={isTarget}
              onMouseOver={() => {
                  this.onLabelMouseOver(i);
                  if (onMouseOver) {
                    onMouseOver(label);
                  }
                }}
              onMouseOut={() => {
                  this.onLabelMouseOut();
                  if (onMouseOut) {
                    onMouseOut(label);
                  }
                }} />
        </div>
      );
    });
    const lineDivStyle = {
        position: "relative",
        padding: this.context.theme.annotationLinePadding
    };
    return (
      <div style={lineDivStyle}>
        <div style={{height: "100%"}}>
          <AnnotationLabelLayoutOnly />
        </div>
        {boxes}
      </div>
    );
  }
}

export default AnnotationLine;
