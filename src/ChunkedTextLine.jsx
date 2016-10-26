import React from "react";

const styles = {
  position: "absolute",
};

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
    Object.keys(this.refs).sort((a, b) => {
      a = Number(a);
      b = Number(b);
      if ( a < b ) return -1;
      if ( a > b ) return 1;
      return 0;
    }).forEach(refId => {
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
      <div>
        {spans}
      </div>
    );
  }
}

export default ChunkedTextLine;
