import React from "react";

import AnnotationLine from "./AnnotationLine";
import ChunkedTextLine from "./ChunkedTextLine";

class Line extends React.Component {
  constructor(props) {
    super();
    this.state = {
      chunkRects: null
    };
  }

  handleChunkCalculated(chunkRects) {
    this.setState({
      chunkRects: chunkRects
    });
  }

  calcAnnotation(annotation) {
    // from, to ,label
    if (annotation.from > annotation.to || !this.state.chunkRects) {
      return null;
    }
    const fromChunkRect = this.state.chunkRects[annotation.from];
    const toChunkRect = this.state.chunkRects[annotation.to];
    const x = fromChunkRect.x;
    const width = toChunkRect.x + toChunkRect.width - fromChunkRect.x;
    return {x, width};
  }

  render() {
    const { chunk, annotations, linum } = this.props;
    let annotationLines = null;
    if (annotations && this.state.chunkRects) {
      annotationLines = [];
      annotations.forEach((perLine, i) => {
        const labels = [];
        perLine.forEach(annotation => {
          const pos = this.calcAnnotation(annotation);
          labels.push({
            name: annotation.label,
            x: pos.x,
            width: pos.width,
            color: annotation.color || "white"
          });
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
          <ChunkedTextLine chunk={chunk} onChunkCalculated={this.handleChunkCalculated.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Line;
