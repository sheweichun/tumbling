'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _domRendable = require('./domRendable');

var _domRendable2 = _interopRequireDefault(_domRendable);

var _domItem = require('./domItem');

var _domItem2 = _interopRequireDefault(_domItem);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var DomNumber = function (_DomRendable) {
    _inherits(DomNumber, _DomRendable);

    function DomNumber(selector, options) {
        _classCallCheck(this, DomNumber);

        var _this2 = _possibleConstructorReturn(this, (DomNumber.__proto__ || Object.getPrototypeOf(DomNumber)).call(this, selector, options));

        var thousand = options.thousand,
            effect = options.effect;

        var _this = _this2;
        _this.thousand = thousand;
        _this.options = options;
        _this.generateNumberItems(_this.value);
        return _this2;
    }

    _createClass(DomNumber, [{
        key: 'generateDomItem',
        value: function generateDomItem(isNumber, val, index, maxValue, baseRange, newBornFlag) {
            var _this = this;
            return (0, _domItem2.default)(_this, val, merge({}, _this.options, {
                index: index,
                newBornFlag: newBornFlag,
                baseRange: baseRange,
                maxValue: maxValue
            }), isNumber);
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _this = this;

            var _DomNumber$parseValue = DomNumber.parseValue(val, _this.thousand),
                valueStr = _DomNumber$parseValue.valueStr,
                transformValueStr = _DomNumber$parseValue.transformValueStr;

            var valStrLenMinus1 = valueStr.length - 1;
            var fragment = document.createDocumentFragment();
            _this.strItems = {};
            var transformIndex = 0,
                domItems = [];
            valueStr.forEach(function (value, index) {
                var maxValue = 10;
                var baseRange = Math.pow(maxValue, valStrLenMinus1 - index);
                var transformCurVal = transformValueStr[transformIndex];
                var isNumber = _util.NUMBER_REG.test(transformCurVal);
                if (!isNumber) {
                    var domItem = _this.generateDomItem(false, transformCurVal, index, maxValue, baseRange).mount(fragment);
                    _this.strItems[valStrLenMinus1 - transformIndex] = domItem;
                    // domItems.push(domItem);
                    transformIndex++;
                }
                transformIndex++;
                domItems.push(_this.generateDomItem(true, val, index, maxValue, baseRange).mount(fragment));
            });
            _this.items = domItems;
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value, options) {
            _get(DomNumber.prototype.__proto__ || Object.getPrototypeOf(DomNumber.prototype), 'update', this).call(this, options);
            var _this = this;
            _this.complete();
            if (value !== _this.value) {
                var _DomNumber$parseValue2 = DomNumber.parseValue(value, _this.thousand),
                    valueStr = _DomNumber$parseValue2.valueStr,
                    transformValueStr = _DomNumber$parseValue2.transformValueStr;

                var itemsLen = _this.items.length;
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
                            if (!_this.strItems[strIndex]) {
                                var domItem = _this.generateDomItem(false, transformCurVal, i, maxValue, baseRange, true).mount(fragment);
                                _this.strItems[strIndex] = domItem;
                            }
                            transformIndex++;
                        }
                        if (i < diffLen) {
                            newItems.push(_this.generateDomItem(true, value, i, maxValue, baseRange, true).mount(fragment));
                        }

                        transformIndex++;
                    }
                    _this.dom.insertBefore(fragment, _this.dom.children[0]);
                } else if (diffLen < 0) {
                    for (var _i = 0; _i < -diffLen; _i++) {
                        _this.items[_i].disappear();
                    }
                    for (var index in _this.strItems) {
                        var tmpItem = _this.strItems[index];
                        if (_util.NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length) {
                            tmpItem.disappear();
                        }
                    }
                }
                _this.items.forEach(function (item) {
                    item.update(value);
                });
                if (newItems) {
                    _this.items = newItems.concat(_this.items);
                }
                _this.animateId = window.requestAnimationFrame(_this.animate);
                _this.value = value;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this = this;
            _this.items = _this.items.filter(function (item) {
                if (item.disappearFlag) {
                    item.remove();
                }
                return !item.disappearFlag;
            });
            for (var index in _this.strItems) {
                var curItem = _this.strItems[index];
                if (curItem.disappearFlag) {
                    curItem.remove();
                    delete _this.strItems[index];
                }
            }
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