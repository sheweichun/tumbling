(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tumbling = {})));
}(this, (function (exports) { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var util = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toThousands = toThousands;
exports.setTransformStyle = setTransformStyle;
exports.setTransformByStyle = setTransformByStyle;
function toThousands(num) {
  if (num == null) return '- -';
  var numStr = (num || 0).toString();
  var dotIndex = numStr.indexOf('.');
  if (dotIndex >= 0) {
    var integerStr = numStr.substring(0, dotIndex);
    var floatStr = numStr.substring(dotIndex + 1);
    if (keepFloat) {
      return integerStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + floatStr;
    } else {
      return integerStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
  return numStr.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function setTransformStyle(el, style) {
  el.style.transform = style;
  el.style.webkitTransform = style;
  el.style.mozTransform = style;
  el.style.msTransform = style;
  el.style.oTransform = style;
}

function setTransformByStyle(el, style) {
  return 'transform:' + style + ';webkit-transform:' + style + ';moz-transform:' + style + ';ms-transform:' + style + ';o-transform:' + style;
}

var NUMBER_REG = exports.NUMBER_REG = new RegExp("[0-9]");
});

unwrapExports(util);

var flipRender = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



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
            (0, util.setTransformStyle)(el, style);
            el.innerHTML = html;
        }
    }]);

    return FlipRender;
}();

FlipRender.HORIZONTAL = 1;
FlipRender.VERTICAL = 2;
exports.default = FlipRender;
});

unwrapExports(flipRender);

var tumblingRender = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



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
            (0, util.setTransformStyle)(this.scroller, 'translateY(' + changeY * 100 + '%)');
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
});

unwrapExports(tumblingRender);

var domRendable = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _tumblingRender2 = _interopRequireDefault(tumblingRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var merge = Object.assign;
var DEFAULT_OPTIONS = {
    // transitionTime:300
};

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
        this.effect = effect || _tumblingRender2.default;
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

exports.default = DomRendable;
});

unwrapExports(domRendable);

var tween = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var Tween = {
  linear: function linear(t, b, c, d) {
    return (c - b) * (t / d) + b;
  },
  easeInQuad: function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function easeOutExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function easeInElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  },
  easeInBack: function easeInBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function easeOutBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function easeInOutBack(t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function easeInBounce(t, b, c, d) {
    return c - Tween.easeOutBounce(d - t, 0, c, d) + b;
  },
  easeOutBounce: function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
    }
  },
  easeInOutBounce: function easeInOutBounce(t, b, c, d) {
    if (t < d / 2) return Tween.easeInBounce(t * 2, 0, c, d) * .5 + b;
    return Tween.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
};

exports.default = Tween;
});

unwrapExports(tween);

