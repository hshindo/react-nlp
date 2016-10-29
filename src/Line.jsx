import React from "react";

import AnnotationLine from "./AnnotationLine";
import LineDetector from "./LineDetector";
import InnerLineContainer from "./InnerLineContainer";

class Line extends React.Component {
  constructor(props) {
    super();
    this.state = {
      charRects: null,
      handlers: {
        onData: null
      }
    };
  }

  handleTextCalculated(charRects) {
    this.setState({
      charRects: charRects
    });
  }

  handler(result) {
    const { annotations, colors, types} = this.props;
    this.state.handlers.onData(result, annotations, colors, types);
  }

  render() {
    const { text, annotations, linum, colors, types } = this.props;
    let linumBox = null;
    if (linum != null) {
      linumBox = (
        <div style={{position: "absolute", width: 30, height: "100%"}}>
          <span style={{position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%"}}>{linum}</span>
        </div>
      );
    }
    return (
      <div style={{position: "relative", minHeight: 16}}>
        {linumBox}
        <div style={{position: "relative", marginLeft: 30}}>
          <InnerLineContainer handlers={this.state.handlers} />
          <LineDetector text={text} handler={this.handler.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Line;
