var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Tween from './tween';
var merge = Object.assign;
var DEFAULT_OPTIONS = {
    // transitionTime:300
};
import TumblingRender from './tumblingRender';

var DomRendable = function () {
    function DomRendable(selector, options) {
        _classCallCheck(this, DomRendable);

        var mergeOptions = merge({}, DEFAULT_OPTIONS, options);
        var _this = this;
        _this.dom = DomRendable.parseDom(selector);
        var renderItem = mergeOptions.renderItem,
            animationRender = mergeOptions.animationRender,
            appearAnimation = mergeOptions.appearAnimation,
            disappearAnimation = mergeOptions.disappearAnimation,
            animationFlag = mergeOptions.animationFlag,
            tween = mergeOptions.tween,
            effect = mergeOptions.effect;

        _this.animateTimeStamp = null;
        _this.animateId = null;
        _this.effect = effect || TumblingRender;
        _this.value = options.value;
        _this.startedFlag = false;
        _this.transitionTime = options.transitionTime || 300;
        _this.renderItem = renderItem;
        _this.tween = DomRendable.parseTween(tween);
        _this.appearAnimation = appearAnimation;
        _this.animationRender = animationRender;
        _this.disappearAnimation = disappearAnimation;
        _this.animationFlag = animationFlag;
        _this.animate = _this.animate.bind(_this);
    }

    _createClass(DomRendable, [{
        key: 'changeTween',
        value: function changeTween(tween) {
            this.tween = DomRendable.parseTween(tween);
        }
    }, {
        key: 'clear',
        value: function clear() {}
    }, {
        key: 'animate',
        value: function animate(tm) {
            var _this = this;
            if (_this.animateTimeStamp == null) {
                _this.animateTimeStamp = tm;
                window.requestAnimationFrame(_this.animate);
                return;
            }
            var diff = tm - _this.animateTimeStamp;
            var stopFlag = false;
            if (diff >= _this.transitionTime) {
                stopFlag = true;
                diff = _this.transitionTime;
                _this.animateTimeStamp = null;
                _this.clear();
            }
            /**
             * 
             */
            _this.render(diff, stopFlag);

            if (stopFlag) {
                _this.animateStop && _this.animateStop(tm);
                _this.animateId = null;
                return;
            }
            _this.animateId = window.requestAnimationFrame(_this.animate);
        }
    }, {
        key: 'complete',
        value: function complete() {
            var _this = this;
            if (_this.animateId) {
                window.cancelAnimationFrame(_this.animateId);
                _this.animateId = null;
                _this.clear();
                _this.render(_this.transitionTime, true);
            }
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'start',
        value: function start() {
            var _this = this;
            if (_this.animateId) {
                return;
            }
            _this.beforeStart && _this.beforeStart();
            // if(!_this.startedFlag){
            //     _this.startedFlag = true
            // }else{
            //     _this.complete();
            //     _this.afterStartComplete && _this.afterStartComplete();
            // }
            if (_this.value) {
                // console.log('request');
                _this.animateId = window.requestAnimationFrame(_this.animate);
            }
        }
    }], [{
        key: 'parseDom',
        value: function parseDom(selector) {
            if (typeof selector === 'string') {
                return document.querySelector(selector);
            }
            return selector;
        }
    }, {
        key: 'parseTween',
        value: function parseTween(tween) {
            if (!tween) {
                return Tween.linear;
            }
            if (typeof tween === 'function') {
                return tween;
            }
            return Tween[tween];
        }
    }]);

    return DomRendable;
}();

export default DomRendable;