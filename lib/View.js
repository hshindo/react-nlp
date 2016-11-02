"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LineComponent = require("./LineComponent.jsx");

var _LineComponent2 = _interopRequireDefault(_LineComponent);

var _ConfigBgColor = require("./ConfigBgColor.jsx");

var _ConfigBgColor2 = _interopRequireDefault(_ConfigBgColor);

var _SentenceBuilder = require("./SentenceBuilder.jsx");

var _SentenceBuilder2 = _interopRequireDefault(_SentenceBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_React$Component) {
    _inherits(View, _React$Component);

    function View(props) {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));

        _this.sentenceBuilder = new _SentenceBuilder2.default(_this.props.configBgColors);
        return _this;
    }

    _createClass(View, [{
        key: "render",
        value: function render() {
            var listSentence = this.sentenceBuilder.buildListSentence(this.props.data);
            var renderLine = listSentence.map(function (item, index) {
                return _react2.default.createElement(_LineComponent2.default, { key: index, index: index, line: item });
            });
            return _react2.default.createElement(
                "div",
                null,
                renderLine
            );
        }
    }]);

    return View;
}(_react2.default.Component);

View.defaultProps = {
    data: [],
    configBgColors: _ConfigBgColor2.default.getBgColors()
};

var _default = View;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(View, "View", "src/View.jsx");

    __REACT_HOT_LOADER__.register(_default, "default", "src/View.jsx");
}();

;