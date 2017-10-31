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

var Countdown = function (_DomRendable) {
    _inherits(Countdown, _DomRendable);

    function Countdown(selector, options) {
        _classCallCheck(this, Countdown);

        var _this = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, selector, options));

        _this.options = options;
        _this.direction = options.direction || Countdown.ADD;
        _this.init(_this.value);
        return _this;
    }

    _createClass(Countdown, [{
        key: 'init',
        value: function init(value) {
            var _this2 = this;

            var valStrArr = (value + '').split('');
            var fragment = document.createDocumentFragment();
            var numberIndex = 0;
            this.items = valStrArr.map(function (val, index) {
                var isNumber = _util.NUMBER_REG.test(val);
                var itemValue = isNumber ? parseInt(val) : val;
                var item = (0, _domItem2.default)(_this2, itemValue, merge({}, _this2.options, {
                    index: index,
                    rawDirection: _this2.direction === Countdown.ADD ? 1 : -1,
                    rawMode: true
                }), isNumber);
                if (isNumber) {
                    numberIndex++;
                }
                return item.mount(fragment);
            });
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            var _this3 = this;

            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.render(this.transitionTime, true);
            }
            if (value !== this.value) {
                var valStrArr = (value + '').split('');
                valStrArr.forEach(function (val, index) {
                    var curItem = _this3.items[index];
                    if (curItem.isNumber) {
                        var updateVal = parseInt(val);
                        curItem.update(updateVal);
                    }
                });
                this.animateId = window.requestAnimationFrame(this.animate);
                this.value = value;
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
    }]);

    return Countdown;
}(_domRendable2.default);

Countdown.ADD = 0;
Countdown.MINUS = 1;
exports.default = Countdown;