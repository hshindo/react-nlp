'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WordComponent = require('./WordComponent.jsx');

var _WordComponent2 = _interopRequireDefault(_WordComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineComponent = function (_React$Component) {
    _inherits(LineComponent, _React$Component);

    function LineComponent(props) {
        _classCallCheck(this, LineComponent);

        return _possibleConstructorReturn(this, (LineComponent.__proto__ || Object.getPrototypeOf(LineComponent)).call(this, props));
    }

    _createClass(LineComponent, [{
        key: 'render',
        value: function render() {
            var renderWord = this.props.line.items.map(function (item, index) {
                return _react2.default.createElement(_WordComponent2.default, { key: index, index: index, data: item });
            });

            return _react2.default.createElement(
                'div',
                { className: 'item-translate' },
                _react2.default.createElement(
                    'div',
                    { style: { alignItems: 'flex-end', display: 'flex' } },
                    _react2.default.createElement(
                        'div',
                        { className: 'item-count text-right padding-top-bottom' },
                        this.props.index + 1
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'border-left text-result padding-top-bottom' },
                        _react2.default.createElement(
                            'div',
                            { className: 'line-word' },
                            renderWord
                        )
                    )
                )
            );
        }
    }]);

    return LineComponent;
}(_react2.default.Component);

LineComponent.defaultProps = {
    line: {
        items: [],
        text: ''
    }
};

var _default = LineComponent;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(LineComponent, 'LineComponent', 'src/LineComponent.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/LineComponent.jsx');
}();

;