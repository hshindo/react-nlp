import React from "react";
const styles = {
  position: "absolute",
};

const SP_SUFFIX = "sp";

Number.isNaN = Number.isNaN || function(value) {
  return typeof value === "number" && value !== value;
};

class ChunkedTextLine extends React.Component {
  componentDidMount() {
    const { onChunkCalculated } = this.props;
    const rectList = [];
    Object.keys(this.refs).filter(refId => !Number.isNaN(Number(refId))).sort((a, b) => {
      a = Number(a);
      b = Number(b);
      if ( a < b ) return -1;
      if ( a > b ) return 1;
      return 0;
    }).forEach(refId => {
      if (Number(refId) === NaN) {
        return;
      }
      const prevChunkRect = rectList[rectList.length - 1];
      let x = 0;
      if (prevChunkRect) {
        x = prevChunkRect.x + prevChunkRect.width;
      }
      const prevSp = this.refs[(refId - 1) + SP_SUFFIX];
      if (prevSp) {
        x += prevSp.offsetWidth;
      }
      rectList.push({
        x: x,
        width: this.refs[refId].offsetWidth
      });
    });
    onChunkCalculated(rectList);
  }
  render() {
    const { chunk, color, annotations } = this.props;
    const spans = [];
    let keyIdx = 0;
    chunk.forEach((text, i) => {
      spans.push(
        <span key={keyIdx++} ref={i}>{text}</span>
      );
      if (i !== chunk.length) {
        spans.push(
          <span key={keyIdx++} ref={i+SP_SUFFIX}> </span>
        );
      }
    });
    return (
      <div>
        {spans}
      </div>
    );
  }
}

export default ChunkedTextLine;
