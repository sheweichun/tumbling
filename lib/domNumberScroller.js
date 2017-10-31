'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domRendable = require('./domRendable');

var _domRendable2 = _interopRequireDefault(_domRendable);

var _domItem = require('./domItem');

var _domItem2 = _interopRequireDefault(_domItem);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var DomNumber = function (_DomRendable) {
    _inherits(DomNumber, _DomRendable);

    function DomNumber(selector, options) {
        _classCallCheck(this, DomNumber);

        var _this = _possibleConstructorReturn(this, (DomNumber.__proto__ || Object.getPrototypeOf(DomNumber)).call(this, selector, options));

        var thousand = options.thousand,
            effect = options.effect;

        _this.thousand = thousand;
        _this.options = options;
        _this.generateNumberItems(_this.value);
        return _this;
    }

    _createClass(DomNumber, [{
        key: 'generateDomItem',
        value: function generateDomItem(isNumber, val, index, maxValue, baseRange, newBornFlag) {
            return (0, _domItem2.default)(this, val, merge({}, this.options, {
                index: index,
                newBornFlag: newBornFlag,
                baseRange: baseRange,
                maxValue: maxValue
            }), isNumber);
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var _this2 = this;

            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _DomNumber$parseValue = DomNumber.parseValue(val, this.thousand),
                valueStr = _DomNumber$parseValue.valueStr,
                transformValueStr = _DomNumber$parseValue.transformValueStr;

            var valStrLenMinus1 = valueStr.length - 1;
            var fragment = document.createDocumentFragment();
            this.strItems = {};
            var transformIndex = 0,
                domItems = [];
            valueStr.forEach(function (value, index) {
                var maxValue = 10;
                var baseRange = Math.pow(maxValue, valStrLenMinus1 - index);
                var transformCurVal = transformValueStr[transformIndex];
                var isNumber = _util.NUMBER_REG.test(transformCurVal);
                if (!isNumber) {
                    var domItem = _this2.generateDomItem(false, transformCurVal, index, maxValue, baseRange).mount(fragment);
                    _this2.strItems[valStrLenMinus1 - transformIndex] = domItem;
                    // domItems.push(domItem);
                    transformIndex++;
                }
                transformIndex++;
                domItems.push(_this2.generateDomItem(true, val, index, maxValue, baseRange).mount(fragment));
            });
            this.items = domItems;
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            this.complete();
            if (value !== this.value) {
                var _DomNumber$parseValue2 = DomNumber.parseValue(value, this.thousand),
                    valueStr = _DomNumber$parseValue2.valueStr,
                    transformValueStr = _DomNumber$parseValue2.transformValueStr;

                var itemsLen = this.items.length;
                var valStrLen = valueStr.length;

                var diffLen = valStrLen - itemsLen;
                var newItems = void 0;
                if (diffLen > 0) {
                    newItems = [];
                    var fragment = document.createDocumentFragment();
                    var valStrLenMinus1 = valStrLen - 1;
                    var transformIndex = 0,
                        strIndex = void 0;
                    for (var i = 0; i < valStrLen; i++) {
                        var maxValue = 10;
                        var baseRange = Math.pow(maxValue, valStrLenMinus1 - i);
                        var transformCurVal = transformValueStr[transformIndex];
                        var isNumber = _util.NUMBER_REG.test(transformCurVal);
                        strIndex = valStrLenMinus1 - transformIndex;
                        if (!isNumber) {
                            if (!this.strItems[strIndex]) {
                                var domItem = this.generateDomItem(false, transformCurVal, i, maxValue, baseRange, true).mount(fragment);
                                this.strItems[strIndex] = domItem;
                            }
                            transformIndex++;
                        }
                        if (i < diffLen) {
                            // console.log('push i');
                            newItems.push(this.generateDomItem(true, value, i, maxValue, baseRange, true).mount(fragment));
                        }

                        transformIndex++;
                    }
                    // console.log('newItems :',newItems.length);
                    this.dom.insertBefore(fragment, this.dom.children[0]);
                } else if (diffLen < 0) {
                    for (var _i = 0; _i < -diffLen; _i++) {
                        this.items[_i].disappear();
                    }
                    for (var index in this.strItems) {
                        var tmpItem = this.strItems[index];
                        if (_util.NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length) {
                            tmpItem.disappear();
                        }
                    }
                }
                this.items.forEach(function (item) {
                    item.update(value);
                });
                if (newItems) {
                    this.items = newItems.concat(this.items);
                }
                this.animateId = window.requestAnimationFrame(this.animate);
                this.value = value;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = this.items.filter(function (item) {
                if (item.disappearFlag) {
                    item.remove();
                }
                return !item.disappearFlag;
            });
            for (var index in this.strItems) {
                var curItem = this.strItems[index];
                if (curItem.disappearFlag) {
                    curItem.remove();
                    delete this.strItems[index];
                }
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this.items.forEach(function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item.render();
            });
            for (var index in this.strItems) {
                var curItem = this.strItems[index];
                curItem.move(tm, flag);
                curItem.render();
            }
            // ctx.fillText('370911',0,0);
        }
    }], [{
        key: 'parseValue',
        value: function parseValue(val, thousandFlag) {
            var integerVal = parseInt(val);
            var valueStr = ('' + integerVal).split(''),
                transformValueStr = valueStr;
            if (thousandFlag) {
                transformValueStr = (0, _util.toThousands)(integerVal).split('');
            }
            return {
                valueStr: valueStr,
                transformValueStr: transformValueStr
            };
        }
    }]);

    return DomNumber;
}(_domRendable2.default);

exports.default = DomNumber;