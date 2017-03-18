import React from "react";
import BaseComponent from "./BaseComponent";

import LineAnalyzer from "./LineAnalyzer";
import InnerLineContainer from "./InnerLineContainer";
import DataHandler from "./DataHandler";

class Line extends BaseComponent {
  constructor(props) {
    super();
    this.state = {
      dataHandler: new DataHandler()
    };
  }
  onAnalysis(data) {
    const { annotations, colors, types, keepWhiteSpaces, onAnnotationsAnalysis, id} = this.props;
    const result = [];
    data.forEach(d => {
      if (!result[d.line]) {
        result[d.line] = {text: "", annotations: []};
      }
      result[d.line].text += d.char;
    });
    annotations.forEach((annotation, idx) => {
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
        to: to,
        id: this.context.labelIdService.getLabelId(id, idx)
      });
    });

    this.state.dataHandler.fire(result, keepWhiteSpaces);
    onAnnotationsAnalysis(result.annotations);
  }

  render() {
    const { id, text, annotations, linum, colors, types, lineBreak, bgColor, tIds, keepWhiteSpaces } = this.props;
    const { theme } = this.context;
    let linumBox = null;
    let lineMarginLeft = 0;
    if (linum != null) {
      const style = {
        position: "absolute",
        width: 30,
        height: "100%",
      };
      if (theme.borderStyle !== 0) {
        style.borderRight = theme.border
      }
      linumBox = (
        <div style={style}>
          <span style={{position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%", color: theme.linumColor}}>{linum}</span>
        </div>
      );
      lineMarginLeft = 30;
    }
    const style = {
      position: "relative",
      minHeight: 14,
      backgroundColor: bgColor
    };
    if (theme.borderStyle === 1) {
      style.borderBottom = theme.border;
    }
    return (
      <div style={style}>
        {linumBox}
        <div style={{position: "relative", marginLeft: lineMarginLeft, padding: theme.linePadding}}>
          <LineAnalyzer
              text={text}
              lineBreak={lineBreak}
              annotations={annotations}
              colors={colors}
              types={types}
              keepWhiteSpaces={keepWhiteSpaces}
              onAnalysis={this.onAnalysis.bind(this)}
          />
          <InnerLineContainer dataHandler={this.state.dataHandler} tIds={tIds} />
        </div>
      </div>
    );
  }
}

export default Line;