var domItem = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BaseItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _tween2 = _interopRequireDefault(tween);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var BaseItem = exports.BaseItem = function () {
    function BaseItem(context, value, options) {
        _classCallCheck(this, BaseItem);

        var effect = context.effect,
            appearAnimation = context.appearAnimation,
            disappearAnimation = context.disappearAnimation,
            animationFlag = context.animationFlag,
            dom = context.dom,
            renderItem = context.renderItem,
            tween$$1 = context.tween;

        this.context = context;
        this.value = value;
        this.index = options.index;
        this.rawMode = options.rawMode || false;
        this.rawDirection = options.rawDirection || 1;
        this.visible = false;
        this.wrapper = null;
        this.effectController = new effect(this, options);
        this.moveRatio = 1;
        this.animationFlag = animationFlag || true;
        this.parentDom = dom;
        this.renderItem = renderItem;
        this.tween = BaseItem.parseTween(tween$$1);
        this.newBornFlag = options.newBornFlag || false;
        this.appearAnimation = appearAnimation;
        this.disappearAnimation = disappearAnimation;
        this.disappearFlag = false;
    }

    _createClass(BaseItem, [{
        key: 'getWrapperWidth',
        value: function getWrapperWidth() {
            if (!this.wrapperWidth) {
                this.wrapperWidth = this.wrapper.offsetWidth;
                return this.wrapperWidth;
            }
            return this.wrapperWidth;
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this.disappearFlag = true;
        }
    }, {
        key: 'animateRender',
        value: function animateRender() {
            if (!this.visible) {
                this.wrapper.className += ' ' + CLASSNAME_PREFIX + '-visible';
                this.visible = true;
                this.getWrapperWidth();
            }
            if (this.disappearFlag) {
                if (this.disappearAnimation) {
                    this.disappearAnimation(this.wrapper, this.moveRatio);
                } else if (this.animationFlag) {
                    this.wrapper.style.width = this.wrapperWidth * this.moveRatio + 'px';
                    this.wrapper.style.opacity = this.moveRatio;
                }
            } else if (this.newBornFlag) {
                var newRatio = 1 - this.moveRatio;
                if (this.appearAnimation) {
                    this.appearAnimation(this.wrapper, newRatio);
                } else if (this.animationFlag) {
                    this.wrapper.style.width = this.wrapperWidth * newRatio + 'px';
                    this.wrapper.style.opacity = newRatio;
                }
            }
        }
    }], [{
        key: 'parseTween',
        value: function parseTween(tween$$1) {
            if (!tween$$1) {
                return _tween2.default.linear;
            }
            if (typeof tween$$1 === 'function') {
                return tween$$1;
            }
            return _tween2.default[tween$$1];
        }
    }]);

    return BaseItem;
}();

