'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tween = require('./tween');

var _tween2 = _interopRequireDefault(_tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NUMBER_TYPE = 0;
var NO_NUMBER_TYPE = 1;
var NUMBER_REG = new RegExp("[0-9]");

var NumberItem = function () {
    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        this.context = context;
        this.value = 0;
        this.index = options.index;
        this.color = options.color;
        this.margin = options.margin || 0;
        this.baseRange = options.baseRange;
        this.maxValue = options.maxValue || 10;
        this.height = options.height + this.margin;
        this.backgroundColor = options.backgroundColor || '';
        this.diffDistance = 0;
        this.moveY = 0;
        this.moveRatio = 1;
        this.disappearFlag = false;
        this.newBornFlag = options.newBornFlag || false;
        this.showCurValue = 0;
        this.showPrevValue = this.add(this.showCurValue, -1);
        this.showNextValue = this.add(this.showCurValue, 1);
        this.update(value);
    }

    _createClass(NumberItem, [{
        key: 'update',
        value: function update() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var dividedValue = NumberItem.floor(value / this.baseRange);
            var diff = dividedValue - this.value;
            this.diffDistance = diff;
            this.value = dividedValue;
            this.originCurValue = this.showCurValue;
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

            // else if(this.diffDistance > 0){
            //     distance = Tween.easeOutElastic(tm,0,this.diffDistance,this.context.transitionTime);
            // }
            else {
                    //easeOutElastic
                    distance = _tween2.default.linear(tm, 0, this.diffDistance, transitionTime);
                }
            this.moveRatio = (this.diffDistance - _tween2.default.linear(tm, 0, this.diffDistance, transitionTime)) / this.diffDistance;
            this.moveY = distance;
            this.updateValue(distance);
        }
    }, {
        key: 'getUnitWidth',
        value: function getUnitWidth(val) {
            if (this.disappearFlag && this.moveRatio != null) {
                return Math.floor(val * this.moveRatio);
            }
            if (this.newBornFlag && this.moveRatio != null) {
                return Math.floor(val * (1 - this.moveRatio));
            }
            return val;
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this.disappearFlag = true;
        }
    }, {
        key: 'fillBackground',
        value: function fillBackground(ctx, x, rectWidth, rectHeight) {
            if (this.backgroundColor) {
                ctx.fillStyle = this.backgroundColor;
                ctx.fillRect(x, 0, rectWidth, rectHeight);
            }
        }
    }, {
        key: 'render',
        value: function render(ctx, x, fillX, y, rectWidth, rectHeight) {
            var height = this.height,
                diffDistance = this.diffDistance;

            var changeY = this.moveY % 1 * this.height;
            // console.log(this.showPrevValue,this.showCurValue,this.showNextValue,changeY);
            if (this.disappearFlag) {
                ctx.save();
                ctx.scale(this.moveRatio, 1);
                this.fillBackground(ctx, fillX, rectWidth, rectHeight);
                ctx.globalAlpha = this.moveRatio;
            } else if (this.newBornFlag) {
                var newRatio = 1 - this.moveRatio;
                ctx.save();
                ctx.scale(newRatio, 1);
                this.fillBackground(ctx, fillX, rectWidth, rectHeight);
                ctx.globalAlpha = newRatio;
            } else {
                this.fillBackground(ctx, fillX, rectWidth, rectHeight);
            }
            ctx.fillStyle = this.color;
            diffDistance > 0 && NumberItem.renderText(ctx, this.showNextValue, x, y + changeY - height);
            NumberItem.renderText(ctx, this.showCurValue, x, y + changeY);
            diffDistance < 0 && NumberItem.renderText(ctx, this.showPrevValue, x, y + changeY + height);
            if (this.disappearFlag || this.newBornFlag) {
                ctx.restore();
            }
        }
    }], [{
        key: 'floor',
        value: function floor(val) {
            if (val < 0) {
                return -Math.floor(-val);
            }
            return Math.floor(val);
        }
    }, {
        key: 'renderText',
        value: function renderText(ctx, content, x, y) {
            if (content != null && content >= 0) {
                ctx.fillText(content, x, y);
            }
        }
    }]);

    return NumberItem;
}();

var NoNumberItem = function NoNumberItem(context, value) {
    _classCallCheck(this, NoNumberItem);

    this.context = context;
    this.value = value;
};

exports.default = function (context, value, options) {
    if (NUMBER_REG.test(value)) {
        return new NumberItem(context, value, options);
    }
    return new NoNumberItem(context, value, options);
};