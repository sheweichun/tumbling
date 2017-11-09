var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { setTransformStyle } from '../util/index';
var CLASSNAME_PREFIX = 'tumbling-wrapper';

var TumblingEffect = function () {
    function TumblingEffect(context, options) {
        _classCallCheck(this, TumblingEffect);

        var _this = this;
        _this.context = context;
        _this.renderItem = options.renderItem;
        _this.wrapper = null;
        _this.scroller = null;
        _this.firstLi = null;
        _this.secondLi = null;
    }

    _createClass(TumblingEffect, [{
        key: 'renderText',
        value: function renderText(el, content) {
            var html = '';
            if (content != null && content >= 0) {
                html = content + '';
            }
            if (this.renderItem) {
                html = this.renderItem(html);
            }
            el.innerHTML = html;
        }
    }, {
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            _this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = '<span class="tumbling-hidden-span">' + (_this.renderItem ? _this.renderItem(-1) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this.renderItem ? _this.renderItem(_this.showCurValue) : _this.showCurValue) + '</li>\n<li></li>\n</ul>';
            _this.scroller = wrapper.children[wrapper.children.length - 1];
            _this.firstLi = _this.scroller.children[0];
            _this.secondLi = _this.scroller.children[1];
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            var _this = this;
            var _this$context = _this.context,
                showNextValue = _this$context.showNextValue,
                showCurValue = _this$context.showCurValue,
                showPrevValue = _this$context.showPrevValue;

            if (diffDistance > 0) {
                changeY = changeY - 1;
                _this.renderText(_this.firstLi, showNextValue);
                _this.renderText(_this.secondLi, showCurValue);
            } else if (diffDistance === 0) {
                _this.renderText(_this.firstLi, showCurValue);
            } else {
                _this.renderText(_this.firstLi, showCurValue);
                _this.renderText(_this.secondLi, showPrevValue);
            }
            setTransformStyle(_this.scroller, 'translateY(' + changeY * 100 + '%)');
        }
    }]);

    return TumblingEffect;
}();

export default TumblingEffect;