var NumberItem = function (_BaseItem) {
    _inherits(NumberItem, _BaseItem);

    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        var _this = _possibleConstructorReturn(this, (NumberItem.__proto__ || Object.getPrototypeOf(NumberItem)).call(this, context, value, options));

        _this.value = 0;
        _this.isNumber = true;
        _this.baseRange = options.baseRange;
        _this.diffDistance = 0;
        _this.maxValue = options.maxValue || 10;
        _this.moveY = 0;
        _this.showCurValue = 0;
        _this.update(value);
        return _this;
    }

    _createClass(NumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var wrapper = document.createElement('div');
            this.effectController.mount(wrapper);
            this.wrapper = wrapper;
            this.visible = false;
            dom.appendChild(wrapper);
            return this;
        }
    }, {
        key: 'update',
        value: function update() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            if (this.rawMode) {
                this.showPrevValue = this.showNextValue = value;
                if (value === this.value) {
                    this.diffDistance = 0;
                    return;
                }
                this.diffDistance = this.rawDirection;
                this.value = value;
            } else {
                var dividedValue = NumberItem.floor(value / this.baseRange);
                var diff = dividedValue - this.value;
                this.diffDistance = diff;
                this.value = dividedValue;
                this.showPrevValue = this.add(this.showCurValue, -1);
                this.showNextValue = this.add(this.showCurValue, 1);
                this.originCurValue = this.showCurValue;
            }
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
        key: 'updateRawValue',
        value: function updateRawValue(changeY) {
            if (changeY === 1 || changeY === -1) {
                this.showCurValue = this.showPrevValue;
                this.showPrevValue = this.showNextValue = this.showCurValue;
            }
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
            //easeOutElastic linear
            if (tm === transitionTime) {
                distance = this.diffDistance;
            } else {
                distance = this.tween(tm, 0, this.diffDistance, transitionTime);
            }
            // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
            this.moveRatio = (transitionTime - tm) / transitionTime;
            this.moveY = distance;
            if (this.rawMode) {
                this.updateRawValue(distance);
            } else {
                this.updateValue(distance);
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.parentDom && this.wrapper) {
                this.parentDom.removeChild(this.wrapper);
                this.wrapper = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var diffDistance = this.diffDistance;

            if (diffDistance === 0) return;
            var changeY = this.moveY % 1;
            this.animateRender();
            this.effectController.render(diffDistance, changeY);
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
            var wrapper = document.createElement('div');
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = this.value;
            this.wrapper = wrapper;
            dom.appendChild(wrapper);
            return this;
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.parentDom && this.wrapper) {
                this.parentDom.removeChild(this.wrapper);
                this.wrapper = null;
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var transitionTime = this.context.transitionTime;

            this.moveRatio = (transitionTime - tm) / transitionTime;
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

exports.default = function (context, value, options, flag) {
    if (flag) {
        return new NumberItem(context, value, options);
    }
    return new NoNumberItem(context, value, options);
};
});

unwrapExports(domItem);

var domNumberScroller = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var DomNumber = function (_DomRendable) {
    _inherits(DomNumber, _DomRendable);

    function DomNumber(selector, options) {
        _classCallCheck(this, DomNumber);

        var _this = _possibleConstructorReturn(this, (DomNumber.__proto__ || Object.getPrototypeOf(DomNumber)).call(this, selector, options));

        var thousand = options.thousand;

        _this.thousand = thousand;
        _this.options = options;
        _this.generateNumberItems(_this.value);
        return _this;
    }

    _createClass(DomNumber, [{
        key: 'generateDomItem',
        value: function generateDomItem(isNumber, val, index, maxValue, baseRange, newBornFlag) {
            return (0, _domItem2.default)(this, val, merge({}, this.options, {
                index: index,
                newBornFlag: newBornFlag,
                baseRange: baseRange,
                maxValue: maxValue
            }), isNumber);
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var _this2 = this;

            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _DomNumber$parseValue = DomNumber.parseValue(val, this.thousand),
                valueStr = _DomNumber$parseValue.valueStr,
                transformValueStr = _DomNumber$parseValue.transformValueStr;

            var valStrLenMinus1 = valueStr.length - 1;
            var fragment = document.createDocumentFragment();
            this.strItems = {};
            var transformIndex = 0,
                domItems = [];
            valueStr.forEach(function (value, index) {
                var maxValue = 10;
                var baseRange = Math.pow(maxValue, valStrLenMinus1 - index);
                var transformCurVal = transformValueStr[transformIndex];
                var isNumber = util.NUMBER_REG.test(transformCurVal);
                if (!isNumber) {
                    var domItem$$1 = _this2.generateDomItem(false, transformCurVal, index, maxValue, baseRange).mount(fragment);
                    _this2.strItems[valStrLenMinus1 - transformIndex] = domItem$$1;
                    // domItems.push(domItem);
                    transformIndex++;
                }
                transformIndex++;
                domItems.push(_this2.generateDomItem(true, val, index, maxValue, baseRange).mount(fragment));
            });
            this.items = domItems;
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            this.complete();
            if (value !== this.value) {
                var _DomNumber$parseValue2 = DomNumber.parseValue(value, this.thousand),
                    valueStr = _DomNumber$parseValue2.valueStr,
                    transformValueStr = _DomNumber$parseValue2.transformValueStr;

                var itemsLen = this.items.length;
                var valStrLen = valueStr.length;

                var diffLen = valStrLen - itemsLen;
                var newItems = void 0;
                if (diffLen > 0) {
                    newItems = [];
                    var fragment = document.createDocumentFragment();
                    var valStrLenMinus1 = valStrLen - 1;
                    var transformIndex = 0,
                        strIndex = void 0;
                    for (var i = 0; i < valStrLen; i++) {
                        var maxValue = 10;
                        var baseRange = Math.pow(maxValue, valStrLenMinus1 - i);
                        var transformCurVal = transformValueStr[transformIndex];
                        var isNumber = util.NUMBER_REG.test(transformCurVal);
                        strIndex = valStrLenMinus1 - transformIndex;
                        if (!isNumber) {
                            if (!this.strItems[strIndex]) {
                                var domItem$$1 = this.generateDomItem(false, transformCurVal, i, maxValue, baseRange, true).mount(fragment);
                                this.strItems[strIndex] = domItem$$1;
                            }
                            transformIndex++;
                        }
                        if (i < diffLen) {
                            // console.log('push i');
                            newItems.push(this.generateDomItem(true, value, i, maxValue, baseRange, true).mount(fragment));
                        }

                        transformIndex++;
                    }
                    // console.log('newItems :',newItems.length);
                    this.dom.insertBefore(fragment, this.dom.children[0]);
                } else if (diffLen < 0) {
                    for (var _i = 0; _i < -diffLen; _i++) {
                        this.items[_i].disappear();
                    }
                    for (var index in this.strItems) {
                        var tmpItem = this.strItems[index];
                        if (util.NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length) {
                            tmpItem.disappear();
                        }
                    }
                }
                this.items.forEach(function (item) {
                    item.update(value);
                });
                if (newItems) {
                    this.items = newItems.concat(this.items);
                }
                this.animateId = window.requestAnimationFrame(this.animate);
                this.value = value;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.items = this.items.filter(function (item) {
                if (item.disappearFlag) {
                    item.remove();
                }
                return !item.disappearFlag;
            });
            for (var index in this.strItems) {
                var curItem = this.strItems[index];
                if (curItem.disappearFlag) {
                    curItem.remove();
                    delete this.strItems[index];
                }
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this.items.forEach(function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item.render();
            });
            for (var index in this.strItems) {
                var curItem = this.strItems[index];
                curItem.move(tm, flag);
                curItem.render();
            }
            // ctx.fillText('370911',0,0);
        }
    }], [{
        key: 'parseValue',
        value: function parseValue(val, thousandFlag) {
            var integerVal = parseInt(val);
            var valueStr = ('' + integerVal).split(''),
                transformValueStr = valueStr;
            if (thousandFlag) {
                transformValueStr = (0, util.toThousands)(integerVal).split('');
            }
            return {
                valueStr: valueStr,
                transformValueStr: transformValueStr
            };
        }
    }]);

    return DomNumber;
}(_domRendable2.default);

exports.default = DomNumber;
});

