import React from "react";
import AnnotationLine from "./AnnotationLine";

export class DataHandler {
  constructor() {
    this.handlers = [];
  }
  fire(...args) {
    this.handlers.forEach(h => h(...args));
  }
  handle(handler) {
    this.handlers.push(handler);
  }
}

class InnerLineContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineInfo: null
    };
  }
  componentDidMount() {
    this.props.dataHandler.handle(this.onData.bind(this));
  }
  onData(data, annotations, colors, types) {
    const result = [];
    data.forEach(d => {
      if (!result[d.line]) {
        result[d.line] = {text: "", annotations: []};
      }
      result[d.line].text += d.char;
    });
    annotations.forEach(annotation => {
      const type = annotation[0];
      const from = annotation[1];
      const to = annotation[2];
      const name = annotation[3];
      if (from > to) {
        return;
      }
      const typeIdx = types.indexOf(type);
      if (typeIdx === -1) {
        return;
      }
      const fromTarget = data[from];
      if (!fromTarget) {
        return;
      }
      let toTarget = data[to];
      if (!toTarget) {
        return;
      }
      if (fromTarget.line !== toTarget.line) {
        toTarget = data[result[fromTarget.line].text.length - 1];
      }
      const targetLine = fromTarget.line;
      let color = "white";
      if (colors && colors[type] && colors[type][name]) {
        color = colors[type][name];
      }
      const targetAnnotationLine = null;
      if (!result[targetLine].annotations[typeIdx]) {
        result[targetLine].annotations[typeIdx] = [];
      }
      result[targetLine].annotations[typeIdx].push({
        x: fromTarget.x,
        width: toTarget.x + toTarget.width - fromTarget.x,
        name: name,
        color: color
      });
    });
    this.setState({
      lineInfo: result
    });
  }
  render() {
    const {lineInfo} = this.state;
    let lines = null;
    if (lineInfo) {
      lines = [];
      lineInfo.forEach((info, i) => {
        const annotationLines = [];
        info.annotations.forEach((labels, i) => {
          annotationLines.push(
            <AnnotationLine key={i} labels={labels} />
          );
        });
        lines.push(
          <div key={i}>
            {annotationLines}
            <div style={{whiteSpace: "nowrap"}}>{info.text}</div>
          </div>
        );
      });
    }
    return (
      <div>
        {lines}
      </div>
    );
  }
}

export default InnerLineContainer;
