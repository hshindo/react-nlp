import React from "react";
import Line from "./Line";

class View extends React.Component {
  render() {
    const { data, linum } = this.props;
    const lines = [];
    data.forEach((line, i) => {
      let num = linum ? i + 1 : null;
      lines.push(
        <Line key={i} chunk={line.chunk} annotations={line.annotations} linum={num} />
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
