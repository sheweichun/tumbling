

import {setTransformStyle} from './util';
const CLASSNAME_PREFIX = 'tumbling-wrapper';

class TumblingRender{
    constructor(context,options){
        this.context = context;
        this.renderItem = options.renderItem;
        this.wrapper = null;
        this.scroller = null;
        this.firstLi = null;
        this.secondLi = null;
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
    mount(wrapper){
        this.wrapper = wrapper;
        wrapper.className = CLASSNAME_PREFIX;
        wrapper.innerHTML = `
            <span class="tumbling-hidden-span">${this.renderItem ? this.renderItem(9) : 9}</span>
            <ul class="tumbling-scroller">
                <li>${this.renderItem ? this.renderItem(this.showCurValue) : this.showCurValue}</li>
                <li></li>
            </ul>
        `;
        this.scroller = wrapper.children[wrapper.children.length - 1];
        this.firstLi = this.scroller.children[0];
        this.secondLi = this.scroller.children[1];
    }
    render(diffDistance,changeY){
        const{showNextValue,showCurValue,showPrevValue} = this.context;
        if(diffDistance > 0){
            changeY = (changeY - 1) ;
            TumblingRender.renderText(this.firstLi,showNextValue);
            TumblingRender.renderText(this.secondLi,showCurValue);
        }else if(diffDistance === 0){
            TumblingRender.renderText(this.firstLi,showCurValue);
        }else{
            TumblingRender.renderText(this.firstLi,showCurValue);
            TumblingRender.renderText(this.secondLi,showPrevValue);
        }
        setTransformStyle(this.scroller,`translateY(${changeY * 100}%)`);
    }
}

export default TumblingRender;