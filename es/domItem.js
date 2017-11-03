var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NUMBER_TYPE = 0;
var NO_NUMBER_TYPE = 1;
var NUMBER_REG = new RegExp("[0-9]");

var CLASSNAME_PREFIX = 'tumbling-wrapper';

export var BaseItem = function () {
    function BaseItem(context, value, options) {
        _classCallCheck(this, BaseItem);

        var effect = context.effect,
            appearAnimation = context.appearAnimation,
            disappearAnimation = context.disappearAnimation,
            animationFlag = context.animationFlag,
            dom = context.dom,
            renderItem = context.renderItem,
            tween = context.tween;

        var _this = this;
        _this.context = context;
        _this.value = value;
        _this.index = options.index;
        _this.rawMode = options.rawMode || false;
        _this.rawDirection = options.rawDirection || 1;
        _this.visible = false;
        _this.wrapper = null;
        _this.hasRender = false;
        _this.effectController = new effect(_this, options);
        _this.moveRatio = 1;
        _this.animationFlag = animationFlag || true;
        _this.parentDom = dom;
        _this.renderItem = renderItem;
        _this.newBornFlag = options.newBornFlag || false;
        _this.appearAnimation = appearAnimation;
        _this.disappearAnimation = disappearAnimation;
        _this.disappearFlag = false;
    }

    _createClass(BaseItem, [{
        key: 'remove',
        value: function remove() {
            var _this = this;
            if (_this.parentDom && _this.wrapper) {
                _this.parentDom.removeChild(_this.wrapper);
                _this.wrapper = null;
            }
        }
    }, {
        key: 'getWrapperWidth',
        value: function getWrapperWidth() {
            var _this = this;
            if (!_this.wrapperWidth) {
                _this.wrapperWidth = _this.wrapper.offsetWidth;
                return _this.wrapperWidth;
            }
            return _this.wrapperWidth;
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this.disappearFlag = true;
        }
    }, {
        key: 'animateRender',
        value: function animateRender() {
            var _this = this;
            if (!_this.visible) {
                _this.wrapper.className += ' ' + CLASSNAME_PREFIX + '-visible';
                _this.visible = true;
                _this.getWrapperWidth();
            }
            if (_this.disappearFlag) {
                if (_this.disappearAnimation) {
                    _this.disappearAnimation(_this.wrapper, _this.moveRatio);
                } else if (this.animationFlag) {
                    _this.wrapper.style.width = _this.wrapperWidth * _this.moveRatio + 'px';
                    _this.wrapper.style.opacity = _this.moveRatio;
                }
            } else if (_this.newBornFlag) {
                var newRatio = 1 - _this.moveRatio;
                if (_this.appearAnimation) {
                    _this.appearAnimation(_this.wrapper, newRatio);
                } else if (this.animationFlag) {
                    _this.wrapper.style.width = _this.wrapperWidth * newRatio + 'px';
                    _this.wrapper.style.opacity = newRatio;
                }
            }
        }
    }]);

    return BaseItem;
}();

var NumberItem = function (_BaseItem) {
    _inherits(NumberItem, _BaseItem);

    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        var _this2 = _possibleConstructorReturn(this, (NumberItem.__proto__ || Object.getPrototypeOf(NumberItem)).call(this, context, value, options));

        var _this = _this2;
        _this.value = 0;
        _this.isNumber = true;
        _this.baseRange = options.baseRange;
        _this.diffDistance = 0;
        _this.maxValue = options.maxValue || 10;
        _this.moveY = 0;
        _this.showCurValue = 0;
        _this.update(value);
        return _this2;
    }

    _createClass(NumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var _this = this;
            var wrapper = document.createElement('div');
            _this.effectController.mount(wrapper);
            _this.wrapper = wrapper;
            _this.visible = false;
            dom.appendChild(wrapper);
            return _this;
        }
    }, {
        key: 'update',
        value: function update() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var _this = this;
            if (_this.rawMode) {
                _this.showPrevValue = _this.showNextValue = value;
                if (value === _this.value) {
                    _this.diffDistance = 0;
                    return;
                }
                _this.diffDistance = _this.rawDirection;
                _this.value = value;
            } else {
                var dividedValue = NumberItem.floor(value / _this.baseRange);
                var diff = dividedValue - _this.value;
                _this.diffDistance = diff;
                _this.value = dividedValue;
                _this.showPrevValue = _this.add(_this.showCurValue, -1);
                _this.showNextValue = _this.add(_this.showCurValue, 1);
                _this.originCurValue = _this.showCurValue;
            }
        }
    }, {
        key: 'processNumber',
        value: function processNumber(value, diff) {
            var _this = this;
            var ret = NumberItem.floor((value + diff) % _this.maxValue);
            if (ret < 0) {
                return _this.maxValue + ret;
            }
            return ret;
        }
    }, {
        key: 'add',
        value: function add(value, diff) {
            var _this = this;
            var fValue = value + diff;
            if (fValue >= _this.maxValue) {
                return 0;
            } else if (fValue < 0) {
                return _this.maxValue - 1;
            }
            return fValue;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(changeY) {
            var _this = this;
            var integerDistance = NumberItem.floor(changeY);
            _this.showCurValue = _this.processNumber(_this.originCurValue, integerDistance);
            _this.showPrevValue = _this.add(_this.showCurValue, -1);
            _this.showNextValue = _this.add(_this.showCurValue, 1);
        }
    }, {
        key: 'updateRawValue',
        value: function updateRawValue(changeY) {
            var _this = this;
            if (changeY === 1 || changeY === -1) {
                _this.showCurValue = _this.showPrevValue;
                _this.showPrevValue = _this.showNextValue = _this.showCurValue;
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var distance = void 0;
            var transitionTime = _this.context.transitionTime;

            if (stopFlag && _this.newBornFlag) {
                _this.newBornFlag = false;
            }
            if (_this.diffDistance === 0) {
                return;
            }
            //easeOutElastic linear
            if (tm === transitionTime) {
                distance = _this.diffDistance;
            } else {
                distance = _this.context.tween(tm, 0, _this.diffDistance, transitionTime);
            }
            // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
            _this.moveRatio = (transitionTime - tm) / transitionTime;
            _this.moveY = distance;
            if (_this.rawMode) {
                _this.updateRawValue(distance);
            } else {
                _this.updateValue(distance);
            }
        }
        // remove(){
        //     const _this = this;
        //     if(_this.parentDom && _this.wrapper){
        //         _this.parentDom.removeChild(_this.wrapper);
        //         _this.wrapper = null;
        //     }
        // }

    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var diffDistance = _this.diffDistance;

            if (diffDistance === 0 && _this.hasRender) return;
            _this.hasRender = true;
            var changeY = _this.moveY % 1;
            _this.animateRender();
            _this.effectController.render(diffDistance, changeY);
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
            var _this = this;
            var wrapper = document.createElement('div');
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = _this.value;
            _this.wrapper = wrapper;
            dom.appendChild(wrapper);
            return _this;
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var transitionTime = _this.context.transitionTime;

            _this.moveRatio = (transitionTime - tm) / transitionTime;
            if (stopFlag && _this.newBornFlag) {
                _this.newBornFlag = false;
            }
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

export default (function (context, value, options, flag) {
    if (flag) {
        return new NumberItem(context, value, options);
    }
    return new NoNumberItem(context, value, options);
});