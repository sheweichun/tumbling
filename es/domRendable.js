var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var merge = Object.assign;
var DEFAULT_OPTIONS = {
    // transitionTime:300
};
import TumblingRender from './tumblingRender';

var DomRendable = function () {
    function DomRendable(selector, options) {
        _classCallCheck(this, DomRendable);

        var mergeOptions = merge({}, DEFAULT_OPTIONS, options);
        this.dom = document.querySelector(selector);
        var renderItem = mergeOptions.renderItem,
            animationRender = mergeOptions.animationRender,
            appearAnimation = mergeOptions.appearAnimation,
            disappearAnimation = mergeOptions.disappearAnimation,
            animationFlag = mergeOptions.animationFlag,
            tween = mergeOptions.tween,
            effect = mergeOptions.effect;

        this.animateTimeStamp = null;
        this.animateId = null;
        this.effect = effect || TumblingRender;
        this.value = options.value;
        this.startedFlag = false;
        this.transitionTime = options.transitionTime || 300;
        this.renderItem = renderItem;
        this.appearAnimation = appearAnimation;
        this.animationRender = animationRender;
        this.tween = tween;
        this.disappearAnimation = disappearAnimation;
        this.animationFlag = animationFlag;
        this.animate = this.animate.bind(this);
    }

    _createClass(DomRendable, [{
        key: 'clear',
        value: function clear() {}
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
                stopFlag = true;
                diff = this.transitionTime;
                this.animateTimeStamp = null;
                this.clear();
            }
            /**
             * 
             */
            this.render(diff, stopFlag);

            if (stopFlag) {
                this.animateStop && this.animateStop(tm);
                this.animateId = null;
                return;
            }
            this.animateId = window.requestAnimationFrame(this.animate);
        }
    }, {
        key: 'complete',
        value: function complete() {
            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.clear();
                this.render(this.transitionTime, true);
            }
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'start',
        value: function start() {
            this.beforeStart && this.beforeStart();
            if (!this.startedFlag) {
                this.startedFlag = true;
            } else {
                this.complete();
            }
            if (this.value) {
                // console.log('request');
                this.animateId = window.requestAnimationFrame(this.animate);
            }
        }
    }]);

    return DomRendable;
}();

export default DomRendable;