unwrapExports(domNumberScroller);

var domRawScroller = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var DomRawScroller = function (_DomRendable) {
    _inherits(DomRawScroller, _DomRendable);

    function DomRawScroller(selector, options) {
        _classCallCheck(this, DomRawScroller);

        var _this = _possibleConstructorReturn(this, (DomRawScroller.__proto__ || Object.getPrototypeOf(DomRawScroller)).call(this, selector, options));

        _this.value = DomRawScroller.transformValue(_this.value);
        _this.stopImmediate = options.stopImmediate || false;
        _this.maxRandomStep = options.maxRandomStep || 100;
        _this.debounceRatio = options.debounceRatio || 0.3;
        _this.stopFlag = false;
        _this.onStop = options.onStop;
        _this.options = options;
        _this.generateRawItems(_this.value);
        return _this;
    }

    _createClass(DomRawScroller, [{
        key: 'generateRawItems',
        value: function generateRawItems(value) {
            var _this2 = this;

            var fragment = document.createDocumentFragment();
            this.items = value.map(function (itemValue, index) {
                itemValue.step = itemValue.step || Math.floor(Math.random() * _this2.maxRandomStep);
                return (0, _domItem2.default)(_this2, itemValue.step, merge({}, _this2.options, {
                    index: index,
                    baseRange: 1,
                    maxValue: itemValue.maxValue || 10
                }), true).mount(fragment);
            });
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'animateStop',
        value: function animateStop(timestamp) {
            var _this3 = this;

            if (this.stopFlag) {
                this.onStop && this.onStop(this.items.map(function (item) {
                    // console.log(item.showCurValue);
                    return item.value % item.maxValue;
                }, this));
                return;
            }
            if (timestamp) {
                this.value.forEach(function (itemValue, index) {
                    var curItem = _this3.items[index];
                    curItem.update(curItem.value + itemValue.step);
                    curItem.value = curItem.value % curItem.maxValue;
                });
                this.animateTimeStamp = timestamp;
                this.animateId = window.requestAnimationFrame(this.animate);
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this.items.forEach(function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item.render();
            });
        }
    }, {
        key: 'beforeStart',
        value: function beforeStart() {
            this.stopFlag = false;
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this4 = this;

            this.stopFlag = true;
            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.render(this.transitionTime, true);
                if (this.stopImmediate) {
                    this.animateStop();
                    return;
                }
                this.value.forEach(function (itemValue, index) {
                    var curItem = _this4.items[index];
                    curItem.update(curItem.value + Math.floor(itemValue.step * _this4.debounceRatio));
                });
                this.animateId = window.requestAnimationFrame(this.animate);
            }
        }
    }], [{
        key: 'transformValue',
        value: function transformValue(value) {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
                var newValue = [];
                for (var i = 0; i < value; i++) {
                    newValue.push({});
                }
                return newValue;
            }
            return value;
        }
    }]);

    return DomRawScroller;
}(_domRendable2.default);

