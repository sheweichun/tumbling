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

var flipEffect = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var FLIP_CONSTANT = 180;

var FlipEffect = function () {
    function FlipEffect(context, options) {
        _classCallCheck(this, FlipEffect);

        var _this = this;
        _this.context = context;
        var rotateDirection = options.rotateDirection || FlipEffect.VERTICAL;
        if (rotateDirection === FlipEffect.VERTICAL) {
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

    _createClass(FlipEffect, [{
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            var showCurValue = _this.context.showCurValue;

            _this.wrapper = wrapper;
            wrapper.className = CLASSNAME_PREFIX + ' tumblingFlip-wrapper';
            wrapper.innerHTML = '<span class="tumbling-hidden-span">' + (_this.renderItem ? _this.renderItem(-1) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this.renderItem ? _this.renderItem(showCurValue) : showCurValue) + '</li>\n<li></li>\n</ul>';
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
                FlipEffect.renderText(_this.firstLi, showNextValue, _this.getRotateStyle(-FLIP_CONSTANT * (1 - changeY)));
                FlipEffect.renderText(_this.secondLi, showCurValue, _this.getRotateStyle(FLIP_CONSTANT * changeY));
            } else {
                FlipEffect.renderText(_this.firstLi, showCurValue, _this.getRotateStyle(-FLIP_CONSTANT * changeY));
                FlipEffect.renderText(_this.secondLi, showPrevValue, _this.getRotateStyle(FLIP_CONSTANT * (1 + changeY)));
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
            (_index.setTransformStyle)(el, style);
            el.innerHTML = html;
        }
    }]);

    return FlipEffect;
}();

FlipEffect.HORIZONTAL = 1;
FlipEffect.VERTICAL = 2;
exports.default = FlipEffect;
});

unwrapExports(flipEffect);

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

var tumblingEffect = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            (_index.setTransformStyle)(_this.scroller, 'translateY(' + changeY * 100 + '%)');
        }
    }]);

    return TumblingEffect;
}();

exports.default = TumblingEffect;
});

unwrapExports(tumblingEffect);

var domRendable = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



var _tween2 = _interopRequireDefault(tween);



