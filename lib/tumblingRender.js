'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var TumblingRender = function () {
    function TumblingRender(context, options) {
        _classCallCheck(this, TumblingRender);

        var _this = this;
        _this.context = context;
        _this.renderItem = options.renderItem;
        _this.wrapper = null;
        _this.scroller = null;
        _this.firstLi = null;
        _this.secondLi = null;
    }

    _createClass(TumblingRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            _this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = '<span class="tumbling-hidden-span">' + (_this.renderItem ? _this.renderItem(9) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this.renderItem ? _this.renderItem(_this.showCurValue) : _this.showCurValue) + '</li>\n<li></li>\n</ul>';
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
                TumblingRender.renderText(_this.firstLi, showNextValue);
                TumblingRender.renderText(_this.secondLi, showCurValue);
            } else if (diffDistance === 0) {
                TumblingRender.renderText(_this.firstLi, showCurValue);
            } else {
                TumblingRender.renderText(_this.firstLi, showCurValue);
                TumblingRender.renderText(_this.secondLi, showPrevValue);
            }
            (0, _util.setTransformStyle)(_this.scroller, 'translateY(' + changeY * 100 + '%)');
        }
    }], [{
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
    }]);

    return TumblingRender;
}();

exports.default = TumblingRender;