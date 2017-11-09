var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Canvas);

    var width = options.width,
        height = options.height,
        auto = options.auto;

    this.auto = options.auto || true;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.initContext();
  }

  _createClass(Canvas, [{
    key: 'mount',
    value: function mount(dom) {
      if (dom) {
        dom.appendChild(this.canvas);
      }
    }
  }, {
    key: 'initContext',
    value: function initContext() {
      var canvas = this.canvas,
          context = this.context,
          auto = this.auto,
          devicePixelRatio = window.devicePixelRatio || 1,
          backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1,
          ratio = devicePixelRatio / backingStoreRatio;
      var unit = 'px';
      var originWidth = canvas.width,
          originHeight = canvas.height;
      if (auto && devicePixelRatio !== backingStoreRatio) {
        canvas.width = originWidth * ratio;
        canvas.height = originHeight * ratio;
        canvas.style.width = originWidth + unit;
        canvas.style.height = originHeight + unit;
        context.scale(ratio, ratio);
      }
      this.ratio = ratio;
      this.originWidth = originWidth;
      this.originHeight = originHeight;
      this.whRatio = originWidth / originHeight;
      this.width = canvas.width;
      this.height = canvas.height;
    }
  }]);

  return Canvas;
}();

export default Canvas;