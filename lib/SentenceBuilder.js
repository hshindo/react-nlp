'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ConfigBgColor = require('./ConfigBgColor');

var _ConfigBgColor2 = _interopRequireDefault(_ConfigBgColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SentenceBuilder = function () {
    function SentenceBuilder(configBgColors) {
        _classCallCheck(this, SentenceBuilder);

        this.configBgColors = configBgColors;
    }

    _createClass(SentenceBuilder, [{
        key: 'buildListSentence',
        value: function buildListSentence() {
            var _this = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


            var lst = [];
            data.map(function (sentence) {
                var anno = sentence.anno;
                var text = sentence.text;
                anno = anno.map(function (anno) {
                    var color = _ConfigBgColor2.default.getColor(_this.configBgColors, anno[3]) ? _ConfigBgColor2.default.getColor(_this.configBgColors, anno[3]) : '';
                    return {
                        form: text.substring(anno[1], anno[2] + 1),
                        pos: anno[3],
                        type: anno[0],
                        start: anno[1],
                        bgColorPos: color,
                        bgColorForm: _this.convertHex(color, 20),
                        cacheBgColorForm: _this.convertHex(color, 20),
                        end: anno[2]
                    };
                });
                anno.reverse();
                var listItem = [];
                var start = null,
                    end = null;
                var item = {
                    words: []
                };

                anno.map(function (anno) {
                    if (anno.type == 'wiki') {
                        start = anno.start;
                        end = anno.end;

                        item.wiki = anno.pos;
                        item.start = anno.start;
                        item.end = anno.end;
                        item.words = [];
                        return;
                    }
                    if (anno.type == 'entity') {
                        start = anno.start;
                        end = anno.end;

                        item.ne = anno.pos;
                        item.start = anno.start;
                        item.end = anno.end;
                        item.words = [];
                        item.bgColorNe = _ConfigBgColor2.default.getColor(_this.configBgColors, anno.pos);
                        return;
                    }

                    if (start === null && end === null) {
                        listItem.push({ words: [anno] });
                        return;
                    }

                    if (anno.start >= item.start && anno.end <= item.end) {
                        item.words.push(anno);
                    } else {
                        listItem.push(item);
                        item = { words: [anno] };
                    }
                });
                if (item.words.length > 0) {
                    listItem.push(item);
                }
                listItem.reverse();
                lst.push({
                    text: text,
                    text_ja: 'JA',
                    text_cn: 'EN',
                    items: listItem
                });
            });
            return lst;
        }
    }, {
        key: 'convertHex',
        value: function convertHex(hex, opacity) {
            if (hex) {
                hex = hex.replace('#', '');
                var r = parseInt(hex.substring(0, 2), 16);
                var g = parseInt(hex.substring(2, 4), 16);
                var b = parseInt(hex.substring(4, 6), 16);

                return 'rgba(' + r + ', ' + g + ', ' + b + ' , ' + opacity / 100 + ')';
            }
            return '';
        }
    }]);

    return SentenceBuilder;
}();

var _default = SentenceBuilder;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(SentenceBuilder, 'SentenceBuilder', 'src/SentenceBuilder.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/SentenceBuilder.jsx');
}();

;