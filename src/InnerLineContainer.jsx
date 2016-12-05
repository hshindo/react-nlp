import React from "react";
import Color from "color";
import AnnotationLine from "./AnnotationLine";
import currentTheme from "./Theme";

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
      lineInfo: null,
      markTarget: null,
      keepWhiteSpaces: null
    };
  }
  componentDidMount() {
    this.props.dataHandler.handle(this.onData.bind(this));
  }
  onData(data, annotations, colors, types, keepWhiteSpaces) {
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
        color: color,
        from: from,
        to: to
      });
    });
    this.setState({
      lineInfo: result,
      keepWhiteSpaces: keepWhiteSpaces
    });
  }
  onLabelMouseOver(label) {
    this.setState({
      markTarget: {
        from: label.from,
        to: label.to,
        color: label.color
      }
    });
  }
  onLabelMouseOut() {
    this.setState({
      markTarget: null
    });
  }
  render() {
    const {lineInfo, keepWhiteSpaces, fontSize} = this.state;
    let lines = null;
    if (lineInfo) {
      lines = [];
      let charCount = 0;
      lineInfo.forEach((info, i) => {
        const annotationLines = [];
        info.annotations.forEach((labels, i) => {
          annotationLines.push(
            <AnnotationLine key={i} fontSize={fontSize} labels={labels} onMouseOver={this.onLabelMouseOver.bind(this)} onMouseOut={this.onLabelMouseOut.bind(this)} />
          );
        });
        const text = [];
        for (let j = 0; j < info.text.length; j++) {
          const style = {};
          style.paddingLeft = currentTheme.characterPadding;
          style.paddingRight = currentTheme.characterPadding;
          if (this.state.markTarget) {
            const target = this.state.markTarget;
            if (target.from <= charCount && charCount <= target.to) {
              style.backgroundColor = target.color ? Color(this.state.markTarget.color).clearer(0.5).rgbaString() : currentTheme.markColor;
            }
          }
          if (info.text[j] === " " && keepWhiteSpaces) {
            style.whiteSpace = "pre";
          }
          text.push(
            <span key={j} style={style}>{info.text[j]}</span>
          );
          charCount++;
        }
        lines.push(
          <div key={i}>
            {annotationLines}
            <div style={{whiteSpace: "nowrap"}}>{text}</div>
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
