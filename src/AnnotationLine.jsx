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
    const { fontSize, labels, onMouseOver, onMouseOut} = this.props;
    const boxes = [];
    labels.forEach((label, i) => {
      const styles = {
        position: "absolute",
        left: label.x,
        width: label.width,
        textAlign: "center",
        fontSize: fontSize,
        height: "100%",
        top: 50,
        zIndex: this.state.target === i ? 1 : 0
      };
      boxes.push(
        <div style={styles} key={i}>
          <AnnotationLabel
              id={label.id}
              text={label.name}
              color={label.color}
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
