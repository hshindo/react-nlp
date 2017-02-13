const defaultTheme = {
  fontSize: 14,
  borderStyle: 1, // 0: none, 1: all, 2: only right side of linum box
  border: "solid 1px #9a9a9a",
  color: "black",
  linumColor: "#9a9a9a",
  stripe: true,
  stripeColor: ["#ffffff", "#f2f2f2"],
  linePadding: "5px 5px",
  annotationLinePadding: "1px 3px",
  labelFontSize: "0.6em",
  labelColor: "black",
  labelPadding: "0px 3px",
  labelBorder: "solid 1px gray",
  markColor: "#ffe4e1",
  characterPadding: 0,
  relationColor: "black",
  relationLabelFontSize: "12px",
  relationLabelPadding: "0px 3px",
  relationLabelBorder: "solid 1px gray",
  relationLabelColor: "black",
  relationLabelBgColor: "white",
  relationLabelBorderRadius: "0px"
};

export function assignTheme(theme) {
  var result = JSON.parse(JSON.stringify(defaultTheme));
  Object.keys(theme).forEach(key => {
    result[key] = theme[key];
  });
  return result;
}
