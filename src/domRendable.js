
const merge = Object.assign;
const DEFAULT_OPTIONS = {
    // transitionTime:300
}

export default class DomRendable{
    constructor(selector,options){
        const mergeOptions = merge({},DEFAULT_OPTIONS,options);
        this.dom = document.querySelector(selector);
        const{renderItem,appearAnimation,disappearAnimation,animationFlag,tween} = mergeOptions;
        this.animateTimeStamp = null;
        this.animateId = null;
        this.value = options.value;
        this.transitionTime = options.transitionTime || 300;
        this.renderItem = renderItem;                                              
        this.appearAnimation = appearAnimation;
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
            this.animateTimeStamp = null;
            stopFlag = true;
            diff = this.transitionTime;
            this.clear();
        }
        /**
         * 
         */
        this.render(diff,stopFlag);

        if(stopFlag){
            this.animateId = null;
            return;
        }
        this.animateId = window.requestAnimationFrame(this.animate)
    }
    render(){

    }
    start(){
        this.render();
        if(this.value){
            this.animateId = window.requestAnimationFrame(this.animate)
        }
    }
}