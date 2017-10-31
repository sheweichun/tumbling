
import Tween from './tween';
const NUMBER_TYPE = 0;
const NO_NUMBER_TYPE = 1;
const NUMBER_REG = new RegExp("[0-9]")


const CLASSNAME_PREFIX = 'tumbling-wrapper';

export class BaseItem{
    constructor(context,value,options){
        const{effect,appearAnimation,disappearAnimation,animationFlag,dom,renderItem,tween} = context;
        this.context = context;
        this.value = value;
        this.index = options.index;
        this.rawMode = options.rawMode || false;
        this.rawDirection = options.rawDirection || 1;
        this.visible = false;
        this.wrapper = null;
        this.effectController = new effect(this,options);
        this.moveRatio = 1;
        this.animationFlag = animationFlag || true;
        this.parentDom = dom;
        this.renderItem = renderItem;
        this.tween = BaseItem.parseTween(tween);;
        this.newBornFlag = options.newBornFlag || false;
        this.appearAnimation = appearAnimation;
        this.disappearAnimation = disappearAnimation;
        this.disappearFlag = false;
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
    getWrapperWidth(){
        if(!this.wrapperWidth){
            this.wrapperWidth = this.wrapper.offsetWidth;
            return this.wrapperWidth;
        }
        return this.wrapperWidth;
    }
    disappear(){
        this.disappearFlag = true;
    }
    animateRender(){
        if(!this.visible){
            this.wrapper.className += ` ${CLASSNAME_PREFIX}-visible`;
            this.visible = true;
            this.getWrapperWidth();
        }
        if(this.disappearFlag){
            if(this.disappearAnimation){
                this.disappearAnimation(this.wrapper,this.moveRatio);
            }else if(this.animationFlag){
                this.wrapper.style.width = `${this.wrapperWidth * this.moveRatio}px`;
                this.wrapper.style.opacity = this.moveRatio;
            }
            
        }else if(this.newBornFlag){
            let newRatio = 1 - this.moveRatio;
            if(this.appearAnimation){
                this.appearAnimation(this.wrapper,newRatio);
            }else if(this.animationFlag){
                this.wrapper.style.width = `${this.wrapperWidth * newRatio}px`;
                this.wrapper.style.opacity = newRatio;
            }
        }
    }
}

class NumberItem extends BaseItem{
    constructor(context,value,options){
        super(context,value,options);
        this.value = 0;
        this.isNumber = true;
        this.baseRange = options.baseRange;
        this.diffDistance = 0;
        this.maxValue = options.maxValue || 10;
        this.moveY = 0;
        this.showCurValue = 0;
        this.update(value);
    }
    mount(dom){
        let wrapper = document.createElement('div');
        this.effectController.mount(wrapper);
        this.wrapper = wrapper;
        this.visible = false;
        dom.appendChild(wrapper);
        return this;
    }
    static floor(val){
        if(val < 0){
            return -(Math.floor(-val))
        }
        return Math.floor(val);
    }
    update(value=0){
        if(this.rawMode){
            this.showPrevValue = this.showNextValue = value;
            if(value === this.value){
                this.diffDistance = 0;
                return;
            }
            this.diffDistance = this.rawDirection;
            this.value = value;
        }else{
            const dividedValue = NumberItem.floor(value / this.baseRange);
            let diff = dividedValue - this.value;
            this.diffDistance = diff;
            this.value = dividedValue;
            this.showPrevValue = this.add(this.showCurValue,-1);
            this.showNextValue = this.add(this.showCurValue,1);
            this.originCurValue = this.showCurValue ;
        }
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
    updateRawValue(changeY){
        if(changeY === 1 || changeY === -1){
            this.showCurValue = this.showPrevValue;
            this.showPrevValue = this.showNextValue = this.showCurValue;
        }
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
        if(tm === transitionTime){
            distance = this.diffDistance;
        }else{
            distance= this.tween(tm,0,this.diffDistance,transitionTime);
        }
        // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        this.moveRatio = (transitionTime - tm) / transitionTime;
        this.moveY = distance;
        if(this.rawMode){
            this.updateRawValue(distance);
        }else{
            this.updateValue(distance);
        }
    }
    remove(){
        if(this.parentDom && this.wrapper){
            this.parentDom.removeChild(this.wrapper);
            this.wrapper = null;
        }
    }
    render(){
        const{diffDistance} = this;
        if(diffDistance === 0) return;
        let changeY = this.moveY % 1;
        this.animateRender();
        this.effectController.render(diffDistance,changeY)
    }
}

class NoNumberItem extends BaseItem{
    constructor(context,value,options){
        super(context,value,options);
    }
    mount(dom){
        let wrapper = document.createElement('div');
        wrapper.className = CLASSNAME_PREFIX;
        wrapper.innerHTML = this.value;
        this.wrapper = wrapper;
        dom.appendChild(wrapper);
        return this;
    }
    remove(){
        if(this.parentDom && this.wrapper){
            this.parentDom.removeChild(this.wrapper);
            this.wrapper = null;
        }
    }
    move(tm,stopFlag){
        const {transitionTime} = this.context;
        this.moveRatio = (transitionTime - tm) / transitionTime;
    }
    update(){

    }
    render(){
        this.animateRender();
    }
}


export default (context,value,options,flag)=>{
    if(flag){
        return new NumberItem(context,value,options);
    }
    return new NoNumberItem(context,value,options);
}