var _tumblingEffect2 = _interopRequireDefault(tumblingEffect);

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
        var _this = this;
        var rootDom = DomRendable.parseDom(selector);
        _this.rootDom = rootDom;
        var dom = document.createElement('div');
        dom.className = 'tumbling-container';
        rootDom.appendChild(dom);
        _this.dom = dom;
        var renderItem = mergeOptions.renderItem,
            animationRender = mergeOptions.animationRender,
            autoStart = mergeOptions.autoStart,
            appearAnimation = mergeOptions.appearAnimation,
            disappearAnimation = mergeOptions.disappearAnimation,
            animationFlag = mergeOptions.animationFlag,
            tween$$1 = mergeOptions.tween,
            effect = mergeOptions.effect;

        _this.animateTimeStamp = null;
        _this.animateId = null;
        _this.effect = effect || _tumblingEffect2.default;
        _this.value = options.value;
        _this.startedFlag = false;
        _this.transitionTime = options.transitionTime || 300;
        _this.renderItem = renderItem;
        _this.tween = DomRendable.parseTween(tween$$1);
        _this.appearAnimation = appearAnimation;
        _this.animationRender = animationRender;
        _this.disappearAnimation = disappearAnimation;
        _this.animationFlag = animationFlag;
        _this.items = null;
        _this.strItems = null;
        _this.animate = _this.animate.bind(_this);
        if (autoStart) {
            this.start();
        }
    }

    _createClass(DomRendable, [{
        key: 'update',
        value: function update() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var transitionTime = options.transitionTime,
                tween$$1 = options.tween;

            if (transitionTime != null) {
                this.transitionTime = transitionTime;
            }
            if (tween$$1 != null) {
                this.tween = DomRendable.parseTween(tween$$1);
            }
        }
    }, {
        key: 'changeTween',
        value: function changeTween(tween$$1) {
            this.tween = DomRendable.parseTween(tween$$1);
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
        value: function render(tm, flag) {
            var _this = this;
            if (_this.items) {
                _this.items.forEach(function (item, index) {
                    if (tm) {
                        item.move(tm, flag);
                    }
                    item.render(flag);
                });
            }
            if (_this.strItems) {
                for (var index in _this.strItems) {
                    var curItem = _this.strItems[index];
                    curItem.move(tm, flag);
                    curItem.render(flag);
                }
            }
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            setTimeout(function () {
                var _this = _this2;
                if (_this.animateId) {
                    return;
                }
                _this.beforeStart && _this.beforeStart();
                if (_this.value) {
                    _this.animateId = window.requestAnimationFrame(_this.animate);
                }
            }, delay);
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

    return DomRendable;
}();

exports.default = DomRendable;
});

unwrapExports(domRendable);

var domItem = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            renderItem = context.renderItem;

        var _this = this;
        _this.context = context;
        _this.value = value;
        _this.index = options.index;
        _this.rawMode = options.rawMode || false;
        _this.rawDirection = options.rawDirection || 1;
        _this.visible = false;
        _this.wrapper = null;
        _this.hasRender = false;
        _this.effectController = new effect(_this, options);
        _this.moveRatio = 1;
        _this.animationFlag = animationFlag || true;
        _this.parentDom = dom;
        _this.renderItem = renderItem;
        _this.newBornFlag = options.newBornFlag || false;
        _this.appearAnimation = appearAnimation;
        _this.disappearAnimation = disappearAnimation;
        _this.disappearFlag = false;
    }

    _createClass(BaseItem, [{
        key: 'remove',
        value: function remove() {
            var _this = this;
            if (_this.parentDom && _this.wrapper) {
                _this.parentDom.removeChild(_this.wrapper);
                _this.wrapper = null;
            }
        }
    }, {
        key: 'getWrapperWidth',
        value: function getWrapperWidth() {
            var _this = this;
            if (!_this.wrapperWidth) {
                _this.wrapperWidth = _this.wrapper.offsetWidth;
                return _this.wrapperWidth;
            }
            return _this.wrapperWidth;
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this.disappearFlag = true;
        }
    }, {
        key: 'animateRender',
        value: function animateRender(stopFlag) {
            var _this = this;
            if (!_this.visible) {
                _this.wrapper.className += ' ' + CLASSNAME_PREFIX + '-visible';
                _this.visible = true;
                _this.getWrapperWidth();
            }
            if (_this.disappearFlag) {
                if (_this.disappearAnimation) {
                    _this.disappearAnimation(_this.wrapper, _this.moveRatio);
                } else if (this.animationFlag) {
                    _this.wrapper.style.width = _this.wrapperWidth * _this.moveRatio + 'px';
                    _this.wrapper.style.opacity = _this.moveRatio;
                }
            } else if (_this.newBornFlag) {
                var newRatio = 1 - _this.moveRatio;
                if (_this.appearAnimation) {
                    _this.appearAnimation(_this.wrapper, newRatio);
                } else if (this.animationFlag) {
                    _this.wrapper.style.width = _this.wrapperWidth * newRatio + 'px';
                    _this.wrapper.style.opacity = newRatio;
                }
            }
            if (stopFlag && _this.newBornFlag) {
                _this.newBornFlag = false;
            }
        }
    }]);

    return BaseItem;
}();

