

import {setTransformStyle} from '../util/index';
const CLASSNAME_PREFIX = 'tumbling-wrapper';

const FLIP_CONSTANT = 180;

class FlipEffect{
    static HORIZONTAL = 1
    static VERTICAL = 2
    constructor(context,options){
        const _this = this;
        _this.context = context;
        let rotateDirection = options.rotateDirection || FlipEffect.VERTICAL;
        if(rotateDirection === FlipEffect.VERTICAL){
            _this.rotateName = 'rotateY'
        }else{
            _this.rotateName = 'rotateX'
        }
        _this.renderItem = options.renderItem;
        _this.wrapper = null;
        _this.scroller = null;
        _this.firstLi = null;
        _this.secondLi = null;
    }
    static renderText(el,content,style){
        let html = '';
        if(content != null && content >= 0){
            html =  content+''
        }
        if(this.renderItem){
            html = this.renderItem(html);
        }
        setTransformStyle(el,style);
        el.innerHTML = html
    } 
    mount(wrapper){
        const _this = this;
        const{showCurValue} = _this.context;
        _this.wrapper = wrapper;
        wrapper.className = CLASSNAME_PREFIX+' tumblingFlip-wrapper';
        wrapper.innerHTML = `<span class="tumbling-hidden-span">${_this.renderItem ? _this.renderItem(9) : 9}</span>
<ul class="tumbling-scroller">
<li>${_this.renderItem ? _this.renderItem(showCurValue) : showCurValue}</li>
<li></li>
</ul>`;
        _this.scroller = wrapper.children[wrapper.children.length - 1];
        _this.firstLi = _this.scroller.children[0];
        _this.secondLi = _this.scroller.children[1];
    }
    getRotateStyle(deg){
        return `${this.rotateName}(${deg}deg)`;
    }
    render(diffDistance,changeY){
        const _this = this;
        if(diffDistance === 0) return;
        const{showNextValue,showCurValue,showPrevValue} = this.context;
        if(diffDistance > 0){
            FlipEffect.renderText(_this.firstLi,showNextValue,_this.getRotateStyle(-FLIP_CONSTANT * (1 - changeY)));
            FlipEffect.renderText(_this.secondLi,showCurValue,_this.getRotateStyle(FLIP_CONSTANT * changeY));
        }else{
            FlipEffect.renderText(_this.firstLi,showCurValue,_this.getRotateStyle(-FLIP_CONSTANT * changeY));
            FlipEffect.renderText(_this.secondLi,showPrevValue,_this.getRotateStyle(FLIP_CONSTANT * (1 + changeY)));
        }
    }
}

export default FlipEffect;