import React from "react";

import AnnotationLabel from "./AnnotationLabel";

const lineDivStyle = {
  position: "relative",
  height: "1.5em"
};

class AnnotationLine extends React.Component {
  render() {
    const { colors, labels } = this.props;
    const boxes = [];
    labels.forEach((label, i) => {
      const styles = {
        position: "absolute",
        left: label.x,
        width: label.width,
        textAlign: "center",
        fontSize: "0.6em",
        height: "100%"
      };
      boxes.push(
        <div style={styles} key={i}>
          <AnnotationLabel text={label.name} color={label.color} />
        </div>
      );
    });
    return (
      <div style={lineDivStyle}>
        {boxes}
      </div>
    );
  }
}

export default AnnotationLine;