var NumberItem = function (_BaseItem) {
    _inherits(NumberItem, _BaseItem);

    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        var _this2 = _possibleConstructorReturn(this, (NumberItem.__proto__ || Object.getPrototypeOf(NumberItem)).call(this, context, value, options));

        var _this = _this2;
        _this.value = 0;
        _this.isNumber = true;
        _this.baseRange = options.baseRange;
        _this.diffDistance = 0;
        _this.maxValue = options.maxValue || 10;
        _this.moveY = 0;
        _this.showCurValue = 0;
        _this.update(value);
        return _this2;
    }

    _createClass(NumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var _this = this;
            var wrapper = document.createElement('div');
            _this.effectController.mount(wrapper);
            _this.wrapper = wrapper;
            _this.visible = false;
            dom.appendChild(wrapper);
            return _this;
        }
    }, {
        key: 'update',
        value: function update() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var _this = this;
            if (_this.rawMode) {
                _this.showPrevValue = _this.showNextValue = value;
                if (value === _this.value) {
                    _this.diffDistance = 0;
                    return;
                }
                _this.diffDistance = _this.rawDirection;
                _this.value = value;
            } else {
                var dividedValue = NumberItem.floor(value / _this.baseRange);
                var diff = dividedValue - _this.value;
                _this.diffDistance = diff;
                _this.value = dividedValue;
                _this.showPrevValue = _this.add(_this.showCurValue, -1);
                _this.showNextValue = _this.add(_this.showCurValue, 1);
                _this.originCurValue = _this.showCurValue;
            }
        }
    }, {
        key: 'processNumber',
        value: function processNumber(value, diff) {
            var _this = this;
            var ret = NumberItem.floor((value + diff) % _this.maxValue);
            if (ret < 0) {
                return _this.maxValue + ret;
            }
            return ret;
        }
    }, {
        key: 'add',
        value: function add(value, diff) {
            var _this = this;
            var fValue = value + diff;
            if (fValue >= _this.maxValue) {
                return 0;
            } else if (fValue < 0) {
                return _this.maxValue - 1;
            }
            return fValue;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(changeY) {
            var _this = this;
            var integerDistance = NumberItem.floor(changeY);
            _this.showCurValue = _this.processNumber(_this.originCurValue, integerDistance);
            _this.showPrevValue = _this.add(_this.showCurValue, -1);
            _this.showNextValue = _this.add(_this.showCurValue, 1);
        }
    }, {
        key: 'updateRawValue',
        value: function updateRawValue(changeY) {
            var _this = this;
            if (changeY === 1 || changeY === -1) {
                _this.showCurValue = _this.showPrevValue;
                _this.showPrevValue = _this.showNextValue = _this.showCurValue;
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var distance = void 0;
            var transitionTime = _this.context.transitionTime;

            if (_this.diffDistance === 0) {
                return;
            }
            //easeOutElastic linear
            if (tm === transitionTime) {
                distance = _this.diffDistance;
            } else {
                distance = _this.context.tween(tm, 0, _this.diffDistance, transitionTime);
            }
            // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;

            _this.moveRatio = (transitionTime - tm) / transitionTime;
            _this.moveY = distance;
            if (_this.rawMode) {
                _this.updateRawValue(distance);
            } else {
                _this.updateValue(distance);
            }
        }
        // remove(){
        //     const _this = this;
        //     if(_this.parentDom && _this.wrapper){
        //         _this.parentDom.removeChild(_this.wrapper);
        //         _this.wrapper = null;
        //     }
        // }

    }, {
        key: 'render',
        value: function render(flag) {
            var _this = this;
            var diffDistance = _this.diffDistance;

            if (diffDistance === 0 && _this.hasRender) return;
            _this.hasRender = true;
            var changeY = _this.moveY % 1;
            _this.animateRender(flag);
            _this.effectController.render(diffDistance, changeY);
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
            var _this = this;
            var wrapper = document.createElement('div');
            wrapper.className = CLASSNAME_PREFIX;
            wrapper.innerHTML = _this.value;
            _this.wrapper = wrapper;
            dom.appendChild(wrapper);
            return _this;
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var transitionTime = _this.context.transitionTime;

            _this.moveRatio = (transitionTime - tm) / transitionTime;
            if (stopFlag && _this.newBornFlag) {
                _this.newBornFlag = false;
            }
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render(flag) {
            this.animateRender(flag);
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

var domNumberTumbling = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



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

        var _this2 = _possibleConstructorReturn(this, (DomNumber.__proto__ || Object.getPrototypeOf(DomNumber)).call(this, selector, options));

        var thousand = options.thousand;

        var _this = _this2;
        _this.thousand = thousand;
        _this.options = options;
        _this.generateNumberItems(_this.value);
        return _this2;
    }

    _createClass(DomNumber, [{
        key: 'generateDomItem',
        value: function generateDomItem(isNumber, val, index, maxValue, baseRange, newBornFlag) {
            var _this = this;
            return (_domItem2.default)(_this, val, merge({}, _this.options, {
                index: index,
                newBornFlag: newBornFlag,
                baseRange: baseRange,
                maxValue: maxValue
            }), isNumber);
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _this = this;

            var _DomNumber$parseValue = DomNumber.parseValue(val, _this.thousand),
                valueStr = _DomNumber$parseValue.valueStr,
                transformValueStr = _DomNumber$parseValue.transformValueStr;

            var valStrLenMinus1 = valueStr.length - 1;
            var fragment = document.createDocumentFragment();
            _this.strItems = {};
            var transformIndex = 0,
                domItems = [];
            valueStr.forEach(function (value, index) {
                var maxValue = 10;
                var baseRange = Math.pow(maxValue, valStrLenMinus1 - index);
                var transformCurVal = transformValueStr[transformIndex];
                var isNumber = util.NUMBER_REG.test(transformCurVal);
                if (!isNumber) {
                    var domItem$$1 = _this.generateDomItem(false, transformCurVal, index, maxValue, baseRange).mount(fragment);
                    _this.strItems[valStrLenMinus1 - transformIndex] = domItem$$1;
                    // domItems.push(domItem);
                    transformIndex++;
                }
                transformIndex++;
                domItems.push(_this.generateDomItem(true, val, index, maxValue, baseRange).mount(fragment));
            });
            _this.items = domItems;
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value, options) {
            _get(DomNumber.prototype.__proto__ || Object.getPrototypeOf(DomNumber.prototype), 'update', this).call(this, options);
            var _this = this;
            _this.complete();
            if (value !== _this.value) {
                var _DomNumber$parseValue2 = DomNumber.parseValue(value, _this.thousand),
                    valueStr = _DomNumber$parseValue2.valueStr,
                    transformValueStr = _DomNumber$parseValue2.transformValueStr;

                var itemsLen = _this.items.length;
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
                            if (!_this.strItems[strIndex]) {
                                var domItem$$1 = _this.generateDomItem(false, transformCurVal, i, maxValue, baseRange, true).mount(fragment);
                                _this.strItems[strIndex] = domItem$$1;
                            }
                            transformIndex++;
                        }
                        if (i < diffLen) {
                            newItems.push(_this.generateDomItem(true, value, i, maxValue, baseRange, true).mount(fragment));
                        }

                        transformIndex++;
                    }
                    _this.dom.insertBefore(fragment, _this.dom.children[0]);
                } else if (diffLen < 0) {
                    for (var _i = 0; _i < -diffLen; _i++) {
                        _this.items[_i].disappear();
                    }
                    for (var index in _this.strItems) {
                        var tmpItem = _this.strItems[index];
                        if (util.NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length) {
                            tmpItem.disappear();
                        }
                    }
                }
                _this.items.forEach(function (item) {
                    item.update(value);
                });
                if (newItems) {
                    _this.items = newItems.concat(_this.items);
                }
                _this.animateId = window.requestAnimationFrame(_this.animate);
                _this.value = value;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this = this;
            _this.items = _this.items.filter(function (item) {
                if (item.disappearFlag) {
                    item.remove();
                }
                return !item.disappearFlag;
            });
            for (var index in _this.strItems) {
                var curItem = _this.strItems[index];
                if (curItem.disappearFlag) {
                    curItem.remove();
                    delete _this.strItems[index];
                }
            }
        }
    }], [{
        key: 'parseValue',
        value: function parseValue(val, thousandFlag) {
            var integerVal = parseInt(val);
            var valueStr = ('' + integerVal).split(''),
                transformValueStr = valueStr;
            if (thousandFlag) {
                transformValueStr = (_util.toThousands)(integerVal).split('');
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

unwrapExports(domNumberTumbling);

var domRawTumbling = createCommonjsModule(function (module, exports) {
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

        var _this2 = _possibleConstructorReturn(this, (DomRawScroller.__proto__ || Object.getPrototypeOf(DomRawScroller)).call(this, selector, options));

        var _this = _this2;
        _this.value = DomRawScroller.transformValue(_this.value);
        _this.stopImmediate = options.stopImmediate || false;
        _this.maxRandomStep = options.maxRandomStep || 100;
        _this.debounceRatio = options.debounceRatio || 0.3;
        _this.stopFlag = false;
        _this.onStop = options.onStop;
        _this.options = options;
        _this.generateRawItems(_this.value);
        return _this2;
    }

    _createClass(DomRawScroller, [{
        key: 'generateRawItems',
        value: function generateRawItems(value) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            _this.items = value.map(function (itemValue, index) {
                itemValue.step = itemValue.step || Math.floor(Math.random() * _this.maxRandomStep);
                return (_domItem2.default)(_this, itemValue.step, merge({}, _this.options, {
                    index: index,
                    baseRange: 1,
                    maxValue: itemValue.maxValue || 10
                }), true).mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'updateItems',
        value: function updateItems(getNewValue) {
            getNewValue = getNewValue || DomRawScroller.addValue;
            var _this = this;
            _this.value.forEach(function (itemValue, index) {
                var curItem = _this.items[index];
                curItem.update(getNewValue(curItem, itemValue));
                curItem.value = curItem.value % curItem.maxValue;
            });
        }
    }, {
        key: 'animateStop',
        value: function animateStop(timestamp) {
            var _this = this;
            if (_this.stopFlag) {
                _this.onStop && _this.onStop(_this.items.map(function (item) {
                    // console.log(item.showCurValue);
                    return item.value % item.maxValue;
                }, _this));
                return;
            }
            if (timestamp) {
                _this.updateItems();
                _this.animateTimeStamp = timestamp;
                _this.animateId = window.requestAnimationFrame(_this.animate);
            }
        }
    }, {
        key: 'beforeStart',
        value: function beforeStart() {
            this.stopFlag = false;
            this.updateItems();
        }
    }, {
        key: 'afterStartComplete',
        value: function afterStartComplete() {
            this.updateItems();
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this = this;
            if (_this.stopFlag) return;
            _this.stopFlag = true;
            if (_this.animateId) {
                window.cancelAnimationFrame(_this.animateId);
                _this.animateId = null;
                _this.render(_this.transitionTime, true);
                if (_this.stopImmediate) {
                    _this.animateStop();
                    return;
                }
                _this.updateItems(function (curItem, itemValue) {
                    return curItem.value + Math.floor(itemValue.step * _this.debounceRatio);
                });
                _this.animateId = window.requestAnimationFrame(_this.animate);
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
    }, {
        key: 'addValue',
        value: function addValue(curItem, itemValue) {
            return curItem.value + itemValue.step;
        }
    }]);

    return DomRawScroller;
}(_domRendable2.default);

exports.default = DomRawScroller;
});

unwrapExports(domRawTumbling);

var domCountdownTumbling = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



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

        var _this2 = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, selector, options));

        var _this = _this2;
        _this.options = options;
        _this.direction = options.direction || Countdown.ADD;
        _this.init(_this2.value);
        return _this2;
    }

    _createClass(Countdown, [{
        key: 'init',
        value: function init(value) {
            var _this = this;
            var valStrArr = (value + '').split('');
            var fragment = document.createDocumentFragment();
            _this.items = valStrArr.map(function (val, index) {
                var isNumber = util.NUMBER_REG.test(val);
                var itemValue = isNumber ? parseInt(val) : val;
                var item = (_domItem2.default)(_this, itemValue, merge({}, _this.options, {
                    index: index,
                    rawDirection: _this.direction === Countdown.ADD ? 1 : -1,
                    rawMode: true
                }), isNumber);
                return item.mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value, options) {
            _get(Countdown.prototype.__proto__ || Object.getPrototypeOf(Countdown.prototype), 'update', this).call(this, options);
            var _this = this;
            if (_this.animateId) {
                window.cancelAnimationFrame(_this.animateId);
                _this.animateId = null;
                _this.render(_this.transitionTime, true);
            }
            if (value !== _this.value) {
                var valStrArr = (value + '').split('');
                valStrArr.forEach(function (val, index) {
                    var curItem = _this.items[index];
                    if (curItem.isNumber) {
                        var updateVal = parseInt(val);
                        curItem.update(updateVal);
                    }
                });
                _this.animateId = window.requestAnimationFrame(_this.animate);
                _this.value = value;
            }
        }
    }]);

    return Countdown;
}(_domRendable2.default);

Countdown.ADD = 0;
Countdown.MINUS = 1;
exports.default = Countdown;
});

unwrapExports(domCountdownTumbling);

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
exports.DomCountdownTumbling = exports.DomRawTumbling = exports.DomNumberTumbling = exports.FlipEffect = undefined;



Object.defineProperty(exports, 'FlipEffect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(flipEffect).default;
  }
});



Object.defineProperty(exports, 'DomNumberTumbling', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domNumberTumbling).default;
  }
});



Object.defineProperty(exports, 'DomRawTumbling', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domRawTumbling).default;
  }
});



Object.defineProperty(exports, 'DomCountdownTumbling', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domCountdownTumbling).default;
  }
});



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

var index = unwrapExports(lib);
var lib_1 = lib.DomCountdownTumbling;
var lib_2 = lib.DomRawTumbling;
var lib_3 = lib.DomNumberTumbling;
var lib_4 = lib.FlipEffect;

exports['default'] = index;
exports.DomCountdownTumbling = lib_1;
exports.DomRawTumbling = lib_2;
exports.DomNumberTumbling = lib_3;
exports.FlipEffect = lib_4;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tumbling.js.map
