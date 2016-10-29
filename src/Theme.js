const defaultTheme = {
  fontSize: 14,
  border: "solid 1px #9a9a9a",
  color: "black",
  linumColor: "#9a9a9a",
  stripe: true,
  stripeColor: ["#ffffff", "#f2f2f2"],
  linePadding: "3px 5px",
  labelColor: "black",
  labelPadding: "2px 3px",
  labelBorder: "solid 1px gray"
};

const currentTheme = JSON.parse(JSON.stringify(defaultTheme));

export function setTheme(theme) {
  Object.keys(theme).forEach(key => {
    currentTheme[key] = theme[key];
  });
}

export default currentTheme;
