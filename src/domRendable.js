
const merge = Object.assign;
const DEFAULT_OPTIONS = {
    // transitionTime:300
}
import TumblingRender from './tumblingRender';
export default class DomRendable{
    constructor(selector,options){
        const mergeOptions = merge({},DEFAULT_OPTIONS,options);
        this.dom = document.querySelector(selector);
        const{renderItem,animationRender,appearAnimation,disappearAnimation,animationFlag,tween,effect} = mergeOptions;
        this.animateTimeStamp = null;
        this.animateId = null;
        this.effect = effect || TumblingRender;
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
    clear(){

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
            stopFlag = true;
            diff = this.transitionTime;
            this.animateTimeStamp = null;
            this.clear();
        }
        /**
         * 
         */
        this.render(diff,stopFlag);
        
        if(stopFlag){
            this.animateStop && this.animateStop(tm);
            this.animateId = null;
            return;
        }
        this.animateId = window.requestAnimationFrame(this.animate)
    }
    complete(){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.clear();
            this.render(this.transitionTime,true);
        }
    }
    render(){

    }
    start(){
        this.beforeStart && this.beforeStart();
        if(!this.startedFlag){
            this.startedFlag = true
        }else{
            this.complete();
        }
        if(this.value){
            // console.log('request');
            this.animateId = window.requestAnimationFrame(this.animate)
        }
        
    }
}