

import {setTransformStyle} from './util';
const CLASSNAME_PREFIX = 'tumbling-wrapper';

class FlipRender{
    static HORIZONTAL = 1
    static VERTICAL = 2
    constructor(context,options){
        this.context = context;
        let rotateDirection = options.rotateDirection || FlipRender.VERTICAL;
        if(rotateDirection === FlipRender.VERTICAL){
            this.rotateName = 'rotateY'
        }else{
            this.rotateName = 'rotateX'
        }
        this.renderItem = options.renderItem;
        this.wrapper = null;
        this.scroller = null;
        this.firstLi = null;
        this.secondLi = null;
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
        const{showCurValue} = this.context;
        this.wrapper = wrapper;
        wrapper.className = CLASSNAME_PREFIX+' tumblingFlip-wrapper';
        wrapper.innerHTML = `
            <span class="tumbling-hidden-span">${this.renderItem ? this.renderItem(9) : 9}</span>
            <ul class="tumbling-scroller">
                <li>${this.renderItem ? this.renderItem(showCurValue) : showCurValue}</li>
                <li></li>
            </ul>
        `;
        this.scroller = wrapper.children[wrapper.children.length - 1];
        this.firstLi = this.scroller.children[0];
        this.secondLi = this.scroller.children[1];
    }
    getRotateStyle(deg){
        return `${this.rotateName}(${deg}deg)`;
    }
    render(diffDistance,changeY){
        if(diffDistance === 0) return;
        const{showNextValue,showCurValue,showPrevValue} = this.context;
        if(diffDistance > 0){
            FlipRender.renderText(this.firstLi,showNextValue,this.getRotateStyle(-180 * (1 - changeY)));
            FlipRender.renderText(this.secondLi,showCurValue,this.getRotateStyle(180 * changeY));
        }else{
            FlipRender.renderText(this.firstLi,showCurValue,this.getRotateStyle(-180 * changeY));
            FlipRender.renderText(this.secondLi,showPrevValue,this.getRotateStyle(180 * (1 + changeY)));
        }
    }
}

export default FlipRender;