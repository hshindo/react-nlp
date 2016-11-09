'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordComponent = function (_React$Component) {
    _inherits(WordComponent, _React$Component);

    function WordComponent(props) {
        _classCallCheck(this, WordComponent);

        var _this = _possibleConstructorReturn(this, (WordComponent.__proto__ || Object.getPrototypeOf(WordComponent)).call(this, props));

        _this.state = {
            data: {
                words: []
            }
        };
        _this.mouseOverPos = _this.mouseOverPos.bind(_this);
        _this.mouseOutPos = _this.mouseOutPos.bind(_this);
        _this.mouseOverNe = _this.mouseOverNe.bind(_this);
        _this.mouseOutNe = _this.mouseOutNe.bind(_this);
        return _this;
    }

    _createClass(WordComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ data: this.props.data });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ data: nextProps.data });
        }
    }, {
        key: 'mouseOverPos',
        value: function mouseOverPos(index) {
            this.state.data.words[index].bgColorForm = this.state.data.words[index].bgColorPos;
            this.setState({ data: this.state.data });
        }
    }, {
        key: 'mouseOutPos',
        value: function mouseOutPos(index) {
            this.state.data.words[index].bgColorForm = this.state.data.words[index].cacheBgColorForm;
            this.setState({ data: this.state.data });
        }
    }, {
        key: 'mouseOverNe',
        value: function mouseOverNe() {
            var _this2 = this;

            this.state.data.words.map(function (item) {
                item.bgColorForm = _this2.state.data.bgColorNe;
                return item;
            });
            this.setState({ data: this.state.data });
        }
    }, {
        key: 'mouseOutNe',
        value: function mouseOutNe() {
            this.state.data.words.map(function (item) {
                item.bgColorForm = item.cacheBgColorForm;
                return item;
            });
            this.setState({ data: this.state.data });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var renderForm = this.state.data.words.map(function (item, index) {
                var renderPos = '';
                var mouseOverPos = _this3.mouseOverPos.bind(_this3, index);
                var mouseOutPos = _this3.mouseOutPos.bind(_this3, index);

                if (item.pos && _this3.props.settings.pos) {
                    renderPos = _react2.default.createElement(
                        'div',
                        { onMouseOver: mouseOverPos,
                            onMouseOut: mouseOutPos,
                            style: Object.assign({ backgroundColor: item.bgColorPos }, _Styles2.default.cat, _Styles2.default.cursorPointer) },
                        item.pos
                    );
                }
                return _react2.default.createElement(
                    'div',
                    { key: index, style: _Styles2.default.itemCat, className: 'item-cat' },
                    renderPos,
                    _react2.default.createElement(
                        'div',
                        { style: Object.assign({ backgroundColor: item.bgColorForm }, _Styles2.default.form) },
                        item.form
                    )
                );
            });

            var renderNe = '';
            if (this.state.data.ne && this.props.settings.ne) {
                renderNe = _react2.default.createElement(
                    'div',
                    { onMouseOver: this.mouseOverNe,
                        onMouseOut: this.mouseOutNe,
                        style: Object.assign({ backgroundColor: this.state.data.bgColorNe }, _Styles2.default.wordNe, _Styles2.default.cursorPointer) },
                    this.state.data.ne
                );
            }

            var renderWiki = '';
            if (this.state.data.wiki && this.props.settings.wiki) {
                renderWiki = _react2.default.createElement(
                    'div',
                    null,
                    this.state.data.wiki
                );
            }

            return _react2.default.createElement(
                'div',
                { style: _Styles2.default.word },
                _react2.default.createElement(
                    'div',
                    { style: _Styles2.default.paddingWordWrapper },
                    _react2.default.createElement(
                        'div',
                        { style: _Styles2.default.paddingWord },
                        renderNe,
                        renderWiki
                    )
                ),
                renderForm
            );
        }
    }]);

    return WordComponent;
}(_react2.default.Component);

var _default = WordComponent;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(WordComponent, 'WordComponent', 'src/WordComponent.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/WordComponent.jsx');
}();

;