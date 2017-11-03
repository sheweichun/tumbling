(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Tumbling = {})));
}(this, (function (exports) { 'use strict';

var $MANGLE498 = 'exports';





function unwrapExports(x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module[$MANGLE498]), module[$MANGLE498];
}

var util = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE537 = 'substring',
    $MANGLE538 = 'replace',
    $MANGLE540 = 'style';
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
    var integerStr = numStr[$MANGLE537](0, dotIndex);
    var floatStr = numStr[$MANGLE537](dotIndex + 1);
    if (keepFloat) {
      return integerStr[$MANGLE538](/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + floatStr;
    } else {
      return integerStr[$MANGLE538](/(\d)(?=(?:\d{3})+$)/g, '$1,');
    }
  }
  return numStr[$MANGLE538](/(\d)(?=(?:\d{3})+$)/g, '$1,');
}

function setTransformStyle(el, style) {
  el[$MANGLE540].transform = style;
  el[$MANGLE540].webkitTransform = style;
  el[$MANGLE540].mozTransform = style;
  el[$MANGLE540].msTransform = style;
  el[$MANGLE540].oTransform = style;
}

function setTransformByStyle(el, style) {
  return 'transform:' + style + ';webkit-transform:' + style + ';moz-transform:' + style + ';ms-transform:' + style + ';o-transform:' + style;
}

var NUMBER_REG = exports.NUMBER_REG = new RegExp("[0-9]");
});

unwrapExports(util);

var flipRender = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE504 = "defineProperty",
    $MANGLE505 = "length",
    $MANGLE506 = "enumerable",
    $MANGLE511 = "context",
    $MANGLE513 = "VERTICAL",
    $MANGLE514 = "rotateName",
    $MANGLE515 = "renderItem",
    $MANGLE516 = "wrapper",
    $MANGLE517 = "scroller",
    $MANGLE518 = "firstLi",
    $MANGLE519 = "secondLi",
    $MANGLE520 = "showCurValue",
    $MANGLE522 = "innerHTML",
    $MANGLE523 = "children",
    $MANGLE526 = "renderText",
    $MANGLE527 = "getRotateStyle";
Object[$MANGLE504](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props[$MANGLE505]; i++) {
            var descriptor = props[i];descriptor[$MANGLE506] = descriptor[$MANGLE506] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE504](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var FLIP_CONSTANT = 180;

var FlipRender = function () {
    function FlipRender(context, options) {
        _classCallCheck(this, FlipRender);

        var _this = this;
        _this[$MANGLE511] = context;
        var rotateDirection = options.rotateDirection || FlipRender[$MANGLE513];
        if (rotateDirection === FlipRender[$MANGLE513]) {
            _this[$MANGLE514] = 'rotateY';
        } else {
            _this[$MANGLE514] = 'rotateX';
        }
        _this[$MANGLE515] = options[$MANGLE515];
        _this[$MANGLE516] = null;
        _this[$MANGLE517] = null;
        _this[$MANGLE518] = null;
        _this[$MANGLE519] = null;
    }

    _createClass(FlipRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            var showCurValue = _this[$MANGLE511][$MANGLE520];

            _this[$MANGLE516] = wrapper;
            wrapper.className = CLASSNAME_PREFIX + ' tumblingFlip-wrapper';
            wrapper[$MANGLE522] = '<span class="tumbling-hidden-span">' + (_this[$MANGLE515] ? _this[$MANGLE515](9) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this[$MANGLE515] ? _this[$MANGLE515](showCurValue) : showCurValue) + '</li>\n<li></li>\n</ul>';
            _this[$MANGLE517] = wrapper[$MANGLE523][wrapper[$MANGLE523][$MANGLE505] - 1];
            _this[$MANGLE518] = _this[$MANGLE517][$MANGLE523][0];
            _this[$MANGLE519] = _this[$MANGLE517][$MANGLE523][1];
        }
    }, {
        key: 'getRotateStyle',
        value: function getRotateStyle(deg) {
            return this[$MANGLE514] + '(' + deg + 'deg)';
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            var _this = this;
            if (diffDistance === 0) return;
            var _context = this[$MANGLE511],
                showNextValue = _context.showNextValue,
                showCurValue = _context[$MANGLE520],
                showPrevValue = _context.showPrevValue;

            if (diffDistance > 0) {
                FlipRender[$MANGLE526](_this[$MANGLE518], showNextValue, _this[$MANGLE527](-FLIP_CONSTANT * (1 - changeY)));
                FlipRender[$MANGLE526](_this[$MANGLE519], showCurValue, _this[$MANGLE527](FLIP_CONSTANT * changeY));
            } else {
                FlipRender[$MANGLE526](_this[$MANGLE518], showCurValue, _this[$MANGLE527](-FLIP_CONSTANT * changeY));
                FlipRender[$MANGLE526](_this[$MANGLE519], showPrevValue, _this[$MANGLE527](FLIP_CONSTANT * (1 + changeY)));
            }
        }
    }], [{
        key: 'renderText',
        value: function renderText(el, content, style) {
            var html = '';
            if (content != null && content >= 0) {
                html = content + '';
            }
            if (this[$MANGLE515]) {
                html = this[$MANGLE515](html);
            }
            (0, util.setTransformStyle)(el, style);
            el[$MANGLE522] = html;
        }
    }]);

    return FlipRender;
}();

FlipRender.HORIZONTAL = 1;
FlipRender[$MANGLE513] = 2;
exports.default = FlipRender;
});

unwrapExports(flipRender);

