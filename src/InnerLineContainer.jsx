import React from "react";
import Color from "color";
import BaseComponent from "./BaseComponent";
import AnnotationLine from "./AnnotationLine";

class InnerLineContainer extends BaseComponent {
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
  onData(data, keepWhiteSpaces) {
    this.setState({
      lineInfo: data,
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
    const { theme } = this.context;
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
        
        // keep space between words
        let tmp = [];
        info.annotations.forEach((annotationLine) => {
          annotationLine.forEach((annotation) => {
            const from = annotation["from"];
            const to = annotation["to"];
            const name = annotation["name"];
            tmp.push([from, to, name]);
          });
        });
        let adj = [];
        for (let i = 0; i < tmp.length; i++) {
          const from = tmp[i][0];
          const to = tmp[i][1];
          const name = tmp[i][2];
          let pad = name.length;
          // pad value select wider one label in NE and POS label
          for (let j = 0; j < adj.length; j++) {       
            if (adj[j][0] == from && adj[j][1] == to && adj[j][2] > name.length ) {
              pad = adj[j][2];
            }
          }
          if ((to - from + 3) <= pad) {
            adj.push([from, to, pad]);
          }
        }
        
        const text = [];
        for (let j = 0; j < info.text.length; j++) {
          const style = {};
          style.paddingLeft = theme.characterPadding;
          style.paddingRight = theme.characterPadding;
          
          // keep space between words
          for (let k = 0; k < adj.length; k++) {
            const from = adj[k][0];
            const to = adj[k][1];
            const len = adj[k][2];
            const pad = (len-(to-from))*5;
            if (j == from) {
              style.paddingLeft = pad+"px";
            }
            if (j == to) {
              style.paddingRight = pad+"px";
            }
          }
          
          
          if (this.state.markTarget) {
            const target = this.state.markTarget;
            if (target.from <= charCount && charCount <= target.to) {
              style.backgroundColor = target.color ? Color(this.state.markTarget.color).clearer(0.5).rgbaString() : theme.markColor;
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
          <div key={i} style={{height: "160px", position: "relative", top: "90px", zIndex: "5"}}>
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
