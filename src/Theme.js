const defaultTheme = {
  fontSize: 14,
  borderStyle: 1, // 0: none, 1: all, 2: only right side of linum box
  border: "solid 1px #9a9a9a",
  color: "black",
  linumColor: "#9a9a9a",
  stripe: true,
  stripeColor: ["#ffffff", "#f2f2f2"],
  linePadding: "3px 5px",
  annotationLinePadding: "2px 3px",
  labelFontSize: "0.6em",
  labelColor: "black",
  labelPadding: "2px 3px",
  labelBorder: "solid 1px gray",
  markColor: "#ffe4e1",
  characterPadding: 0
};

const currentTheme = JSON.parse(JSON.stringify(defaultTheme));

export function setTheme(theme) {
  Object.keys(theme).forEach(key => {
    currentTheme[key] = theme[key];
  });
}

export default currentTheme;
