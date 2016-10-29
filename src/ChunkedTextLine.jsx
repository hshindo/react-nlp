// TODO: remove
import React from "react";
// import ResizeSensor from "css-element-queries/src/ResizeSensor";

const styles = {
  position: "absolute",
};

Number.isNaN = Number.isNaN || function(value) {
  return typeof value === "number" && value !== value;
}

class ChunkedTextLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needsNotify: true
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        needsNotify: this.props.text !== nextProps.text
      });
  }

  notifyTextCalculated() {
    const { onTextCalculated } = this.props;
    const rectList = [];
    let firstSpanLeft = 0;
    Object.keys(this.refs).filter(refId => {
      return !Number.isNaN(Number(refId));
    }).sort((a, b) => {
      a = Number(a);
      b = Number(b);
      if ( a < b ) return -1;
      if ( a > b ) return 1;
      return 0;
    }).forEach(refId => {
      const e = this.refs[refId];
      const rect = {left: e.offsetLeft, top: e.offsetTop, width: e.offsetWidth, height: e.offsetHeight};
      if (refId == 0) {
        firstSpanleft = rect.left;
      }
      const prevChunkRect = rectList[rectList.length - 1];
      let x = 0;
      if (prevChunkRect) {
        x = prevChunkRect.x + prevChunkRect.width;
      }
      rectList.push({
        x: x,
        width: this.refs[refId].offsetWidth
      });
    });
    onTextCalculated(rectList);
  }

  componentDidUpdate() {
    if (this.state.needsNotify) {
      this.notifyTextCalculated();
    }
  }

  componentDidMount() {
    /* new ResizeSensor(this.refs.container, () => {
     *   const style = window.getComputedStyle(this.refs.container);
     *   const w = style.width;
     *   const h = style.height;
     *   console.log(w, h);
     * });*/
    this.notifyTextCalculated();
  }

  render() {
    const { text } = this.props;
    const spans = [];
    let keyIdx = 0;
    for (let i = 0; i < text.length; i++) {
      spans.push(
        <span key={i} ref={i}>{text[i]}</span>
      );
    }
    return (
      <div ref="container">
        {spans}
      </div>
    );
  }
}

export default ChunkedTextLine;
