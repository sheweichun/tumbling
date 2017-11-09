'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domRendable = require('./domRendable');

var _domRendable2 = _interopRequireDefault(_domRendable);

var _domItem = require('./domItem');

var _domItem2 = _interopRequireDefault(_domItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var DomRawScroller = function (_DomRendable) {
    _inherits(DomRawScroller, _DomRendable);

    function DomRawScroller(selector, options) {
        _classCallCheck(this, DomRawScroller);

        var _this2 = _possibleConstructorReturn(this, (DomRawScroller.__proto__ || Object.getPrototypeOf(DomRawScroller)).call(this, selector, options));

        var _this = _this2;
        var thousand = options.thousand,
            effect = options.effect;

        _this.value = DomRawScroller.transformValue(_this.value);
        _this.stopImmediate = options.stopImmediate || false;
        _this.maxRandomStep = options.maxRandomStep || 100;
        _this.debounceRatio = options.debounceRatio || 0.3;
        _this.stopFlag = false;
        _this.onStop = options.onStop;
        _this.options = options;
        _this.generateRawItems(_this.value);
        return _this2;
    }

    _createClass(DomRawScroller, [{
        key: 'generateRawItems',
        value: function generateRawItems(value) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            _this.items = value.map(function (itemValue, index) {
                itemValue.step = itemValue.step || Math.floor(Math.random() * _this.maxRandomStep);
                return (0, _domItem2.default)(_this, itemValue.step, merge({}, _this.options, {
                    index: index,
                    baseRange: 1,
                    maxValue: itemValue.maxValue || 10
                }), true).mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'updateItems',
        value: function updateItems(getNewValue) {
            getNewValue = getNewValue || DomRawScroller.addValue;
            var _this = this;
            _this.value.forEach(function (itemValue, index) {
                var curItem = _this.items[index];
                curItem.update(getNewValue(curItem, itemValue));
                curItem.value = curItem.value % curItem.maxValue;
            });
        }
    }, {
        key: 'animateStop',
        value: function animateStop(timestamp) {
            var _this = this;
            if (_this.stopFlag) {
                _this.onStop && _this.onStop(_this.items.map(function (item) {
                    // console.log(item.showCurValue);
                    return item.value % item.maxValue;
                }, _this));
                return;
            }
            if (timestamp) {
                _this.updateItems();
                _this.animateTimeStamp = timestamp;
                _this.animateId = window.requestAnimationFrame(_this.animate);
            }
        }
    }, {
        key: 'beforeStart',
        value: function beforeStart() {
            this.stopFlag = false;
            this.updateItems();
        }
    }, {
        key: 'afterStartComplete',
        value: function afterStartComplete() {
            this.updateItems();
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this = this;
            if (_this.stopFlag) return;
            _this.stopFlag = true;
            if (_this.animateId) {
                window.cancelAnimationFrame(_this.animateId);
                _this.animateId = null;
                _this.render(_this.transitionTime, true);
                if (_this.stopImmediate) {
                    _this.animateStop();
                    return;
                }
                _this.updateItems(function (curItem, itemValue) {
                    return curItem.value + Math.floor(itemValue.step * _this.debounceRatio);
                });
                _this.animateId = window.requestAnimationFrame(_this.animate);
            }
        }
    }], [{
        key: 'transformValue',
        value: function transformValue(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
                var newValue = [];
                for (var i = 0; i < value; i++) {
                    newValue.push({});
                }
                return newValue;
            }
            return value;
        }
    }, {
        key: 'addValue',
        value: function addValue(curItem, itemValue) {
            return curItem.value + itemValue.step;
        }
    }]);

    return DomRawScroller;
}(_domRendable2.default);

exports.default = DomRawScroller;