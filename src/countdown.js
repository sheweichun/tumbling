

import DomRendable from './domRendable';
import DomItem from './domItem';
import {NUMBER_REG} from './util';
const merge = Object.assign;

class Countdown extends DomRendable{
    static ADD = 0
    static MINUS = 1
    constructor(selector,options){
        super(selector,options);
        const _this = this;
        _this.options = options;
        _this.direction = options.direction ||  Countdown.ADD;
        _this.init(this.value);
    }
    init(value){
        const _this = this;
        const valStrArr = (value+'').split('');
        const fragment = document.createDocumentFragment();
        let numberIndex = 0;
        _this.items = valStrArr.map((val,index)=>{
            const isNumber = NUMBER_REG.test(val);
            const itemValue = isNumber ? parseInt(val) : val;
            const item = DomItem(_this,itemValue,merge({},_this.options,{
                index,
                rawDirection:_this.direction === Countdown.ADD ? 1 : -1,
                rawMode:true
            }),isNumber);
            if(isNumber){
                numberIndex++;
            }
            return item.mount(fragment);
        });
        _this.dom.appendChild(fragment);
    }
    update(value){
        const _this = this;
        if(_this.animateId){
            window.cancelAnimationFrame(_this.animateId);
            _this.animateId = null;
            _this.render(_this.transitionTime,true);
        }
        if(value !== _this.value){
            const valStrArr = (value+'').split('');
            valStrArr.forEach((val,index)=>{
                const curItem = _this.items[index];
                if(curItem.isNumber){
                    let updateVal = parseInt(val);
                    curItem.update(updateVal);
                }
            })
            _this.animateId = window.requestAnimationFrame(_this.animate)
            _this.value = value;
        }
    }
    render(tm,flag){
        this.items.forEach((item,index)=>{
            if(tm){
                item.move(tm,flag);
            }
            item.render();
        });
    }
}

export default Countdown;