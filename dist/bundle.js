(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.myBundle = {})));
}(this, (function (exports) { 'use strict';

if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) { // Skip over if undefined or null
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



window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(()=>{
                callback(Date.now());   
            }, 6000 / 60);
        };
})();

const Tween = {
    linear:function( t, b, c, d) {
      return (c - b) / d * t + b;
    },
    easeInQuad: function( t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOutQuad: function( t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function( t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function( t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function( t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function( t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function( t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function( t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function( t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function( t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function( t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function( t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function( t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function( t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function( t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function( t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function( t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function( t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function( t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function( t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function( t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function( t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c; var s = p / 4; 
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
    },
    easeOutElastic: function( t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c; var s = p / 4; 
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b;
    },
    easeInOutElastic: function( t, b, c, d) {
      var s = 1.70158; var p = 0; var a = c;
      if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c; var s = p / 4; 
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
    },
    easeInBack: function( t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function( t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function( t, b, c, d, s) {
      if (s == undefined) s = 1.70158; 
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function( t, b, c, d) {
      return c - Tween.easeOutBounce( d - t, 0, c, d) + b;
    },
    easeOutBounce: function( t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOutBounce: function( t, b, c, d) {
      if (t < d / 2) return Tween.easeInBounce( t * 2, 0, c, d) * .5 + b;
      return Tween.easeOutBounce( t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
};

const NUMBER_REG = new RegExp("[0-9]");


class NumberItem{
    constructor(context,value,options){
        this.context = context;
        this.value = 0;
        this.index = options.index;
        this.margin = options.margin || 0;
        this.parentDom = options.parentDom;
        this.baseRange = options.baseRange;
        this.diffDistance = 0;
        this.maxValue = options.maxValue || 10;
        this.moveY = 0;
        this.moveRatio = 1;
        this.disappearFlag = false;
        this.newBornFlag = options.newBornFlag || false;
        this.showCurValue = 0;
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
        this.update(value);
    }
    mount(prependFlag){
        const dom = this.parentDom;
        let wrapper = document.createElement('div');
        let scroller = document.createElement('ul');
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.innerHTML = `
            <span style="visibility:hidden;">9</span>
            <ul style="position:absolute;top:0;margin:0;padding:0;left:0;list-style:none;text-align: center;width:100%;">
                <li>${this.showCurValue}</li>
                <li></li>
            </ul>
        `;
        if(prependFlag){
            // dom.prepend(wrapper);
            dom.insertBefore(wrapper,dom.children[0]);
        }else{
            dom.appendChild(wrapper);
        }
        this.wrapper = wrapper;
        this.scroller = wrapper.children[wrapper.children.length - 1];
        this.firstLi = this.scroller.children[0];
        this.secondLi = this.scroller.children[1];
        return this;
    }
    static floor(val){
        if(val < 0){
            return -(Math.floor(-val))
        }
        return Math.floor(val);
    }
    update(value=0){
        const dividedValue = NumberItem.floor(value / this.baseRange);
        let diff = dividedValue - this.value;
        this.diffDistance = diff;
        this.value = dividedValue;
        this.originCurValue = this.showCurValue ;
    }
    processNumber(value,diff){
        let ret = NumberItem.floor((value + diff) % this.maxValue);
        if(ret < 0){
            return this.maxValue + ret;
        }
        return ret;
    }
    add(value,diff){
        let fValue = value + diff;
        if(fValue >= this.maxValue){
            return 0;
        }else if(fValue < 0){
            return this.maxValue - 1
        }
        return fValue
    }
    updateValue(changeY){
        let integerDistance = NumberItem.floor(changeY);
        this.showCurValue = this.processNumber(this.originCurValue,integerDistance );
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
    }
    move(tm,stopFlag){
        let distance;
        const {transitionTime} = this.context;
        if(stopFlag && this.newBornFlag){
            this.newBornFlag = false;
        }
        if(this.diffDistance === 0){
            return
        }
        //easeOutElastic linear
        distance= Tween.easeOutElastic(tm,0,this.diffDistance,transitionTime);
        this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        this.moveY = distance;
        this.updateValue(distance);
    }
    disappear(){
        this.disappearFlag = true;
        if(this.parentDom && this.wrapper){
            this.parentDom.removeChild(this.wrapper);
            this.wrapper = null;
        }
    }
    static renderText(el,content){
        let html = '';
        if(content != null && content >= 0){
            html =  content+'';
        }
        // if(html === '1'){
        //     el.style. = 'translateX(15%)';
        // }else{
        //     el.style.transform = '';
        // }
        el.innerHTML = html;
    } 
    static setTransformStyle(el,style){
        el.style.transform = style;
        el.style.webkitTransform = style;
        el.style.mozTransform = style;
        el.style.msTransform = style;
        el.style.oTransform = style;
    }
    render(){
        const{diffDistance} = this;
        let changeY = this.moveY % 1;
        // console.log(this.showPrevValue,this.showCurValue,this.showNextValue,changeY);
        if(diffDistance > 0){
            // if(this.index === 0){
            //     console.log(this.showCurValue,this.showNextValue,this.showPrevValue);
            // }
            changeY = (changeY - 1) ;
            NumberItem.renderText(this.firstLi,this.showNextValue);
            NumberItem.renderText(this.secondLi,this.showCurValue);
        }else if(diffDistance === 0){
            NumberItem.renderText(this.firstLi,this.showCurValue);
        }else{
            NumberItem.renderText(this.firstLi,this.showCurValue);
            NumberItem.renderText(this.secondLi,this.showPrevValue);
        }
        NumberItem.setTransformStyle(this.scroller,`translateY(${changeY * 50}%)`);
    }
}

class NoNumberItem{
    constructor(context,value){
        this.context = context;
        this.value = value;
    }
}


var DomItem = (context,value,options)=>{
    if(NUMBER_REG.test(value)){
        return new NumberItem(context,value,options);
    }
    return new NoNumberItem(context,value,options);
};

const merge = Object.assign;
const DEFAULT_OPTIONS = {
    transitionTime:300
};


class DomNumber{
    constructor(selector,options){
        this.dom = document.querySelector(selector);
        const mergeOptions = merge({width:this.dom.offsetWidth,height:this.dom.offsetHeight},DEFAULT_OPTIONS,options);
        const{value,unitWidth,height,width,transitionTime,itemMargin} = mergeOptions;
        this.height = height;
        this.width = width;
        this.animateId = null;
        this.transitionTime= transitionTime;
        this.value = value;
        this.generateNumberItems(value);
        this.animateTimeStamp = null;
        this.animate = this.animate.bind(this);
        
    }
    generateDomItem(val,index,maxValue,baseRange,newBornFlag){
        return DomItem(this,val,{
            index,
            parentDom:this.dom,
            newBornFlag,
            transitionTime:this.transitionTime,
            baseRange:baseRange,
            maxValue
        });
    }
    generateNumberItems(val=''){
        const valStr = (parseInt(val)+'').split('');
        const valStrLenMinus1 = valStr.length - 1;
        
        this.items = valStr.map((value,index)=>{
            const maxValue = 10;
            const baseRange = Math.pow(maxValue,(valStrLenMinus1 - index));
            return this.generateDomItem(val,index,maxValue,baseRange).mount();
        });
    }
    animate(tm){
        if(this.animateTimeStamp == null){
            this.animateTimeStamp = tm;
            window.requestAnimationFrame(this.animate);
            return;
        }
        let diff = tm - this.animateTimeStamp;
        let stopFlag = false;
        if(diff >= this.transitionTime){
            this.animateTimeStamp = null;
            stopFlag = true;
            diff = this.transitionTime;
            this.items = this.items.filter((item)=>{
                return !item.disappearFlag
            });
        }
        /**
         * 
         */
        this.render(diff,stopFlag);

        if(stopFlag){
            this.animateId = null;
            return;
        }
        this.animateId = window.requestAnimationFrame(this.animate);
    }
    start(){
        this.render();
        if(this.value){
            this.animateId = window.requestAnimationFrame(this.animate);
        }
    }
    update(value){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.render(this.transitionTime,true);
        }
        const valStr = (parseInt(value)+'').split('');
        const itemsLen = this.items.length;
        const valStrLen = valStr.length;
        const diffLen = valStrLen - itemsLen;
        let newItems;
        if(diffLen > 0){
            newItems = [];
            const valStrLenMinus1 = valStrLen - 1;
            for(let i = 0; i < diffLen; i++){
                const maxValue = 10;
                const baseRange = Math.pow(maxValue,(valStrLenMinus1 - i));
                newItems.push(this.generateDomItem(value,i,maxValue,baseRange,true).mount(true));
            }
        }else if(diffLen < 0){
            for(let i = 0; i < -diffLen; i++){
                this.items[i].disappear();
            }
        }
        this.items.forEach((item)=>{
            item.update(value);
        });
        if(newItems){
            this.items = newItems.concat(this.items);
        }
        if(value !== this.value){
            this.animateId = window.requestAnimationFrame(this.animate);
            this.value = value;
        }
    }
    render(tm,flag){
        this.items.forEach((item,index)=>{
            if(tm){
                item.move(tm,flag);
            }
            item.render();
        });
        // ctx.fillText('370911',0,0);
    }
}

class Canvas{
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

const NUMBER_REG$1 = new RegExp("[0-9]");


class NumberItem$1{
    constructor(context,value,options){
        this.context = context;
        this.value = 0;
        this.index = options.index;
        this.color = options.color;
        this.margin = options.margin || 0;
        this.baseRange = options.baseRange;
        this.maxValue = options.maxValue || 10;
        this.height = options.height + this.margin;
        this.backgroundColor = options.backgroundColor || '';
        this.diffDistance = 0;
        this.moveY = 0;
        this.moveRatio = 1;
        this.disappearFlag = false;
        this.newBornFlag = options.newBornFlag || false;
        this.showCurValue = 0;
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
        this.update(value);
    }
    static floor(val){
        if(val < 0){
            return -(Math.floor(-val))
        }
        return Math.floor(val);
    }
    update(value=0){
        const dividedValue = NumberItem$1.floor(value / this.baseRange);
        let diff = dividedValue - this.value;
        this.diffDistance = diff;
        this.value = dividedValue;
        this.originCurValue = this.showCurValue ;
    }
    processNumber(value,diff){
        let ret = NumberItem$1.floor((value + diff) % this.maxValue);
        if(ret < 0){
            return this.maxValue + ret;
        }
        return ret;
    }
    add(value,diff){
        let fValue = value + diff;
        if(fValue >= this.maxValue){
            return 0;
        }else if(fValue < 0){
            return this.maxValue - 1
        }
        return fValue
    }
    updateValue(changeY){
        let integerDistance = NumberItem$1.floor(changeY);
        this.showCurValue = this.processNumber(this.originCurValue,integerDistance );
        
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
    }
    move(tm,stopFlag){
        let distance;
        const {transitionTime} = this.context;
        if(stopFlag && this.newBornFlag){
            this.newBornFlag = false;
        }
        if(this.diffDistance === 0){
            return
        }
        
        // else if(this.diffDistance > 0){
        //     distance = Tween.easeOutElastic(tm,0,this.diffDistance,this.context.transitionTime);
        // }
        else{
            //easeOutElastic
            distance= Tween.linear(tm,0,this.diffDistance,transitionTime);

        }
        this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        this.moveY = distance;
        this.updateValue(distance);
    }
    getUnitWidth(val){
        if(this.disappearFlag && this.moveRatio != null){
            return Math.floor(val * this.moveRatio)
        }
        if(this.newBornFlag && this.moveRatio != null){
            return Math.floor(val * (1 - this.moveRatio))
        }
        return val;
    }
    disappear(){
        this.disappearFlag = true;
    }
    static renderText(ctx,content,x,y){
        if(content != null && content >= 0){
            ctx.fillText(content,x,y);
        }
    } 
    fillBackground(ctx,x,rectWidth,rectHeight){
        if(this.backgroundColor){
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(x,0,rectWidth,rectHeight);
        }
    }
    render(ctx,x,fillX,y,rectWidth,rectHeight){
        const{height,diffDistance} = this;
        const changeY = this.moveY % 1 * (this.height);
        // console.log(this.showPrevValue,this.showCurValue,this.showNextValue,changeY);
        if(this.disappearFlag){
            ctx.save();
            ctx.scale(this.moveRatio,1);
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
            ctx.globalAlpha = this.moveRatio;
        }else if(this.newBornFlag){
            let newRatio = 1 - this.moveRatio;
            ctx.save();
            ctx.scale(newRatio,1);
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
            ctx.globalAlpha = newRatio;
        }else{
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
        }
        ctx.fillStyle = this.color;
        (diffDistance > 0) && NumberItem$1.renderText(ctx,this.showNextValue,x,y+changeY-height);
        NumberItem$1.renderText(ctx,this.showCurValue,x,y+changeY);
        (diffDistance < 0) && NumberItem$1.renderText(ctx,this.showPrevValue,x,y+changeY+height);
        if(this.disappearFlag || this.newBornFlag){
            ctx.restore();
        }
    }
}

class NoNumberItem$1{
    constructor(context,value){
        this.context = context;
        this.value = value;
    }
}


var CanvasItem = (context,value,options)=>{
    if(NUMBER_REG$1.test(value)){
        return new NumberItem$1(context,value,options);
    }
    return new NoNumberItem$1(context,value,options);
};

const merge$1 = Object.assign;
const DEFAULT_OPTIONS$1 = {
    transitionTime:300
};


class NumberScroll{
    constructor(selector,options){
        this.dom = document.querySelector(selector);
        const mergeOptions = merge$1({width:this.dom.offsetWidth,height:this.dom.offsetHeight},DEFAULT_OPTIONS$1,options);
        const{value,unitWidth,height,width,transitionTime,itemMargin,itemBackgroundColor,backgroundColor,color} = mergeOptions;
        this.height = height;
        this.baseLineHeight = this.height / 2;
        this.width = width;
        this.itemMargin = itemMargin;
        this.animateId = null;
        this.transitionTime= transitionTime;
        this.unitWidth = unitWidth;
        this.value = value;
        this.canvas = new Canvas(mergeOptions);
        this.canvas.mount(this.dom);
        this.color = color || 'black';
        this.itemBackgroundColor = this.getBackGroundColor(itemBackgroundColor);
        this.backgroundColor = this.getBackGroundColor(backgroundColor);
        this.generateNumberItems(value);
        this.animateTimeStamp = null;
        this.animate = this.animate.bind(this);
        
    }
    getBackGroundColor(value){
        if(value && typeof value === 'function'){
            return value(this.canvas.context);
        }
        return value;
    }
    static createLinearGradient(ctx,x1,y1,x2,y2,colors){
        var grad  = ctx.createLinearGradient(x1,y1,x2,y2);
        /* 指定几个颜色 */
        colors && colors.map((color)=>{
            grad.addColorStop(color.position,color.value);  
        });
        return grad;
    }
    generateCanvasItem(val,index,maxValue,baseRange,newBornFlag){
        return CanvasItem(this,val,{
            height:this.height,
            index,
            color:this.color,
            backgroundColor:this.itemBackgroundColor,
            margin:this.itemMargin,
            newBornFlag,
            transitionTime:this.transitionTime,
            baseRange:baseRange,
            maxValue
        });
    }
    generateNumberItems(val=''){
        const valStr = (parseInt(val)+'').split('');
        const valStrLenMinus1 = valStr.length - 1;
        
        this.items = valStr.map((value,index)=>{
            const maxValue = 10;
            const baseRange = Math.pow(maxValue,(valStrLenMinus1 - index));
            return this.generateCanvasItem(val,index,maxValue,baseRange);
        });
    }
    animate(tm){
        if(this.animateTimeStamp == null){
            this.animateTimeStamp = tm;
            window.requestAnimationFrame(this.animate);
            return;
        }
        let diff = tm - this.animateTimeStamp;
        let stopFlag = false;
        if(diff >= this.transitionTime){
            this.animateTimeStamp = null;
            stopFlag = true;
            diff = this.transitionTime;
            this.items = this.items.filter((item)=>{
                return !item.disappearFlag
            });
        }
        /**
         * 
         */
        this.render(diff,stopFlag);

        if(stopFlag){
            this.animateId = null;
            return;
        }
        this.animateId = window.requestAnimationFrame(this.animate);
    }
    start(){
        this.render();
        if(this.value){
            this.animateId = window.requestAnimationFrame(this.animate);
        }
    }
    update(value){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.render(this.transitionTime,true);
        }
        const valStr = (parseInt(value)+'').split('');
        const itemsLen = this.items.length;
        const valStrLen = valStr.length;
        const diffLen = valStrLen - itemsLen;
        let newItems;
        if(diffLen > 0){
            newItems = [];
            const valStrLenMinus1 = valStrLen - 1;
            for(let i = 0; i < diffLen; i++){
                const maxValue = 10;
                const baseRange = Math.pow(maxValue,(valStrLenMinus1 - i));
                newItems.push(this.generateCanvasItem(value,i,maxValue,baseRange,true));
            }
        }else if(diffLen < 0){
            for(let i = 0; i < -diffLen; i++){
                this.items[i].disappear();
            }
        }
        this.items.forEach((item)=>{
            item.update(value);
        });
        if(newItems){
            this.items = newItems.concat(this.items);
        }
        if(value !== this.value){
            this.animateId = window.requestAnimationFrame(this.animate);
            this.value = value;
        }
    }
    render(tm,flag){
        const ctx = this.canvas.context;
        if(this.backgroundColor){
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0,0,this.width,this.height);
        }else{
            ctx.clearRect(0,0,this.width,this.height);
        }
        ctx.textAlign="center";
        ctx.font="92px Arial";
        // ctx.textBaseline = "hanging";
        ctx.textBaseline = "middle";
        let startX = 0;
        this.items.forEach((item,index)=>{
            if(tm){
                item.move(tm,flag);
            }
            item.render(ctx,startX+this.unitWidth / 2,startX,this.baseLineHeight,this.unitWidth,this.height);
            startX += item.getUnitWidth(this.unitWidth);
        });
        // ctx.fillText('370911',0,0);
    }
}

exports.DomNumber = DomNumber;
exports['default'] = NumberScroll;

Object.defineProperty(exports, '__esModule', { value: true });

})));
