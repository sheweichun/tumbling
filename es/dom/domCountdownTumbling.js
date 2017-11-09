var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import DomRendable from './domRendable';
import DomItem from './domItem';
import { NUMBER_REG } from '../util/index';
var merge = Object.assign;

var Countdown = function (_DomRendable) {
    _inherits(Countdown, _DomRendable);

    function Countdown(selector, options) {
        _classCallCheck(this, Countdown);

        var _this2 = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, selector, options));

        var _this = _this2;
        _this.options = options;
        _this.direction = options.direction || Countdown.ADD;
        _this.init(_this2.value);
        return _this2;
    }

    _createClass(Countdown, [{
        key: 'init',
        value: function init(value) {
            var _this = this;
            var valStrArr = (value + '').split('');
            var fragment = document.createDocumentFragment();
            var numberIndex = 0;
            _this.items = valStrArr.map(function (val, index) {
                var isNumber = NUMBER_REG.test(val);
                var itemValue = isNumber ? parseInt(val) : val;
                var item = DomItem(_this, itemValue, merge({}, _this.options, {
                    index: index,
                    rawDirection: _this.direction === Countdown.ADD ? 1 : -1,
                    rawMode: true
                }), isNumber);
                if (isNumber) {
                    numberIndex++;
                }
                return item.mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value, options) {
            _get(Countdown.prototype.__proto__ || Object.getPrototypeOf(Countdown.prototype), 'update', this).call(this, options);
            var _this = this;
            if (_this.animateId) {
                window.cancelAnimationFrame(_this.animateId);
                _this.animateId = null;
                _this.render(_this.transitionTime, true);
            }
            if (value !== _this.value) {
                var valStrArr = (value + '').split('');
                valStrArr.forEach(function (val, index) {
                    var curItem = _this.items[index];
                    if (curItem.isNumber) {
                        var updateVal = parseInt(val);
                        curItem.update(updateVal);
                    }
                });
                _this.animateId = window.requestAnimationFrame(_this.animate);
                _this.value = value;
            }
        }
    }]);

    return Countdown;
}(DomRendable);

Countdown.ADD = 0;
Countdown.MINUS = 1;


export default Countdown;