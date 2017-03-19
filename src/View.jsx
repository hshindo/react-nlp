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
    this.state = { relLabelHovered: "" };
  }
  getChildContext() {
    return {
      theme: this.theme,
      labelIdService: this.labelIdService
    };
  }
  onMouseOver(label) {
    this.setState({ relLabelHovered: label });
  }
  onMouseOut() {
    this.setState({ relLabelHovered: "" });
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
    /* a pair of labels directed by hovered relation label */
    let tIds = [];
    relations.forEach((relation) => {
      const type = relation[0];
      const t1Id = this.labelIdService.getLabelId(relation[1], relation[2]);
      const t2Id = this.labelIdService.getLabelId(relation[3], relation[4]);
      const label = relation[5] + "-" + relation[1];
      if (label == this.state.relLabelHovered) {tIds.push([t1Id, t2Id])}
    });
    
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
              tIds={tIds}
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
      position: "relative",
      overflowX: "scroll",
      overflowY: "scroll"
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
                     relLabelHovered={this.state.relLabelHovered}
                     onMouseOver={this.onMouseOver.bind(this)}
                     onMouseOut={this.onMouseOut.bind(this)}
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
