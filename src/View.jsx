import React from "react";
import Line from "./Line";
import FrontCanvas from "./FrontCanvas";

import {VIEWID_PREFIX} from "./Constants";
import LabelIdService from "./LabelIdService";
import DataHandler from "./DataHandler";
import {assignTheme} from "./Theme";

let viewIndex = 0;

class View extends React.Component {
  constructor(props) {
    super(props);
    this.viewId = VIEWID_PREFIX + (viewIndex++);
    this.lineAnnotations = {};
    this.canvasUpdateHandler = new DataHandler(true);
    this.theme = assignTheme(this.props.theme);
    this.labelIdService = new LabelIdService(this.viewId);
  }
  getChildContext() {
    return {
      theme: this.theme,
      labelIdService: this.labelIdService
    };
  }
  componentWillReceiveProps(nextProps) {
    this.lineAnnotations = {};
  }
  handleLineAnnotationsAnalysis(index, total, annotations) {
    this.lineAnnotations[index] = annotations;
    if (Object.keys(this.lineAnnotations).length === total) {
      this.canvasUpdateHandler.fire(this.lineAnnotations);
      this.lineAnnotations = {};
    }
  }
  render() {
    const { data,
            linum,
            colors,
            types,
            lineBreak,
            theme,
            keepWhiteSpaces,
            relations } = this.props;
    if (!data) {
      return null;
    }
    const lines = [];
    data.forEach((line, i) => {
      let num = linum ? i + 1 : null;
      let bgColor = null;
      if (this.theme.stripe) {
        bgColor = this.theme.stripeColor[i % 2];
      }
      lines.push(
        <Line key={i}
              id={i}
              text={line.text}
              annotations={line.anno}
              colors={colors}
              types={types}
              linum={num}
              lineBreak={lineBreak == null ? true : lineBreak}
              bgColor={bgColor}
              keepWhiteSpaces={!!keepWhiteSpaces}
              onAnnotationsAnalysis={(annotations) => {
                  this.handleLineAnnotationsAnalysis(i, data.length, annotations)
                }}
        />
      );
    });
    const style = {
      fontSize: this.theme.fontSize,
      color: this.theme.color,
      position: "relative"
    };
    if (this.theme.borderStyle === 1) {
      style.borderTop = this.theme.border;
      style.borderLeft = this.theme.border,
      style.borderRight = this.theme.border
    }
    return (
      <div style={style}>
        {lines}
        <FrontCanvas updateHandler={this.canvasUpdateHandler}
                     relations={relations}
        />
      </div>
    );
  }
}

View.childContextTypes = {
  theme: React.PropTypes.object,
  labelIdService: React.PropTypes.object
};

export default View;