var tween = createCommonjsModule(function (module, exports) {
"use strict";

var $MANGLE633 = "cos",
    $MANGLE634 = "PI",
    $MANGLE635 = "sin",
    $MANGLE636 = "pow",
    $MANGLE637 = "sqrt",
    $MANGLE638 = "abs",
    $MANGLE639 = "asin",
    $MANGLE640 = "easeOutBounce";
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
    return -c * Math[$MANGLE633](t / d * (Math[$MANGLE634] / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(t, b, c, d) {
    return c * Math[$MANGLE635](t / d * (Math[$MANGLE634] / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math[$MANGLE633](Math[$MANGLE634] * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(t, b, c, d) {
    return t == 0 ? b : c * Math[$MANGLE636](2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function easeOutExpo(t, b, c, d) {
    return t == d ? b + c : c * (-Math[$MANGLE636](2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math[$MANGLE636](2, 10 * (t - 1)) + b;
    return c / 2 * (-Math[$MANGLE636](2, -10 * --t) + 2) + b;
  },
  easeInCirc: function easeInCirc(t, b, c, d) {
    return -c * (Math[$MANGLE637](1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(t, b, c, d) {
    return c * Math[$MANGLE637](1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math[$MANGLE637](1 - t * t) - 1) + b;
    return c / 2 * (Math[$MANGLE637](1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function easeInElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math[$MANGLE638](c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math[$MANGLE634]) * Math[$MANGLE639](c / a);
    return -(a * Math[$MANGLE636](2, 10 * (t -= 1)) * Math[$MANGLE635]((t * d - s) * (2 * Math[$MANGLE634]) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
    if (a < Math[$MANGLE638](c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math[$MANGLE634]) * Math[$MANGLE639](c / a);
    return a * Math[$MANGLE636](2, -10 * t) * Math[$MANGLE635]((t * d - s) * (2 * Math[$MANGLE634]) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(t, b, c, d) {
    var s = 1.70158;var p = 0;var a = c;
    if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
    if (a < Math[$MANGLE638](c)) {
      a = c;var s = p / 4;
    } else var s = p / (2 * Math[$MANGLE634]) * Math[$MANGLE639](c / a);
    if (t < 1) return -.5 * (a * Math[$MANGLE636](2, 10 * (t -= 1)) * Math[$MANGLE635]((t * d - s) * (2 * Math[$MANGLE634]) / p)) + b;
    return a * Math[$MANGLE636](2, -10 * (t -= 1)) * Math[$MANGLE635]((t * d - s) * (2 * Math[$MANGLE634]) / p) * .5 + c + b;
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
    return c - Tween[$MANGLE640](d - t, 0, c, d) + b;
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
    return Tween[$MANGLE640](t * 2 - d, 0, c, d) * .5 + c * .5 + b;
  }
};

exports.default = Tween;
});

unwrapExports(tween);

var tumblingRender = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE643 = "defineProperty",
    $MANGLE644 = "length",
    $MANGLE645 = "enumerable",
    $MANGLE650 = "context",
    $MANGLE651 = "renderItem",
    $MANGLE652 = "wrapper",
    $MANGLE653 = "scroller",
    $MANGLE654 = "firstLi",
    $MANGLE655 = "secondLi",
    $MANGLE657 = "innerHTML",
    $MANGLE658 = "showCurValue",
    $MANGLE659 = "children",
    $MANGLE662 = "renderText";
Object[$MANGLE643](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props[$MANGLE644]; i++) {
            var descriptor = props[i];descriptor[$MANGLE645] = descriptor[$MANGLE645] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE643](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var TumblingRender = function () {
    function TumblingRender(context, options) {
        _classCallCheck(this, TumblingRender);

        var _this = this;
        _this[$MANGLE650] = context;
        _this[$MANGLE651] = options[$MANGLE651];
        _this[$MANGLE652] = null;
        _this[$MANGLE653] = null;
        _this[$MANGLE654] = null;
        _this[$MANGLE655] = null;
    }

    _createClass(TumblingRender, [{
        key: 'mount',
        value: function mount(wrapper) {
            var _this = this;
            _this[$MANGLE652] = wrapper;
            wrapper.className = CLASSNAME_PREFIX;
            wrapper[$MANGLE657] = '<span class="tumbling-hidden-span">' + (_this[$MANGLE651] ? _this[$MANGLE651](9) : 9) + '</span>\n<ul class="tumbling-scroller">\n<li>' + (_this[$MANGLE651] ? _this[$MANGLE651](_this[$MANGLE658]) : _this[$MANGLE658]) + '</li>\n<li></li>\n</ul>';
            _this[$MANGLE653] = wrapper[$MANGLE659][wrapper[$MANGLE659][$MANGLE644] - 1];
            _this[$MANGLE654] = _this[$MANGLE653][$MANGLE659][0];
            _this[$MANGLE655] = _this[$MANGLE653][$MANGLE659][1];
        }
    }, {
        key: 'render',
        value: function render(diffDistance, changeY) {
            var _this = this;
            var _this$context = _this[$MANGLE650],
                showNextValue = _this$context.showNextValue,
                showCurValue = _this$context[$MANGLE658],
                showPrevValue = _this$context.showPrevValue;

            if (diffDistance > 0) {
                changeY = changeY - 1;
                TumblingRender[$MANGLE662](_this[$MANGLE654], showNextValue);
                TumblingRender[$MANGLE662](_this[$MANGLE655], showCurValue);
            } else if (diffDistance === 0) {
                TumblingRender[$MANGLE662](_this[$MANGLE654], showCurValue);
            } else {
                TumblingRender[$MANGLE662](_this[$MANGLE654], showCurValue);
                TumblingRender[$MANGLE662](_this[$MANGLE655], showPrevValue);
            }
            (0, util.setTransformStyle)(_this[$MANGLE653], 'translateY(' + changeY * 100 + '%)');
        }
    }], [{
        key: 'renderText',
        value: function renderText(el, content) {
            var html = '';
            if (content != null && content >= 0) {
                html = content + '';
            }
            if (this[$MANGLE651]) {
                html = this[$MANGLE651](html);
            }
            el[$MANGLE657] = html;
        }
    }]);

    return TumblingRender;
}();

exports.default = TumblingRender;
});

unwrapExports(tumblingRender);

var domRendable = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE597 = "defineProperty",
    $MANGLE599 = "enumerable",
    $MANGLE608 = "renderItem",
    $MANGLE609 = "animationRender",
    $MANGLE610 = "appearAnimation",
    $MANGLE611 = "disappearAnimation",
    $MANGLE612 = "animationFlag",
    $MANGLE613 = "tween",
    $MANGLE614 = "effect",
    $MANGLE615 = "animateTimeStamp",
    $MANGLE616 = "animateId",
    $MANGLE617 = "default",
    $MANGLE618 = "value",
    $MANGLE620 = "transitionTime",
    $MANGLE621 = "parseTween",
    $MANGLE622 = "animate",
    $MANGLE624 = "requestAnimationFrame",
    $MANGLE625 = "clear",
    $MANGLE626 = "render",
    $MANGLE627 = "animateStop",
    $MANGLE629 = "beforeStart";
Object[$MANGLE597](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor[$MANGLE599] = descriptor[$MANGLE599] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE597](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



var _tween2 = _interopRequireDefault(tween);



var _tumblingRender2 = _interopRequireDefault(tumblingRender);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var merge = Object.assign;
var DEFAULT_OPTIONS = {
    // transitionTime:300
};

var DomRendable = function () {
    function DomRendable(selector, options) {
        _classCallCheck(this, DomRendable);

        var mergeOptions = merge({}, DEFAULT_OPTIONS, options);
        var _this = this;
        _this.dom = DomRendable.parseDom(selector);
        var renderItem = mergeOptions[$MANGLE608],
            animationRender = mergeOptions[$MANGLE609],
            appearAnimation = mergeOptions[$MANGLE610],
            disappearAnimation = mergeOptions[$MANGLE611],
            animationFlag = mergeOptions[$MANGLE612],
            tween$$1 = mergeOptions[$MANGLE613],
            effect = mergeOptions[$MANGLE614];

        _this[$MANGLE615] = null;
        _this[$MANGLE616] = null;
        _this[$MANGLE614] = effect || _tumblingRender2[$MANGLE617];
        _this[$MANGLE618] = options[$MANGLE618];
        _this.startedFlag = false;
        _this[$MANGLE620] = options[$MANGLE620] || 300;
        _this[$MANGLE608] = renderItem;
        _this[$MANGLE613] = DomRendable[$MANGLE621](tween$$1);
        _this[$MANGLE610] = appearAnimation;
        _this[$MANGLE609] = animationRender;
        _this[$MANGLE611] = disappearAnimation;
        _this[$MANGLE612] = animationFlag;
        _this[$MANGLE622] = _this[$MANGLE622].bind(_this);
    }

    _createClass(DomRendable, [{
        key: 'changeTween',
        value: function changeTween(tween$$1) {
            this[$MANGLE613] = DomRendable[$MANGLE621](tween$$1);
        }
    }, {
        key: 'clear',
        value: function clear() {}
    }, {
        key: 'animate',
        value: function animate(tm) {
            var _this = this;
            if (_this[$MANGLE615] == null) {
                _this[$MANGLE615] = tm;
                window[$MANGLE624](_this[$MANGLE622]);
                return;
            }
            var diff = tm - _this[$MANGLE615];
            var stopFlag = false;
            if (diff >= _this[$MANGLE620]) {
                stopFlag = true;
                diff = _this[$MANGLE620];
                _this[$MANGLE615] = null;
                _this[$MANGLE625]();
            }
            /**
             * 
             */
            _this[$MANGLE626](diff, stopFlag);

            if (stopFlag) {
                _this[$MANGLE627] && _this[$MANGLE627](tm);
                _this[$MANGLE616] = null;
                return;
            }
            _this[$MANGLE616] = window[$MANGLE624](_this[$MANGLE622]);
        }
    }, {
        key: 'complete',
        value: function complete() {
            var _this = this;
            if (_this[$MANGLE616]) {
                window.cancelAnimationFrame(_this[$MANGLE616]);
                _this[$MANGLE616] = null;
                _this[$MANGLE625]();
                _this[$MANGLE626](_this[$MANGLE620], true);
            }
        }
    }, {
        key: 'render',
        value: function render() {}
    }, {
        key: 'start',
        value: function start() {
            var _this = this;
            if (_this[$MANGLE616]) {
                return;
            }
            _this[$MANGLE629] && _this[$MANGLE629]();
            // if(!_this.startedFlag){
            //     _this.startedFlag = true
            // }else{
            //     _this.complete();
            //     _this.afterStartComplete && _this.afterStartComplete();
            // }
            if (_this[$MANGLE618]) {
                // console.log('request');
                _this[$MANGLE616] = window[$MANGLE624](_this[$MANGLE622]);
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
        value: function parseTween(tween$$1) {
            if (!tween$$1) {
                return _tween2[$MANGLE617].linear;
            }
            if (typeof tween$$1 === 'function') {
                return tween$$1;
            }
            return _tween2[$MANGLE617][tween$$1];
        }
    }]);

    return DomRendable;
}();

exports[$MANGLE617] = DomRendable;
});

unwrapExports(domRendable);

var domItem = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE665 = "defineProperty",
    $MANGLE666 = "length",
    $MANGLE667 = "enumerable",
    $MANGLE671 = "prototype",
    $MANGLE673 = "setPrototypeOf",
    $MANGLE674 = "__proto__",
    $MANGLE677 = "appearAnimation",
    $MANGLE678 = "disappearAnimation",
    $MANGLE679 = "animationFlag",
    $MANGLE681 = "renderItem",
    $MANGLE682 = "tween",
    $MANGLE683 = "context",
    $MANGLE684 = "value",
    $MANGLE685 = "index",
    $MANGLE686 = "rawMode",
    $MANGLE687 = "rawDirection",
    $MANGLE688 = "visible",
    $MANGLE689 = "wrapper",
    $MANGLE690 = "hasRender",
    $MANGLE691 = "effectController",
    $MANGLE692 = "moveRatio",
    $MANGLE693 = "parentDom",
    $MANGLE694 = "newBornFlag",
    $MANGLE695 = "disappearFlag",
    $MANGLE697 = "wrapperWidth",
    $MANGLE699 = "className",
    $MANGLE701 = "width",
    $MANGLE702 = "style",
    $MANGLE703 = "opacity",
    $MANGLE704 = "call",
    $MANGLE705 = "getPrototypeOf",
    $MANGLE707 = "baseRange",
    $MANGLE708 = "diffDistance",
    $MANGLE709 = "maxValue",
    $MANGLE710 = "moveY",
    $MANGLE711 = "showCurValue",
    $MANGLE713 = "createElement",
    $MANGLE715 = "appendChild",
    $MANGLE716 = "showPrevValue",
    $MANGLE717 = "showNextValue",
    $MANGLE718 = "floor",
    $MANGLE719 = "add",
    $MANGLE720 = "originCurValue",
    $MANGLE722 = "transitionTime",
    $MANGLE725 = "animateRender";
Object[$MANGLE665](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props[$MANGLE666]; i++) {
            var descriptor = props[i];descriptor[$MANGLE667] = descriptor[$MANGLE667] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE665](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor[$MANGLE671], protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass[$MANGLE671] = Object.create(superClass && superClass[$MANGLE671], { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object[$MANGLE673] ? Object[$MANGLE673](subClass, superClass) : subClass[$MANGLE674] = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var CLASSNAME_PREFIX = 'tumbling-wrapper';

var BaseItem = exports.BaseItem = function () {
    function BaseItem(context, value, options) {
        _classCallCheck(this, BaseItem);

        var effect = context.effect,
            appearAnimation = context[$MANGLE677],
            disappearAnimation = context[$MANGLE678],
            animationFlag = context[$MANGLE679],
            dom = context.dom,
            renderItem = context[$MANGLE681];

        var _this = this;
        _this[$MANGLE683] = context;
        _this[$MANGLE684] = value;
        _this[$MANGLE685] = options[$MANGLE685];
        _this[$MANGLE686] = options[$MANGLE686] || false;
        _this[$MANGLE687] = options[$MANGLE687] || 1;
        _this[$MANGLE688] = false;
        _this[$MANGLE689] = null;
        _this[$MANGLE690] = false;
        _this[$MANGLE691] = new effect(_this, options);
        _this[$MANGLE692] = 1;
        _this[$MANGLE679] = animationFlag || true;
        _this[$MANGLE693] = dom;
        _this[$MANGLE681] = renderItem;
        _this[$MANGLE694] = options[$MANGLE694] || false;
        _this[$MANGLE677] = appearAnimation;
        _this[$MANGLE678] = disappearAnimation;
        _this[$MANGLE695] = false;
    }

    _createClass(BaseItem, [{
        key: 'remove',
        value: function remove() {
            var _this = this;
            if (_this[$MANGLE693] && _this[$MANGLE689]) {
                _this[$MANGLE693].removeChild(_this[$MANGLE689]);
                _this[$MANGLE689] = null;
            }
        }
    }, {
        key: 'getWrapperWidth',
        value: function getWrapperWidth() {
            var _this = this;
            if (!_this[$MANGLE697]) {
                _this[$MANGLE697] = _this[$MANGLE689].offsetWidth;
                return _this[$MANGLE697];
            }
            return _this[$MANGLE697];
        }
    }, {
        key: 'disappear',
        value: function disappear() {
            this[$MANGLE695] = true;
        }
    }, {
        key: 'animateRender',
        value: function animateRender() {
            var _this = this;
            if (!_this[$MANGLE688]) {
                _this[$MANGLE689][$MANGLE699] += ' ' + CLASSNAME_PREFIX + '-visible';
                _this[$MANGLE688] = true;
                _this.getWrapperWidth();
            }
            if (_this[$MANGLE695]) {
                if (_this[$MANGLE678]) {
                    _this[$MANGLE678](_this[$MANGLE689], _this[$MANGLE692]);
                } else if (this[$MANGLE679]) {
                    _this[$MANGLE689][$MANGLE702][$MANGLE701] = _this[$MANGLE697] * _this[$MANGLE692] + 'px';
                    _this[$MANGLE689][$MANGLE702][$MANGLE703] = _this[$MANGLE692];
                }
            } else if (_this[$MANGLE694]) {
                var newRatio = 1 - _this[$MANGLE692];
                if (_this[$MANGLE677]) {
                    _this[$MANGLE677](_this[$MANGLE689], newRatio);
                } else if (this[$MANGLE679]) {
                    _this[$MANGLE689][$MANGLE702][$MANGLE701] = _this[$MANGLE697] * newRatio + 'px';
                    _this[$MANGLE689][$MANGLE702][$MANGLE703] = newRatio;
                }
            }
        }
    }]);

    return BaseItem;
}();

var NumberItem = function (_BaseItem) {
    _inherits(NumberItem, _BaseItem);

    function NumberItem(context, value, options) {
        _classCallCheck(this, NumberItem);

        var _this2 = _possibleConstructorReturn(this, (NumberItem[$MANGLE674] || Object[$MANGLE705](NumberItem))[$MANGLE704](this, context, value, options));

        var _this = _this2;
        _this[$MANGLE684] = 0;
        _this.isNumber = true;
        _this[$MANGLE707] = options[$MANGLE707];
        _this[$MANGLE708] = 0;
        _this[$MANGLE709] = options[$MANGLE709] || 10;
        _this[$MANGLE710] = 0;
        _this[$MANGLE711] = 0;
        _this.update(value);
        return _this2;
    }

    _createClass(NumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var _this = this;
            var wrapper = document[$MANGLE713]('div');
            _this[$MANGLE691].mount(wrapper);
            _this[$MANGLE689] = wrapper;
            _this[$MANGLE688] = false;
            dom[$MANGLE715](wrapper);
            return _this;
        }
    }, {
        key: 'update',
        value: function update() {
            var value = arguments[$MANGLE666] > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            var _this = this;
            if (_this[$MANGLE686]) {
                _this[$MANGLE716] = _this[$MANGLE717] = value;
                if (value === _this[$MANGLE684]) {
                    _this[$MANGLE708] = 0;
                    return;
                }
                _this[$MANGLE708] = _this[$MANGLE687];
                _this[$MANGLE684] = value;
            } else {
                var dividedValue = NumberItem[$MANGLE718](value / _this[$MANGLE707]);
                var diff = dividedValue - _this[$MANGLE684];
                _this[$MANGLE708] = diff;
                _this[$MANGLE684] = dividedValue;
                _this[$MANGLE716] = _this[$MANGLE719](_this[$MANGLE711], -1);
                _this[$MANGLE717] = _this[$MANGLE719](_this[$MANGLE711], 1);
                _this[$MANGLE720] = _this[$MANGLE711];
            }
        }
    }, {
        key: 'processNumber',
        value: function processNumber(value, diff) {
            var _this = this;
            var ret = NumberItem[$MANGLE718]((value + diff) % _this[$MANGLE709]);
            if (ret < 0) {
                return _this[$MANGLE709] + ret;
            }
            return ret;
        }
    }, {
        key: 'add',
        value: function add(value, diff) {
            var _this = this;
            var fValue = value + diff;
            if (fValue >= _this[$MANGLE709]) {
                return 0;
            } else if (fValue < 0) {
                return _this[$MANGLE709] - 1;
            }
            return fValue;
        }
    }, {
        key: 'updateValue',
        value: function updateValue(changeY) {
            var _this = this;
            var integerDistance = NumberItem[$MANGLE718](changeY);
            _this[$MANGLE711] = _this.processNumber(_this[$MANGLE720], integerDistance);
            _this[$MANGLE716] = _this[$MANGLE719](_this[$MANGLE711], -1);
            _this[$MANGLE717] = _this[$MANGLE719](_this[$MANGLE711], 1);
        }
    }, {
        key: 'updateRawValue',
        value: function updateRawValue(changeY) {
            var _this = this;
            if (changeY === 1 || changeY === -1) {
                _this[$MANGLE711] = _this[$MANGLE716];
                _this[$MANGLE716] = _this[$MANGLE717] = _this[$MANGLE711];
            }
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var distance = void 0;
            var transitionTime = _this[$MANGLE683][$MANGLE722];

            if (stopFlag && _this[$MANGLE694]) {
                _this[$MANGLE694] = false;
            }
            if (_this[$MANGLE708] === 0) {
                return;
            }
            //easeOutElastic linear
            if (tm === transitionTime) {
                distance = _this[$MANGLE708];
            } else {
                distance = _this[$MANGLE683][$MANGLE682](tm, 0, _this[$MANGLE708], transitionTime);
            }
            // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
            _this[$MANGLE692] = (transitionTime - tm) / transitionTime;
            _this[$MANGLE710] = distance;
            if (_this[$MANGLE686]) {
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
        value: function render() {
            var _this = this;
            var diffDistance = _this[$MANGLE708];

            if (diffDistance === 0 && _this[$MANGLE690]) return;
            _this[$MANGLE690] = true;
            var changeY = _this[$MANGLE710] % 1;
            _this[$MANGLE725]();
            _this[$MANGLE691].render(diffDistance, changeY);
        }
    }], [{
        key: 'floor',
        value: function floor(val) {
            if (val < 0) {
                return -Math[$MANGLE718](-val);
            }
            return Math[$MANGLE718](val);
        }
    }]);

    return NumberItem;
}(BaseItem);

var NoNumberItem = function (_BaseItem2) {
    _inherits(NoNumberItem, _BaseItem2);

    function NoNumberItem(context, value, options) {
        _classCallCheck(this, NoNumberItem);

        return _possibleConstructorReturn(this, (NoNumberItem[$MANGLE674] || Object[$MANGLE705](NoNumberItem))[$MANGLE704](this, context, value, options));
    }

    _createClass(NoNumberItem, [{
        key: 'mount',
        value: function mount(dom) {
            var _this = this;
            var wrapper = document[$MANGLE713]('div');
            wrapper[$MANGLE699] = CLASSNAME_PREFIX;
            wrapper.innerHTML = _this[$MANGLE684];
            _this[$MANGLE689] = wrapper;
            dom[$MANGLE715](wrapper);
            return _this;
        }
    }, {
        key: 'move',
        value: function move(tm, stopFlag) {
            var _this = this;
            var transitionTime = _this[$MANGLE683][$MANGLE722];

            _this[$MANGLE692] = (transitionTime - tm) / transitionTime;
            if (stopFlag && _this[$MANGLE694]) {
                _this[$MANGLE694] = false;
            }
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {
            this[$MANGLE725]();
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

var $MANGLE546 = "defineProperty",
    $MANGLE547 = "length",
    $MANGLE548 = "enumerable",
    $MANGLE552 = "prototype",
    $MANGLE555 = "setPrototypeOf",
    $MANGLE556 = "__proto__",
    $MANGLE560 = "thousand",
    $MANGLE562 = "options",
    $MANGLE564 = "value",
    $MANGLE565 = "default",
    $MANGLE566 = "parseValue",
    $MANGLE567 = "valueStr",
    $MANGLE568 = "transformValueStr",
    $MANGLE569 = "createDocumentFragment",
    $MANGLE570 = "strItems",
    $MANGLE571 = "forEach",
    $MANGLE572 = "pow",
    $MANGLE573 = "test",
    $MANGLE574 = "NUMBER_REG",
    $MANGLE575 = "mount",
    $MANGLE576 = "generateDomItem",
    $MANGLE577 = "push",
    $MANGLE578 = "items",
    $MANGLE580 = "dom",
    $MANGLE584 = "disappear",
    $MANGLE591 = "disappearFlag",
    $MANGLE592 = "remove",
    $MANGLE593 = "move",
    $MANGLE594 = "render",
    $MANGLE595 = "split";
Object[$MANGLE546](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props[$MANGLE547]; i++) {
            var descriptor = props[i];descriptor[$MANGLE548] = descriptor[$MANGLE548] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE546](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor[$MANGLE552], protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);



function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass[$MANGLE552] = Object.create(superClass && superClass[$MANGLE552], { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object[$MANGLE555] ? Object[$MANGLE555](subClass, superClass) : subClass[$MANGLE556] = superClass;
}

var merge = Object.assign;

var DomNumber = function (_DomRendable) {
    _inherits(DomNumber, _DomRendable);

    function DomNumber(selector, options) {
        _classCallCheck(this, DomNumber);

        var _this2 = _possibleConstructorReturn(this, (DomNumber[$MANGLE556] || Object.getPrototypeOf(DomNumber)).call(this, selector, options));

        var thousand = options[$MANGLE560];

        var _this = _this2;
        _this[$MANGLE560] = thousand;
        _this[$MANGLE562] = options;
        _this.generateNumberItems(_this[$MANGLE564]);
        return _this2;
    }

    _createClass(DomNumber, [{
        key: 'generateDomItem',
        value: function generateDomItem(isNumber, val, index, maxValue, baseRange, newBornFlag) {
            var _this = this;
            return (0, _domItem2[$MANGLE565])(_this, val, merge({}, _this[$MANGLE562], {
                index: index,
                newBornFlag: newBornFlag,
                baseRange: baseRange,
                maxValue: maxValue
            }), isNumber);
        }
    }, {
        key: 'generateNumberItems',
        value: function generateNumberItems() {
            var val = arguments[$MANGLE547] > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var _this = this;

            var _DomNumber$parseValue = DomNumber[$MANGLE566](val, _this[$MANGLE560]),
                valueStr = _DomNumber$parseValue[$MANGLE567],
                transformValueStr = _DomNumber$parseValue[$MANGLE568];

            var valStrLenMinus1 = valueStr[$MANGLE547] - 1;
            var fragment = document[$MANGLE569]();
            _this[$MANGLE570] = {};
            var transformIndex = 0,
                domItems = [];
            valueStr[$MANGLE571](function (value, index) {
                var maxValue = 10;
                var baseRange = Math[$MANGLE572](maxValue, valStrLenMinus1 - index);
                var transformCurVal = transformValueStr[transformIndex];
                var isNumber = util[$MANGLE574][$MANGLE573](transformCurVal);
                if (!isNumber) {
                    var domItem$$1 = _this[$MANGLE576](false, transformCurVal, index, maxValue, baseRange)[$MANGLE575](fragment);
                    _this[$MANGLE570][valStrLenMinus1 - transformIndex] = domItem$$1;
                    // domItems.push(domItem);
                    transformIndex++;
                }
                transformIndex++;
                domItems[$MANGLE577](_this[$MANGLE576](true, val, index, maxValue, baseRange)[$MANGLE575](fragment));
            });
            _this[$MANGLE578] = domItems;
            _this[$MANGLE580].appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            var _this = this;
            _this.complete();
            if (value !== _this[$MANGLE564]) {
                var _DomNumber$parseValue2 = DomNumber[$MANGLE566](value, _this[$MANGLE560]),
                    valueStr = _DomNumber$parseValue2[$MANGLE567],
                    transformValueStr = _DomNumber$parseValue2[$MANGLE568];

                var itemsLen = _this[$MANGLE578][$MANGLE547];
                var valStrLen = valueStr[$MANGLE547];

                var diffLen = valStrLen - itemsLen;
                var newItems = void 0;
                if (diffLen > 0) {
                    newItems = [];
                    var fragment = document[$MANGLE569]();
                    var valStrLenMinus1 = valStrLen - 1;
                    var transformIndex = 0,
                        strIndex = void 0;
                    for (var i = 0; i < valStrLen; i++) {
                        var maxValue = 10;
                        var baseRange = Math[$MANGLE572](maxValue, valStrLenMinus1 - i);
                        var transformCurVal = transformValueStr[transformIndex];
                        var isNumber = util[$MANGLE574][$MANGLE573](transformCurVal);
                        strIndex = valStrLenMinus1 - transformIndex;
                        if (!isNumber) {
                            if (!_this[$MANGLE570][strIndex]) {
                                var domItem$$1 = _this[$MANGLE576](false, transformCurVal, i, maxValue, baseRange, true)[$MANGLE575](fragment);
                                _this[$MANGLE570][strIndex] = domItem$$1;
                            }
                            transformIndex++;
                        }
                        if (i < diffLen) {
                            // console.log('push i');
                            newItems[$MANGLE577](_this[$MANGLE576](true, value, i, maxValue, baseRange, true)[$MANGLE575](fragment));
                        }

                        transformIndex++;
                    }
                    // console.log('newItems :',newItems.length);
                    _this[$MANGLE580].insertBefore(fragment, _this[$MANGLE580].children[0]);
                } else if (diffLen < 0) {
                    for (var _i = 0; _i < -diffLen; _i++) {
                        _this[$MANGLE578][_i][$MANGLE584]();
                    }
                    for (var index in _this[$MANGLE570]) {
                        var tmpItem = _this[$MANGLE570][index];
                        if (util[$MANGLE574][$MANGLE573](transformValueStr[index]) || index >= transformValueStr[$MANGLE547]) {
                            tmpItem[$MANGLE584]();
                        }
                    }
                }
                _this[$MANGLE578][$MANGLE571](function (item) {
                    item.update(value);
                });
                if (newItems) {
                    _this[$MANGLE578] = newItems.concat(_this[$MANGLE578]);
                }
                _this.animateId = window.requestAnimationFrame(_this.animate);
                _this[$MANGLE564] = value;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _this = this;
            _this[$MANGLE578] = _this[$MANGLE578].filter(function (item) {
                if (item[$MANGLE591]) {
                    item[$MANGLE592]();
                }
                return !item[$MANGLE591];
            });
            for (var index in _this[$MANGLE570]) {
                var curItem = _this[$MANGLE570][index];
                if (curItem[$MANGLE591]) {
                    curItem[$MANGLE592]();
                    delete _this[$MANGLE570][index];
                }
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            var _this = this;
            _this[$MANGLE578][$MANGLE571](function (item, index) {
                if (tm) {
                    item[$MANGLE593](tm, flag);
                }
                item[$MANGLE594]();
            });
            for (var index in _this[$MANGLE570]) {
                var curItem = _this[$MANGLE570][index];
                curItem[$MANGLE593](tm, flag);
                curItem[$MANGLE594]();
            }
            // ctx.fillText('370911',0,0);
        }
    }], [{
        key: 'parseValue',
        value: function parseValue(val, thousandFlag) {
            var integerVal = parseInt(val);
            var valueStr = ('' + integerVal)[$MANGLE595](''),
                transformValueStr = valueStr;
            if (thousandFlag) {
                transformValueStr = (0, util.toThousands)(integerVal)[$MANGLE595]('');
            }
            return {
                valueStr: valueStr,
                transformValueStr: transformValueStr
            };
        }
    }]);

    return DomNumber;
}(_domRendable2[$MANGLE565]);

exports[$MANGLE565] = DomNumber;
});

unwrapExports(domNumberScroller);

var domRawScroller = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE729 = "defineProperty",
    $MANGLE732 = "prototype",
    $MANGLE734 = "enumerable",
    $MANGLE740 = "setPrototypeOf",
    $MANGLE741 = "__proto__",
    $MANGLE747 = "value",
    $MANGLE749 = "stopImmediate",
    $MANGLE750 = "maxRandomStep",
    $MANGLE751 = "debounceRatio",
    $MANGLE752 = "stopFlag",
    $MANGLE753 = "onStop",
    $MANGLE754 = "options",
    $MANGLE757 = "items",
    $MANGLE758 = "map",
    $MANGLE759 = "step",
    $MANGLE760 = "floor",
    $MANGLE763 = "default",
    $MANGLE764 = "maxValue",
    $MANGLE768 = "forEach",
    $MANGLE770 = "updateItems",
    $MANGLE772 = "animateId",
    $MANGLE773 = "requestAnimationFrame",
    $MANGLE774 = "animate",
    $MANGLE776 = "render";
Object[$MANGLE729](exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol[$MANGLE732] ? "symbol" : typeof obj;
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor[$MANGLE734] = descriptor[$MANGLE734] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE729](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor[$MANGLE732], protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass[$MANGLE732] = Object.create(superClass && superClass[$MANGLE732], { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object[$MANGLE740] ? Object[$MANGLE740](subClass, superClass) : subClass[$MANGLE741] = superClass;
}

var merge = Object.assign;

var DomRawScroller = function (_DomRendable) {
    _inherits(DomRawScroller, _DomRendable);

    function DomRawScroller(selector, options) {
        _classCallCheck(this, DomRawScroller);

        var _this2 = _possibleConstructorReturn(this, (DomRawScroller[$MANGLE741] || Object.getPrototypeOf(DomRawScroller)).call(this, selector, options));

        var _this = _this2;
        _this[$MANGLE747] = DomRawScroller.transformValue(_this[$MANGLE747]);
        _this[$MANGLE749] = options[$MANGLE749] || false;
        _this[$MANGLE750] = options[$MANGLE750] || 100;
        _this[$MANGLE751] = options[$MANGLE751] || 0.3;
        _this[$MANGLE752] = false;
        _this[$MANGLE753] = options[$MANGLE753];
        _this[$MANGLE754] = options;
        _this.generateRawItems(_this[$MANGLE747]);
        return _this2;
    }

    _createClass(DomRawScroller, [{
        key: 'generateRawItems',
        value: function generateRawItems(value) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            _this[$MANGLE757] = value[$MANGLE758](function (itemValue, index) {
                itemValue[$MANGLE759] = itemValue[$MANGLE759] || Math[$MANGLE760](Math.random() * _this[$MANGLE750]);
                return (0, _domItem2[$MANGLE763])(_this, itemValue[$MANGLE759], merge({}, _this[$MANGLE754], {
                    index: index,
                    baseRange: 1,
                    maxValue: itemValue[$MANGLE764] || 10
                }), true).mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'updateItems',
        value: function updateItems(getNewValue) {
            getNewValue = getNewValue || DomRawScroller.addValue;
            var _this = this;
            _this[$MANGLE747][$MANGLE768](function (itemValue, index) {
                var curItem = _this[$MANGLE757][index];
                // curItem.update(curItem.value + itemValue.step);
                curItem.update(getNewValue(curItem, itemValue));
                curItem[$MANGLE747] = curItem[$MANGLE747] % curItem[$MANGLE764];
            });
        }
    }, {
        key: 'animateStop',
        value: function animateStop(timestamp) {
            var _this = this;
            if (_this[$MANGLE752]) {
                _this[$MANGLE753] && _this[$MANGLE753](_this[$MANGLE757][$MANGLE758](function (item) {
                    // console.log(item.showCurValue);
                    return item[$MANGLE747] % item[$MANGLE764];
                }, _this));
                return;
            }
            if (timestamp) {
                _this[$MANGLE770]();
                _this.animateTimeStamp = timestamp;
                _this[$MANGLE772] = window[$MANGLE773](_this[$MANGLE774]);
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this[$MANGLE757][$MANGLE768](function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item[$MANGLE776]();
            });
        }
    }, {
        key: 'beforeStart',
        value: function beforeStart() {
            this[$MANGLE752] = false;
        }
    }, {
        key: 'afterStartComplete',
        value: function afterStartComplete() {
            this[$MANGLE770]();
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this = this;
            if (_this[$MANGLE752]) return;
            _this[$MANGLE752] = true;
            if (_this[$MANGLE772]) {
                window.cancelAnimationFrame(_this[$MANGLE772]);
                _this[$MANGLE772] = null;
                _this[$MANGLE776](_this.transitionTime, true);
                if (_this[$MANGLE749]) {
                    _this.animateStop();
                    return;
                }
                _this[$MANGLE770](function (curItem, itemValue) {
                    return curItem[$MANGLE747] + Math[$MANGLE760](itemValue[$MANGLE759] * _this[$MANGLE751]);
                });
                _this[$MANGLE772] = window[$MANGLE773](_this[$MANGLE774]);
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
            return curItem[$MANGLE747] + itemValue[$MANGLE759];
        }
    }]);

    return DomRawScroller;
}(_domRendable2[$MANGLE763]);

exports[$MANGLE763] = DomRawScroller;
});

unwrapExports(domRawScroller);

var countdown = createCommonjsModule(function (module, exports) {
'use strict';

var $MANGLE781 = "defineProperty",
    $MANGLE783 = "enumerable",
    $MANGLE787 = "prototype",
    $MANGLE790 = "setPrototypeOf",
    $MANGLE791 = "__proto__",
    $MANGLE795 = "options",
    $MANGLE796 = "direction",
    $MANGLE797 = "ADD",
    $MANGLE799 = "value",
    $MANGLE800 = "split",
    $MANGLE802 = "items",
    $MANGLE806 = "default",
    $MANGLE810 = "animateId",
    $MANGLE812 = "render",
    $MANGLE814 = "forEach";
Object[$MANGLE781](exports, "__esModule", {
    value: true
});

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor[$MANGLE783] = descriptor[$MANGLE783] || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object[$MANGLE781](target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor[$MANGLE787], protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();



var _domRendable2 = _interopRequireDefault(domRendable);



var _domItem2 = _interopRequireDefault(domItem);



function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass[$MANGLE787] = Object.create(superClass && superClass[$MANGLE787], { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object[$MANGLE790] ? Object[$MANGLE790](subClass, superClass) : subClass[$MANGLE791] = superClass;
}

var merge = Object.assign;

var Countdown = function (_DomRendable) {
    _inherits(Countdown, _DomRendable);

    function Countdown(selector, options) {
        _classCallCheck(this, Countdown);

        var _this2 = _possibleConstructorReturn(this, (Countdown[$MANGLE791] || Object.getPrototypeOf(Countdown)).call(this, selector, options));

        var _this = _this2;
        _this[$MANGLE795] = options;
        _this[$MANGLE796] = options[$MANGLE796] || Countdown[$MANGLE797];
        _this.init(_this2[$MANGLE799]);
        return _this2;
    }

    _createClass(Countdown, [{
        key: 'init',
        value: function init(value) {
            var _this = this;
            var valStrArr = (value + '')[$MANGLE800]('');
            var fragment = document.createDocumentFragment();
            _this[$MANGLE802] = valStrArr.map(function (val, index) {
                var isNumber = util.NUMBER_REG.test(val);
                var itemValue = isNumber ? parseInt(val) : val;
                var item = (0, _domItem2[$MANGLE806])(_this, itemValue, merge({}, _this[$MANGLE795], {
                    index: index,
                    rawDirection: _this[$MANGLE796] === Countdown[$MANGLE797] ? 1 : -1,
                    rawMode: true
                }), isNumber);
                return item.mount(fragment);
            });
            _this.dom.appendChild(fragment);
        }
    }, {
        key: 'update',
        value: function update(value) {
            var _this = this;
            if (_this[$MANGLE810]) {
                window.cancelAnimationFrame(_this[$MANGLE810]);
                _this[$MANGLE810] = null;
                _this[$MANGLE812](_this.transitionTime, true);
            }
            if (value !== _this[$MANGLE799]) {
                var valStrArr = (value + '')[$MANGLE800]('');
                valStrArr[$MANGLE814](function (val, index) {
                    var curItem = _this[$MANGLE802][index];
                    if (curItem.isNumber) {
                        var updateVal = parseInt(val);
                        curItem.update(updateVal);
                    }
                });
                _this[$MANGLE810] = window.requestAnimationFrame(_this.animate);
                _this[$MANGLE799] = value;
            }
        }
    }, {
        key: 'render',
        value: function render(tm, flag) {
            this[$MANGLE802][$MANGLE814](function (item, index) {
                if (tm) {
                    item.move(tm, flag);
                }
                item[$MANGLE812]();
            });
        }
    }]);

    return Countdown;
}(_domRendable2[$MANGLE806]);

Countdown[$MANGLE797] = 0;
Countdown.MINUS = 1;
exports[$MANGLE806] = Countdown;
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

var $MANGLE0 = 'defineProperty',
    $MANGLE5 = 'default';
Object[$MANGLE0](exports, "__esModule", {
  value: true
});
exports.Countdown = exports.DomRawScroller = exports.DomNumberScroller = exports.FlipRender = undefined;



Object[$MANGLE0](exports, 'FlipRender', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(flipRender)[$MANGLE5];
  }
});



Object[$MANGLE0](exports, 'DomNumberScroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domNumberScroller)[$MANGLE5];
  }
});



Object[$MANGLE0](exports, 'DomRawScroller', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(domRawScroller)[$MANGLE5];
  }
});



Object[$MANGLE0](exports, 'Countdown', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(countdown)[$MANGLE5];
  }
});



function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
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
