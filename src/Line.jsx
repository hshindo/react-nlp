import React from "react";

import AnnotationLine from "./AnnotationLine";
import ChunkedTextLine from "./ChunkedTextLine";

class Line extends React.Component {
  constructor(props) {
    super();
    this.state = {
      charRects: null
    };
  }

  handleTextCalculated(charRects) {
    this.setState({
      charRects: charRects
    });
  }

  calcPosition(from, to) {
    if (from > to || !this.state.charRects) {
      return null;
    }
    const fromCharRect = this.state.charRects[from];
    const toCharRect = this.state.charRects[to];
    const x = fromCharRect.x;
    const width = toCharRect.x + toCharRect.width - fromCharRect.x;
    return {x, width};
  }

  render() {
    const { text, annotations, linum, colors, types } = this.props;
    let annotationLines = null;
    let infoPerLine = null;
    if (types && annotations && this.state.charRects) {
      infoPerLine = [];
      annotations.forEach((annotation, i) => {
        const type = annotation[0];
        const from = annotation[1];
        const to = annotation[2];
        const name = annotation[3];
        const pos = this.calcPosition(from, to);
        if (!pos) {
          return;
        }
        const typeIdx = types.indexOf(type);
        if (typeIdx === -1) {
          return;
        }
        let color = "white";
        if (colors && colors[type] && colors[type][name]) {
          color = colors[type][name];
        }
        if (!infoPerLine[typeIdx]) {
          infoPerLine[typeIdx] = [];
        }
        infoPerLine[typeIdx].push({
          name: name,
          x: pos.x,
          width: pos.width,
          color: color
        })
      });
      annotationLines = [];
      infoPerLine.forEach((lineInfo, i) => {
        if (!lineInfo) {
          return;
        }
        const labels = [];
        lineInfo.forEach(info => {
          labels.push(info);
        });
        annotationLines.push(
          <AnnotationLine key={i} labels={labels} />
        );
      });
    }
    let linumBox = null;
    if (linum != null) {
      linumBox = (
        <div style={{display: "table-cell", width: 30, verticalAlign: "middle"}}>{linum}</div>
      );
    }
    return (
      <div>
        {linumBox}
        <div style={{display: "table-cell"}}>
          {annotationLines}
          <ChunkedTextLine text={text} onTextCalculated={this.handleTextCalculated.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Line;
