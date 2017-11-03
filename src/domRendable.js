import Tween from './tween';
const merge = Object.assign;
const DEFAULT_OPTIONS = {
    // transitionTime:300
}
import TumblingRender from './tumblingRender';
export default class DomRendable{
    constructor(selector,options){
        const mergeOptions = merge({},DEFAULT_OPTIONS,options);
        const _this = this;
        const rootDom = DomRendable.parseDom(selector);
        _this.rootDom = rootDom;
        const dom = document.createElement('div');
        dom.className = 'tumbling-container';
        rootDom.appendChild(dom);
        _this.dom = dom;
        const{renderItem,animationRender,appearAnimation,disappearAnimation,animationFlag,tween,effect} = mergeOptions;
        _this.animateTimeStamp = null;
        _this.animateId = null;
        _this.effect = effect || TumblingRender;
        _this.value = options.value;
        _this.startedFlag = false;
        _this.transitionTime = options.transitionTime || 300;
        _this.renderItem = renderItem;   
        _this.tween = DomRendable.parseTween(tween);                                           
        _this.appearAnimation = appearAnimation;
        _this.animationRender = animationRender;
        _this.disappearAnimation = disappearAnimation;
        _this.animationFlag = animationFlag;
        _this.animate = _this.animate.bind(_this);
    }
    static parseDom(selector){
        if(typeof selector === 'string'){
            return document.querySelector(selector);
        }
        return selector;
    }
    changeTween(tween){
        this.tween = DomRendable.parseTween(tween);
    }
    static parseTween(tween){
        if(!tween){
            return Tween.linear;
        }
        if(typeof tween === 'function'){
            return tween
        }
        return Tween[tween];
    }
    clear(){

    }
    animate(tm){
        const _this = this;
        if(_this.animateTimeStamp == null){
            _this.animateTimeStamp = tm;
            window.requestAnimationFrame(_this.animate);
            return;
        }
        let diff = tm - _this.animateTimeStamp;
        let stopFlag = false;
        if(diff >= _this.transitionTime){
            stopFlag = true;
            diff = _this.transitionTime;
            _this.animateTimeStamp = null;
            _this.clear();
        }
        /**
         * 
         */
        _this.render(diff,stopFlag);
        
        if(stopFlag){
            _this.animateStop && _this.animateStop(tm);
            _this.animateId = null;
            return;
        }
        _this.animateId = window.requestAnimationFrame(_this.animate)
    }
    complete(){
        const _this = this;
        if(_this.animateId){
            window.cancelAnimationFrame(_this.animateId);
            _this.animateId = null;
            _this.clear();
            _this.render(_this.transitionTime,true);
        }
    }
    render(){

    }
    start(){
        const _this = this;
        if(_this.animateId){
            return;
        }
        _this.beforeStart && _this.beforeStart();
        // if(!_this.startedFlag){
        //     _this.startedFlag = true
        // }else{
        //     _this.complete();
        //     _this.afterStartComplete && _this.afterStartComplete();
        // }
        if(_this.value){
            // console.log('request');
            _this.animateId = window.requestAnimationFrame(_this.animate)
        }
        
    }
}