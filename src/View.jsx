import React from "react";
import Line from "./Line";

class View extends React.Component {
  render() {
    const { data, linum, colors, types } = this.props;
    const lines = [];
    data.forEach((line, i) => {
      let num = linum ? i + 1 : null;
      lines.push(
        <Line key={i} text={line.text} annotations={line.annos} colors={colors} types={types} linum={num} />
      );
    });
    return (
      <div>
        {lines}
      </div>
    );
  }
}

export default View;
