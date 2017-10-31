'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NUMBER_TYPE = 0;
var NO_NUMBER_TYPE = 1;
var NUMBER_REG = new RegExp("[0-9]");

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var BaseItem = exports.BaseItem = function () {
    function BaseItem(context, value, options) {
        _classCallCheck(this, BaseItem);

        var effect = context.effect,
            appearAnimation = context.appearAnimation,
            disappearAnimation = context.disappearAnimation,
            animationFlag = context.animationFlag,
            dom = context.dom,
            renderItem = context.renderItem,
            tween = context.tween;

        this.context = context;
        this.value = value;
        this.index = options.index;
        this.rawMode = options.rawMode || false;
        this.rawDirection = options.rawDirection || 1;
        this.visible = false;
        this.wrapper = null;
        this.effectController = new effect(this, options);
        this.moveRatio = 1;
        this.animationFlag = animationFlag || true;
        this.parentDom = dom;
        this.renderItem = renderItem;
        this.tween = BaseItem.parseTween(tween);;
        this.newBornFlag = options.newBornFlag || false;
        this.appearAnimation = appearAnimation;
        this.disappearAnimation = disappearAnimation;
        this.disappearFlag = false;
    }

    _createClass(BaseItem, [{
        key: 'getWrapperWidth',
        value: function getWrapperWidth() {
            if (!this.wrapperWidth) {
                this.wrapperWidth = this.wrapper.offsetWidth;
                return this.wrapperWidth;
            }
            return this.wrapperWidth;
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this.disappearFlag = true;
        }
    }, {
        key: 'animateRender',
        value: function animateRender() {
            if (!this.visible) {
                this.wrapper.className += ' ' + CLASSNAME_PREFIX + '-visible';
                this.visible = true;
                this.getWrapperWidth();
            }
            if (this.disappearFlag) {
                if (this.disappearAnimation) {
                    this.disappearAnimation(this.wrapper, this.moveRatio);
                } else if (this.animationFlag) {
                    this.wrapper.style.width = this.wrapperWidth * this.moveRatio + 'px';
                    this.wrapper.style.opacity = this.moveRatio;
                }
            } else if (this.newBornFlag) {
                var newRatio = 1 - this.moveRatio;
                if (this.appearAnimation) {
                    this.appearAnimation(this.wrapper, newRatio);
                } else if (this.animationFlag) {
                    this.wrapper.style.width = this.wrapperWidth * newRatio + 'px';
                    this.wrapper.style.opacity = newRatio;
                }
            }
        }
    }], [{
        key: 'parseTween',
        value: function parseTween(tween) {
            if (!tween) {
                return _tween2.default.linear;
            }
            if (typeof tween === 'function') {
                return tween;
            }
            return _tween2.default[tween];
        }
    }]);

    return BaseItem;
}();

var NumberItem = function (_BaseItem) {
    _inherits(NumberItem, _BaseItem);

    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        var _this = _possibleConstructorReturn(this, (NumberItem.__proto__ || Object.getPrototypeOf(NumberItem)).call(this, context, value, options));

        _this.value = 0;
        _this.isNumber = true;
        _this.baseRange = options.baseRange;
        _this.diffDistance = 0;
        _this.maxValue = options.maxValue || 10;
        _this.moveY = 0;
        _this.showCurValue = 0;
        _this.update(value);
        return _this;
    }

    _createClass(NumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var wrapper = document.createElement('div');
            this.effectController.mount(wrapper);
            this.wrapper = wrapper;
            this.visible = false;
            dom.appendChild(wrapper);
            return this;
        }
    }, {
        key: 'update',
        value: function update() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (this.rawMode) {
                this.showPrevValue = this.showNextValue = value;
                if (value === this.value) {
                    this.diffDistance = 0;
                    return;
                }
                this.diffDistance = this.rawDirection;
                this.value = value;
            } else {
                var dividedValue = NumberItem.floor(value / this.baseRange);
                var diff = dividedValue - this.value;
                this.diffDistance = diff;
                this.value = dividedValue;
                this.showPrevValue = this.add(this.showCurValue, -1);
                this.showNextValue = this.add(this.showCurValue, 1);
                this.originCurValue = this.showCurValue;
            }
        }
    }, {
        key: 'processNumber',
        value: function processNumber(value, diff) {
            var ret = NumberItem.floor((value + diff) % this.maxValue);
            if (ret < 0) {
                return this.maxValue + ret;
            }
            return ret;
        }
    }, {
        key: 'add',
        value: function add(value, diff) {
            var fValue = value + diff;
            if (fValue >= this.maxValue) {
                return 0;
            } else if (fValue < 0) {
                return this.maxValue - 1;
            }
            return fValue;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(changeY) {
            var integerDistance = NumberItem.floor(changeY);
            this.showCurValue = this.processNumber(this.originCurValue, integerDistance);
            this.showPrevValue = this.add(this.showCurValue, -1);
            this.showNextValue = this.add(this.showCurValue, 1);
        }
    }, {
        key: 'updateRawValue',
        value: function updateRawValue(changeY) {
            if (changeY === 1 || changeY === -1) {
                this.showCurValue = this.showPrevValue;
                this.showPrevValue = this.showNextValue = this.showCurValue;
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var distance = void 0;
            var transitionTime = this.context.transitionTime;

            if (stopFlag && this.newBornFlag) {
                this.newBornFlag = false;
            }
            if (this.diffDistance === 0) {
                return;
            }
            //easeOutElastic linear
            if (tm === transitionTime) {
                distance = this.diffDistance;
            } else {
                distance = this.tween(tm, 0, this.diffDistance, transitionTime);
            }
            // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
            this.moveRatio = (transitionTime - tm) / transitionTime;
            this.moveY = distance;
            if (this.rawMode) {
                this.updateRawValue(distance);
            } else {
                this.updateValue(distance);
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.parentDom && this.wrapper) {
                this.parentDom.removeChild(this.wrapper);
                this.wrapper = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var diffDistance = this.diffDistance;

            if (diffDistance === 0) return;
            var changeY = this.moveY % 1;
            this.animateRender();
            this.effectController.render(diffDistance, changeY);
        }
    }], [{
        key: 'floor',
        value: function floor(val) {
            if (val < 0) {
                return -Math.floor(-val);
            }
            return Math.floor(val);
        }
    }]);

    return NumberItem;
}(BaseItem);

var NoNumberItem = function (_BaseItem2) {
    _inherits(NoNumberItem, _BaseItem2);

    function NoNumberItem(context, value, options) {
        _classCallCheck(this, NoNumberItem);

        return _possibleConstructorReturn(this, (NoNumberItem.__proto__ || Object.getPrototypeOf(NoNumberItem)).call(this, context, value, options));
    }

    _createClass(NoNumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var wrapper = document.createElement('div');
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = this.value;
            this.wrapper = wrapper;
            dom.appendChild(wrapper);
            return this;
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.parentDom && this.wrapper) {
                this.parentDom.removeChild(this.wrapper);
                this.wrapper = null;
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var transitionTime = this.context.transitionTime;

            this.moveRatio = (transitionTime - tm) / transitionTime;
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {
            this.animateRender();
        }
    }]);

    return NoNumberItem;
}(BaseItem);

exports.default = function (context, value, options, flag) {
    if (flag) {
        return new NumberItem(context, value, options);
    }
    return new NoNumberItem(context, value, options);
};