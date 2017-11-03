var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { setTransformStyle } from './util';
var CLASSNAME_PREFIX = 'tumbling-wrapper';

var FLIP_CONSTANT = 180;

var FlipRender = function () {
    function FlipRender(context, options) {
        _classCallCheck(this, FlipRender);

        var _this = this;
        _this.context = context;
        var rotateDirection = options.rotateDirection || FlipRender.VERTICAL;
        if (rotateDirection === FlipRender.VERTICAL) {
            _this.rotateName = 'rotateY';
        } else {
            _this.rotateName = 'rotateX';
        }
        _this.renderItem = options.renderItem;
        _this.wrapper = null;
        _this.scroller = null;
        _this.firstLi = null;
        _this.secondLi = null;
    }

    _createClass(FlipRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            var showCurValue = _this.context.showCurValue;

            _this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX + ' tumblingFlip-wrapper';
            wrapper.innerHTML = '<span class="tumbling-hidden-span">' + (_this.renderItem ? _this.renderItem(9) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this.renderItem ? _this.renderItem(showCurValue) : showCurValue) + '</li>\n<li></li>\n</ul>';
            _this.scroller = wrapper.children[wrapper.children.length - 1];
            _this.firstLi = _this.scroller.children[0];
            _this.secondLi = _this.scroller.children[1];
        }
    }, {
        key: 'getRotateStyle',
        value: function getRotateStyle(deg) {
            return this.rotateName + '(' + deg + 'deg)';
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            var _this = this;
            if (diffDistance === 0) return;
            var _context = this.context,
                showNextValue = _context.showNextValue,
                showCurValue = _context.showCurValue,
                showPrevValue = _context.showPrevValue;

            if (diffDistance > 0) {
                FlipRender.renderText(_this.firstLi, showNextValue, _this.getRotateStyle(-FLIP_CONSTANT * (1 - changeY)));
                FlipRender.renderText(_this.secondLi, showCurValue, _this.getRotateStyle(FLIP_CONSTANT * changeY));
            } else {
                FlipRender.renderText(_this.firstLi, showCurValue, _this.getRotateStyle(-FLIP_CONSTANT * changeY));
                FlipRender.renderText(_this.secondLi, showPrevValue, _this.getRotateStyle(FLIP_CONSTANT * (1 + changeY)));
            }
        }
    }], [{
        key: 'renderText',
        value: function renderText(el, content, style) {
            var html = '';
            if (content != null && content >= 0) {
                html = content + '';
            }
            if (this.renderItem) {
                html = this.renderItem(html);
            }
            setTransformStyle(el, style);
            el.innerHTML = html;
        }
    }]);

    return FlipRender;
}();

FlipRender.HORIZONTAL = 1;
FlipRender.VERTICAL = 2;


export default FlipRender;