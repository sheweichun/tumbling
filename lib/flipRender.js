'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var FlipRender = function () {
    function FlipRender(context, options) {
        _classCallCheck(this, FlipRender);

        this.context = context;
        var rotateDirection = options.rotateDirection || FlipRender.VERTICAL;
        if (rotateDirection === FlipRender.VERTICAL) {
            this.rotateName = 'rotateY';
        } else {
            this.rotateName = 'rotateX';
        }
        this.renderItem = options.renderItem;
        this.wrapper = null;
        this.scroller = null;
        this.firstLi = null;
        this.secondLi = null;
    }

    _createClass(FlipRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            var showCurValue = this.context.showCurValue;

            this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX + ' tumblingFlip-wrapper';
            wrapper.innerHTML = '\n            <span class="tumbling-hidden-span">' + (this.renderItem ? this.renderItem(9) : 9) + '</span>\n            <ul class="tumbling-scroller">\n                <li>' + (this.renderItem ? this.renderItem(showCurValue) : showCurValue) + '</li>\n                <li></li>\n            </ul>\n        ';
            this.scroller = wrapper.children[wrapper.children.length - 1];
            this.firstLi = this.scroller.children[0];
            this.secondLi = this.scroller.children[1];
        }
    }, {
        key: 'getRotateStyle',
        value: function getRotateStyle(deg) {
            return this.rotateName + '(' + deg + 'deg)';
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            if (diffDistance === 0) return;
            var _context = this.context,
                showNextValue = _context.showNextValue,
                showCurValue = _context.showCurValue,
                showPrevValue = _context.showPrevValue;

            if (diffDistance > 0) {
                FlipRender.renderText(this.firstLi, showNextValue, this.getRotateStyle(-180 * (1 - changeY)));
                FlipRender.renderText(this.secondLi, showCurValue, this.getRotateStyle(180 * changeY));
            } else {
                FlipRender.renderText(this.firstLi, showCurValue, this.getRotateStyle(-180 * changeY));
                FlipRender.renderText(this.secondLi, showPrevValue, this.getRotateStyle(180 * (1 + changeY)));
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
            (0, _util.setTransformStyle)(el, style);
            el.innerHTML = html;
        }
    }]);

    return FlipRender;
}();

FlipRender.HORIZONTAL = 1;
FlipRender.VERTICAL = 2;
exports.default = FlipRender;