"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var listColor = {
    "CC": "white",
    "-LRB-": "#e3e3e3",
    "-RRB-": "#e3e3e3",
    "JJ": "#fffda8",
    "JJR": "#fffda8",
    "JJS": "#fffda8",
    "RB": "#fffda8",
    "RBR": "#fffda8",
    "RBS": "#fffda8",
    "WRB": "#fffda8",
    "DT": "#ccadf6",
    "PDT": "#ccdaf6",
    "WDT": "#ccdaf6",
    "CD": "#ccdaf6",
    "NN": "#a4bced",
    "NNP": "#a4bced",
    "NNPS": "#a4bced",
    "NNS": "#a4bced",
    "PRP": "#ccdaf6",
    "PRP__DOLLAR__": "#ccdaf6",
    "WP": "#ccdaf6",
    "WP__DOLLAR__": "#ccdaf6",
    "IN": "#ffe8be",
    "TO": "#ffe8be",
    "MD": "#adf6a2",
    "VB": "#adf6a2",
    "VBD": "#adf6a2",
    "VBG": "#adf6a2",
    "VBN": "#adf6a2",
    "VBP": "#adf6a2",
    "VBZ": "#adf6a2",
    "EX": "#e4cbf6",
    "FW": "#e4cbf6",
    "LS": "#e4cbf6",
    "POS": "#e4cbf6",
    "RP": "#e4cbf6",
    "SYM": "#e4cbf6",
    "UH": "#e4cbf6",
    "__DOLLAR__": "#e4cbf6",
    "DATE": "#9affe6",
    "DURATION": "#9affe6",
    "TIME": "#9affe6",
    "LOCATION": "#95dfff",
    "MISC": "#f1f447",
    "NUMBER": "#df99ff",
    "ORGANIZATION": "#8fb2ff",
    "PERCENT": "#ffa22b",
    "PERSON": "#ffccaa",
    "SET": "#ff7c95"
};

var ConfigBgColor = function () {
    function ConfigBgColor() {
        _classCallCheck(this, ConfigBgColor);
    }

    _createClass(ConfigBgColor, null, [{
        key: "getColor",
        value: function getColor() {
            var bgColors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : listColor;
            var key = arguments[1];

            return bgColors[key];
        }
    }, {
        key: "getBgColors",
        value: function getBgColors() {
            return listColor;
        }
    }]);

    return ConfigBgColor;
}();

var _default = ConfigBgColor;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(listColor, "listColor", "src/ConfigBgColor.jsx");

    __REACT_HOT_LOADER__.register(ConfigBgColor, "ConfigBgColor", "src/ConfigBgColor.jsx");

    __REACT_HOT_LOADER__.register(_default, "default", "src/ConfigBgColor.jsx");
}();

;