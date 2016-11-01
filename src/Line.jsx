import React from "react";

import AnnotationLine from "./AnnotationLine";
import LineAnalyzer from "./LineAnalyzer";
import InnerLineContainer, {DataHandler} from "./InnerLineContainer";
import currentTheme from "./Theme";

class Line extends React.Component {
  constructor(props) {
    super();
    this.state = {
      dataHandler: new DataHandler()
    };
  }

  onAnalysis(result) {
    const { annotations, colors, types, keepWhiteSpaces} = this.props;
    this.state.dataHandler.fire(result, annotations, colors, types, keepWhiteSpaces);
  }

  render() {
    const { text, annotations, linum, colors, types, lineBreak, bgColor, keepWhiteSpaces } = this.props;
    let linumBox = null;
    let lineMarginLeft = 0;
    if (linum != null) {
      linumBox = (
        <div style={{position: "absolute", width: 30, height: "100%", borderRight: currentTheme.border}}>
          <span style={{position: "absolute", transform: "translate(-50%, -50%)", top: "50%", left: "50%", color: currentTheme.linumColor}}>{linum}</span>
        </div>
      );
      lineMarginLeft = 30;
    }
    return (
      <div style={{position: "relative", minHeight: 14, borderBottom: currentTheme.border, backgroundColor: bgColor}}>
        {linumBox}
        <div style={{position: "relative", marginLeft: lineMarginLeft, padding: currentTheme.linePadding}}>
          <InnerLineContainer dataHandler={this.state.dataHandler} />
          <LineAnalyzer text={text} lineBreak={lineBreak} keepWhiteSpaces={keepWhiteSpaces} onAnalysis={this.onAnalysis.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Line;
