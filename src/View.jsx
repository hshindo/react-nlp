import React from "react";
import Line from "./Line";
import currentTheme, {setTheme} from "./Theme";

class View extends React.Component {
  render() {
    const { data, linum, colors, types, lineBreak, theme, keepWhiteSpaces } = this.props;
    if (!data) {
      return null;
    }
    if (theme) {
      setTheme(theme);
    }
    const lines = [];
    data.forEach((line, i) => {
      let num = linum ? i + 1 : null;
      let bgColor = null;
      if (currentTheme.stripe) {
        bgColor = currentTheme.stripeColor[i % 2];
      }
      lines.push(
        <Line key={i}
              text={line.text}
              annotations={line.anno}
              colors={colors}
              types={types}
              linum={num}
              lineBreak={lineBreak == null ? true : lineBreak}
              bgColor={bgColor}
              keepWhiteSpaces={!!keepWhiteSpaces}
        />
      );
    });
    return (
      <div style={{
        fontSize: currentTheme.fontSize,
        color: currentTheme.color,
        borderTop: currentTheme.border,
        borderLeft: currentTheme.border,
        borderRight: currentTheme.border
      }}>
        {lines}
      </div>
    );
  }
}

export default View;
