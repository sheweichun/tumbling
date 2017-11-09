var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Canvas from './canvas';
import CanvasItem from './canvasItem';

var merge = Object.assign;
var DEFAULT_OPTIONS = {
    transitionTime: 300
};

var NumberScroll = function () {
    function NumberScroll(selector, options) {
        _classCallCheck(this, NumberScroll);

        this.dom = document.querySelector(selector);
        var mergeOptions = merge({ width: this.dom.offsetWidth, height: this.dom.offsetHeight }, DEFAULT_OPTIONS, options);
        var value = mergeOptions.value,
            unitWidth = mergeOptions.unitWidth,
            height = mergeOptions.height,
            width = mergeOptions.width,
            transitionTime = mergeOptions.transitionTime,
            itemMargin = mergeOptions.itemMargin,
            itemBackgroundColor = mergeOptions.itemBackgroundColor,
            backgroundColor = mergeOptions.backgroundColor,
            color = mergeOptions.color;

        this.height = height;
        this.baseLineHeight = this.height / 2;
        this.width = width;
        this.itemMargin = itemMargin;
        this.animateId = null;
        this.transitionTime = transitionTime;
        this.unitWidth = unitWidth;
        this.value = value;
        this.canvas = new Canvas(mergeOptions);
        this.canvas.mount(this.dom);
        this.color = color || 'black';
        this.itemBackgroundColor = this.getBackGroundColor(itemBackgroundColor);
        this.backgroundColor = this.getBackGroundColor(backgroundColor);
        this.generateNumberItems(value);
        this.animateTimeStamp = null;
        this.animate = this.animate.bind(this);
    }

    _createClass(NumberScroll, [{
        key: 'getBackGroundColor',
        value: function getBackGroundColor(value) {
            if (value && typeof value === 'function') {
                return value(this.canvas.context);
            }
            return value;
        }
    }, {
        key: 'generateCanvasItem',
        value: function generateCanvasItem(val, index, maxValue, baseRange, newBornFlag) {
            return CanvasItem(this, val, {
                height: this.height,
                index: index,
                color: this.color,
                backgroundColor: this.itemBackgroundColor,
                margin: this.itemMargin,
                newBornFlag: newBornFlag,
                transitionTime: this.transitionTime,
                baseRange: baseRange,
                maxValue: maxValue
            });
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var _this = this;

            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var valStr = (parseInt(val) + '').split('');
            var valStrLenMinus1 = valStr.length - 1;

            this.items = valStr.map(function (value, index) {
                var maxValue = 10;
                var baseRange = Math.pow(maxValue, valStrLenMinus1 - index);
                return _this.generateCanvasItem(val, index, maxValue, baseRange);
            });
        }
    }, {
        key: 'animate',
        value: function animate(tm) {
            if (this.animateTimeStamp == null) {
                this.animateTimeStamp = tm;
                window.requestAnimationFrame(this.animate);
                return;
            }
            var diff = tm - this.animateTimeStamp;
            var stopFlag = false;
            if (diff >= this.transitionTime) {
                this.animateTimeStamp = null;
                stopFlag = true;
                diff = this.transitionTime;
                this.items = this.items.filter(function (item) {
                    return !item.disappearFlag;
                });
            }
            /**
             * 
             */
            this.render(diff, stopFlag);

            if (stopFlag) {
                this.animateId = null;
                return;
            }
            this.animateId = window.requestAnimationFrame(this.animate);
        }
    }, {
        key: 'start',
        value: function start() {
            this.render();
            if (this.value) {
                this.animateId = window.requestAnimationFrame(this.animate);
            }
        }
    }, {
        key: 'update',
        value: function update(value) {
            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.render(this.transitionTime, true);
            }
            var valStr = (parseInt(value) + '').split('');
            var itemsLen = this.items.length;
            var valStrLen = valStr.length;
            var diffLen = valStrLen - itemsLen;
            var newItems = void 0;
            if (diffLen > 0) {
                newItems = [];
                var valStrLenMinus1 = valStrLen - 1;
                for (var i = 0; i < diffLen; i++) {
                    var maxValue = 10;
                    var baseRange = Math.pow(maxValue, valStrLenMinus1 - i);
                    newItems.push(this.generateCanvasItem(value, i, maxValue, baseRange, true));
                }
            } else if (diffLen < 0) {
                for (var _i = 0; _i < -diffLen; _i++) {
                    this.items[_i].disappear();
                }
            }
            this.items.forEach(function (item) {
                item.update(value);
            });
            if (newItems) {
                this.items = newItems.concat(this.items);
            }
            if (value !== this.value) {
                this.animateId = window.requestAnimationFrame(this.animate);
                this.value = value;
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            var _this2 = this;

            var ctx = this.canvas.context;
            if (this.backgroundColor) {
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(0, 0, this.width, this.height);
            } else {
                ctx.clearRect(0, 0, this.width, this.height);
            }
            ctx.textAlign = "center";
            ctx.font = "92px Arial";
            // ctx.textBaseline = "hanging";
            ctx.textBaseline = "middle";
            var startX = 0;
            this.items.forEach(function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item.render(ctx, startX + _this2.unitWidth / 2, startX, _this2.baseLineHeight, _this2.unitWidth, _this2.height);
                startX += item.getUnitWidth(_this2.unitWidth);
            });
            // ctx.fillText('370911',0,0);
        }
    }], [{
        key: 'createLinearGradient',
        value: function createLinearGradient(ctx, x1, y1, x2, y2, colors) {
            var grad = ctx.createLinearGradient(x1, y1, x2, y2);
            /* 指定几个颜色 */
            colors && colors.map(function (color) {
                grad.addColorStop(color.position, color.value);
            });
            return grad;
        }
    }]);

    return NumberScroll;
}();

export default NumberScroll;