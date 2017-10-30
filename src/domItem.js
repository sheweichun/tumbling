
import Tween from './tween';
const NUMBER_TYPE = 0;
const NO_NUMBER_TYPE = 1;
const NUMBER_REG = new RegExp("[0-9]")


export class BaseItem{
    constructor(context,value,options){
        this.context = context;
        this.value = value;
        this.visible = false;
        this.wrapper = null;
        this.moveRatio = 1;
        this.animationFlag = options.animationFlag || true;
        this.parentDom = options.parentDom;
        this.newBornFlag = options.newBornFlag || false;
        this.appearAnimation = options.appearAnimation;
        this.disappearAnimation = options.disappearAnimation;
        this.disappearFlag = false;
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
            this.wrapper.style.position = 'relative';
            this.wrapper.style.visibility = 'visible';
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
        this.index = options.index;
        this.parentDom = options.parentDom;
        this.baseRange = options.baseRange;
        this.tween = NumberItem.parseTween(options.tween);
        this.diffDistance = 0;
        this.maxValue = options.maxValue || 10;
        this.moveY = 0;
        this.renderItem = options.renderItem;
        this.showCurValue = 0;
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
        this.update(value);
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
    mount(dom){
        let wrapper = document.createElement('div');
        let scroller = document.createElement('ul');
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'absolute';
        wrapper.style.overflow = 'hidden';
        wrapper.style.verticalAlign = 'top';
        wrapper.style.visibility = 'hidden';
        wrapper.innerHTML = `
            <span style="visibility:hidden;">${this.renderItem ? this.renderItem(9) : 9}</span>
            <ul style="position:absolute;top:0;margin:0;padding:0;left:0;list-style:none;text-align: center;width:100%;">
                <li>${this.showCurValue}</li>
                <li></li>
            </ul>
        `;
        dom.appendChild(wrapper);
        this.wrapper = wrapper;
        this.wrapper.visible = false;
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
        if(tm === transitionTime){
            distance = this.diffDistance;
        }else{
            distance= this.tween(tm,0,this.diffDistance,transitionTime);
        }
        // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        this.moveRatio = (transitionTime - tm) / transitionTime;
        this.moveY = distance;
        this.updateValue(distance);
    }
    remove(){
        if(this.parentDom && this.wrapper){
            this.parentDom.removeChild(this.wrapper);
            this.wrapper = null;
        }
    }
    static renderText(el,content){
        let html = '';
        if(content != null && content >= 0){
            html =  content+''
        }
        if(this.renderItem){
            html = this.renderItem(html);
        }
        el.innerHTML = html
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
        this.animateRender();
        if(diffDistance > 0){
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

class NoNumberItem extends BaseItem{
    constructor(context,value,options){
        super(context,value,options);
    }
    mount(dom){
        let wrapper = document.createElement('div');
        wrapper.style.display = 'inline-block';
        wrapper.style.position = 'absolute';
        wrapper.style.verticalAlign = 'top';
        // wrapper.style.visibility = 'hidden';
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