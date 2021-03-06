

import {setTransformStyle} from '../util/index';
const CLASSNAME_PREFIX = 'tumbling-wrapper';

class TumblingEffect{
    constructor(context,options){
        const _this = this;
        _this.context = context;
        _this.renderItem = options.renderItem;
        _this.wrapper = null;
        _this.scroller = null;
        _this.firstLi = null;
        _this.secondLi = null;
    }
    renderText(el,content){
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
        const _this = this;
        _this.wrapper = wrapper;
        wrapper.className = CLASSNAME_PREFIX;
        wrapper.innerHTML = `<span class="tumbling-hidden-span">${_this.renderItem ? _this.renderItem(-1) : 9}</span>
<ul class="tumbling-scroller">
<li>${_this.renderItem ? _this.renderItem(_this.showCurValue) : _this.showCurValue}</li>
<li></li>
</ul>`;
        _this.scroller = wrapper.children[wrapper.children.length - 1];
        _this.firstLi = _this.scroller.children[0];
        _this.secondLi = _this.scroller.children[1];
    }
    render(diffDistance,changeY){
        const _this = this;
        const{showNextValue,showCurValue,showPrevValue} = _this.context;
        if(diffDistance > 0){
            changeY = (changeY - 1) ;
            _this.renderText(_this.firstLi,showNextValue);
            _this.renderText(_this.secondLi,showCurValue);
        }else if(diffDistance === 0){
            _this.renderText(_this.firstLi,showCurValue);
        }else{
            _this.renderText(_this.firstLi,showCurValue);
            _this.renderText(_this.secondLi,showPrevValue);
        }
        setTransformStyle(_this.scroller,`translateY(${changeY * 100}%)`);
    }
}

export default TumblingEffect;