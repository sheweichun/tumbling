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

        this.context = context;
        this.renderItem = options.renderItem;
        this.wrapper = null;
        this.scroller = null;
        this.firstLi = null;
        this.secondLi = null;
    }

    _createClass(TumblingRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = '\n            <span class="tumbling-hidden-span">' + (this.renderItem ? this.renderItem(9) : 9) + '</span>\n            <ul class="tumbling-scroller">\n                <li>' + (this.renderItem ? this.renderItem(this.showCurValue) : this.showCurValue) + '</li>\n                <li></li>\n            </ul>\n        ';
            this.scroller = wrapper.children[wrapper.children.length - 1];
            this.firstLi = this.scroller.children[0];
            this.secondLi = this.scroller.children[1];
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            var _context = this.context,
                showNextValue = _context.showNextValue,
                showCurValue = _context.showCurValue,
                showPrevValue = _context.showPrevValue;

            if (diffDistance > 0) {
                changeY = changeY - 1;
                TumblingRender.renderText(this.firstLi, showNextValue);
                TumblingRender.renderText(this.secondLi, showCurValue);
            } else if (diffDistance === 0) {
                TumblingRender.renderText(this.firstLi, showCurValue);
            } else {
                TumblingRender.renderText(this.firstLi, showCurValue);
                TumblingRender.renderText(this.secondLi, showPrevValue);
            }
            (0, _util.setTransformStyle)(this.scroller, 'translateY(' + changeY * 100 + '%)');
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