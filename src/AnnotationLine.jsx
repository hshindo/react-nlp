import React from "react";

import AnnotationLabel, {AnnotationLabelLayoutOnly} from "./AnnotationLabel";
import currentTheme from "./Theme";

const lineDivStyle = {
  position: "relative",
  padding: currentTheme.annotationLinePadding
};

class AnnotationLine extends React.Component {
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
        top: 0,
        zIndex: this.state.target === i ? 1 : 0
      };
      boxes.push(
        <div style={styles} key={i}>
          <AnnotationLabel
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
