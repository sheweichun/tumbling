var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import DomRendable from './domRendable';
import DomItem from './domItem';
var merge = Object.assign;

var DomRawScroller = function (_DomRendable) {
    _inherits(DomRawScroller, _DomRendable);

    function DomRawScroller(selector, options) {
        _classCallCheck(this, DomRawScroller);

        var _this = _possibleConstructorReturn(this, (DomRawScroller.__proto__ || Object.getPrototypeOf(DomRawScroller)).call(this, selector, options));

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
        return _this;
    }

    _createClass(DomRawScroller, [{
        key: 'generateRawItems',
        value: function generateRawItems(value) {
            var _this2 = this;

            var fragment = document.createDocumentFragment();
            this.items = value.map(function (itemValue, index) {
                itemValue.step = itemValue.step || Math.floor(Math.random() * _this2.maxRandomStep);
                return DomItem(_this2, itemValue.step, merge({}, _this2.options, {
                    index: index,
                    baseRange: 1,
                    maxValue: itemValue.maxValue || 10
                }), true).mount(fragment);
            });
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'animateStop',
        value: function animateStop(timestamp) {
            var _this3 = this;

            if (this.stopFlag) {
                this.onStop && this.onStop(this.items.map(function (item) {
                    // console.log(item.showCurValue);
                    return item.value % item.maxValue;
                }, this));
                return;
            }
            if (timestamp) {
                this.value.forEach(function (itemValue, index) {
                    var curItem = _this3.items[index];
                    curItem.update(curItem.value + itemValue.step);
                    curItem.value = curItem.value % curItem.maxValue;
                });
                this.animateTimeStamp = timestamp;
                this.animateId = window.requestAnimationFrame(this.animate);
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
        }
    }, {
        key: 'beforeStart',
        value: function beforeStart() {
            this.stopFlag = false;
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this4 = this;

            this.stopFlag = true;
            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.render(this.transitionTime, true);
                if (this.stopImmediate) {
                    this.animateStop();
                    return;
                }
                this.value.forEach(function (itemValue, index) {
                    var curItem = _this4.items[index];
                    curItem.update(curItem.value + Math.floor(itemValue.step * _this4.debounceRatio));
                });
                this.animateId = window.requestAnimationFrame(this.animate);
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
    }]);

    return DomRawScroller;
}(DomRendable);

export default DomRawScroller;