exports.default = DomRawScroller;
});

unwrapExports(domRawScroller);

var countdown = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = Object.assign;

var Countdown = function (_DomRendable) {
    _inherits(Countdown, _DomRendable);

    function Countdown(selector, options) {
        _classCallCheck(this, Countdown);

        var _this = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, selector, options));

        _this.options = options;
        _this.direction = options.direction || Countdown.ADD;
        _this.init(_this.value);
        return _this;
    }

    _createClass(Countdown, [{
        key: 'init',
        value: function init(value) {
            var _this2 = this;

            var valStrArr = (value + '').split('');
            var fragment = document.createDocumentFragment();
            this.items = valStrArr.map(function (val, index) {
                var isNumber = util.NUMBER_REG.test(val);
                var itemValue = isNumber ? parseInt(val) : val;
                var item = (0, _domItem2.default)(_this2, itemValue, merge({}, _this2.options, {
                    index: index,
                    rawDirection: _this2.direction === Countdown.ADD ? 1 : -1,
                    rawMode: true
                }), isNumber);
                return item.mount(fragment);
            });
            this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            var _this3 = this;

            if (this.animateId) {
                window.cancelAnimationFrame(this.animateId);
                this.animateId = null;
                this.render(this.transitionTime, true);
            }
            if (value !== this.value) {
                var valStrArr = (value + '').split('');
                valStrArr.forEach(function (val, index) {
                    var curItem = _this3.items[index];
                    if (curItem.isNumber) {
                        var updateVal = parseInt(val);
                        curItem.update(updateVal);
                    }
                });
                this.animateId = window.requestAnimationFrame(this.animate);
                this.value = value;
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this.items.forEach(function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item.render();
            });
        }
    }]);

    return Countdown;
}(_domRendable2.default);

Countdown.ADD = 0;
Countdown.MINUS = 1;
exports.default = Countdown;
});

unwrapExports(countdown);

'use strict';

if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(function () {
      callback(Date.now());
    }, 6000 / 60);
  };
}();

var lib = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Countdown = exports.DomRawScroller = exports.DomNumberScroller = exports.FlipRender = undefined;



Object.defineProperty(exports, 'FlipRender', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(flipRender).default;
  }
});



Object.defineProperty(exports, 'DomNumberScroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domNumberScroller).default;
  }
});



Object.defineProperty(exports, 'DomRawScroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domRawScroller).default;
  }
});



Object.defineProperty(exports, 'Countdown', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(countdown).default;
  }
});



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

var index = unwrapExports(lib);
var lib_1 = lib.Countdown;
var lib_2 = lib.DomRawScroller;
var lib_3 = lib.DomNumberScroller;
var lib_4 = lib.FlipRender;

exports['default'] = index;
exports.Countdown = lib_1;
exports.DomRawScroller = lib_2;
exports.DomNumberScroller = lib_3;
exports.FlipRender = lib_4;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tumbling.js.map
