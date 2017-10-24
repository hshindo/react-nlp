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
    const { tIds } = this.props;
    let lines = null;
    if (lineInfo) {
      lines = [];
      let charCount = 0;
      lineInfo.forEach((info, i) => {
        const annotationLines = [];
        info.annotations.forEach((labels, i) => {
            annotationLines.push(
            <AnnotationLine key={i} fontSize={fontSize} labels={labels} tIds={tIds} onMouseOver={this.onLabelMouseOver.bind(this)} onMouseOut={this.onLabelMouseOut.bind(this)} />
          );
        });
        
        // -- keep space between words -↓
        let tmp = [];
        info.annotations.forEach((annotationLine) => {
          annotationLine.forEach((annotation) => {
            const from = annotation["from"];
            const to = annotation["to"];
            const name = annotation["name"];
            tmp.push([from, to, name]);
          });
        });
        let wordPad = [];
        for (let i = 0; i < tmp.length; i++) {
          const from = tmp[i][0];
          const to = tmp[i][1];
          const name = tmp[i][2];
          let pad = name.length;
		  		  
          // pad value select wider one label in NE and POS label
          for (let j = 0; j < wordPad.length; j++) {       
            if (wordPad[j][0] == from && wordPad[j][1] == to && wordPad[j][2] > name.length ) {
              pad = wordPad[j][2];
            }
          }
          if ((to - from) <= pad) { wordPad.push([from, to, pad]) }
          else { wordPad.push([from, to, 0]) }
        }
        // -- keep space between words -↑
        
        const text = [];
        for (let j = 0; j < info.text.length; j++) {
          const style = {};
          style.paddingLeft = theme.characterPadding;
          style.paddingRight = theme.characterPadding;
          // -- keep space between words -↓
          for (let k = 0; k < wordPad.length; k++) {
            const from = wordPad[k][0];
            const to = wordPad[k][1];
            const pad = (wordPad[k][2]-(to-from)*1.5)*3 + 5;

            if (j == from) { style.paddingLeft = pad+"px" }
            if (j == to) { style.paddingRight = pad+"px" }
          }
          // -- keep space between words -↑
              
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
            <span key={j} id={j} style={style}>{info.text[j]}</span>
          );
		  charCount++;
		 
		  //console.log(strWidth(info.text[j], 'large'));
		}
				
        lines.push(
          // settings of label shower
          <div key={i} style={{height: "150px", position: "relative", top: "80px", zIndex: "5"}}>
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

function strWidth(str, size, mode) {
  $(document.body).append($('<span id="f_strWidth_str_width" style="visibility:hidden;position:absolute;white-space:nowrap;font-size:' + size + ';"></span>'));
  var e = $("#f_strWidth_str_width");
  var width = e.text(str).get(0).offsetWidth;
  e.empty();
  if(mode == "label"){
    width += 2*2;
  }
  return width;
}

export default InnerLineContainer;
