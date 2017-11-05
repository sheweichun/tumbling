
export default class Canvas{
    constructor(options={}){
        const{width,height,auto} = options;
        this.auto = options.auto || true;
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.initContext();
    }
    mount(dom){
        if(dom){
            dom.appendChild(this.canvas);
        }
    }
    initContext(){
      let canvas = this.canvas,
      context = this.context,
      auto = this.auto,
      devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio = context.webkitBackingStorePixelRatio ||
                           context.mozBackingStorePixelRatio ||
                           context.msBackingStorePixelRatio ||
                           context.oBackingStorePixelRatio ||
                           context.backingStorePixelRatio || 1,
      ratio = devicePixelRatio / backingStoreRatio;
    const unit = 'px';
    let originWidth = canvas.width,
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
}