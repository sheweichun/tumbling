<h3>
    <a href="./README-EN.md">English Document</a>
</h3>
<div align="center">
    <h2>Tumbling</h2>
    <p align="center">
        <p>Simple and Powerful Library for Number Changing with zero dependencies</p>
        <a href="https://sheweichun.github.io/tumbling/build/simple/#/">
            <b>Demos »</b>
        </a>
    </p>
</div>

### Contents
* [安装](#安装)
* [使用](#使用)
* [缓动函数](#tween所有的缓动函数)
* [本地开发](#本地开发)


#### 安装
* 通过 [`npm`](https://www.npmjs.com/get-npm)安装(推荐):

  ```console
  $ npm install tumbling
  ```
  *Tumbling支持es:next规范，支持tree-shaking*

* 或者直接在html中引入

  ```html
    <script src="https://path-to-project/dist/timnbling.min.js"></script>
  ```

#### 使用

##### new DomNumberTumbling(selector,options)(数值动画类)

<img src="./imgs/DomNumberTumbling.gif"/> 

```javascript
import {DomNumberTumbling} from 'tumbling';
import 'tumbling/index.css';
const domNumberTumbling = new DomNumberTumbling(el,options);
domNumberTumbling.start();
setInterval(()=>{
    domNumberTumbling.update(Math.floor(domNumberTumbling.value + Math.random() * 100),{
    })
},3000)
```

##### new DomCountdownTumbling(selector,options)(倒计时动画类)

<img src="./imgs/DomCountdownTumbling.gif"/> 

```javascript
import {DomCountdownTumbling,FlipEffect} from 'tumbling';
import 'tumbling/index.css';
const domCountdownTumbling = new DomCountdownTumbling(el,{
    transitionTime:800,
    effect:FlipEffect,
    rotateDirection:FlipRender.VERTICAL, //水平翻转还是垂直翻转
    value:formatDt(new Date()),
})
domCountdownTumbling.start();
setInterval(()=>{
    domCountdownTumbling.update(formatDt(new Date()))
},1000)
```
##### new DomRawTumbling(selector,options)(无限滚动类)


```javascript
import {DomRawTumbling} from 'tumbling';
import 'tumbling/index.css';
new DomRawTumbling(el,{
    transitionTime:3000,
    value:10,//十个坑位 或者 传入数组 [{step:步长,maxValue:最大值}]
    onStop:(value)=>{
        
    }
});
```
<h2>selector(Dom选择符)</h2>
selector -- pass `String` | `HTMLElement`,可以传dom选择符,也可以直接传入目标dom

<h2>options(配置)</h2>

* `effect`(default TumblingEffect) -- pass `Class` 效果接口，Tumbling还提供FlipEffect,开发者可以自定义,类似实现如下
```javascript

class AnyEffect{
    constructor(context,options){
        const _this = this;
        _this.context = context; //context 就是DomCountdownTumbling,DomNumberTumbling,DomRawTumbling
        _this.renderItem = options.renderItem;
        ...
    }
    mount(wrapper){  //必须有的方法,挂载dom
        ...
    }
    render(diffDistance,changeY){ //必须有的方法,改变dom样式
    }
}
```
具体可参考[FlipEffect的实现](./src/effects/flipEffect.js)

* `transitionTime`(default `300`) -- pass `Number` 动画时间
* `value` -- pass `Number` 要显示的数值
* `thousand` -- pass 'Boolean' 是否显示千分位
* `tween`(default `linear`) -- pass `String | Function` 支持传[缓动函数名](#tween)，也支持开发者自己实现function( t//当前耗时, b//起始位置, c//最终位置, d//动画时长)
* `renderItem` -- pass `Function` 单项渲染函数,函数签名function(value),value未当前值,value小于0表示站位符,填9(因为它最宽)
* `disappearAnimation` -- pass `Function` 单项消失动画函数,函数签名function(wrapper,ratio),wrapper为单项的根Dom元素,ratio为动画进度
* `appearAnimation` -- pass `Function` 同disappearAnimation一样,只不过是出现动画
* `onStop` -- pass `Function` DomRawTumbling独有的回调


#### tween所有的缓动函数

```javascript
{
    linear:function( t, b, c, d) {
      return (c - b) * (t / d) + b;
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
```


#### 本地开发

```sh
npm install
npm run dev
```