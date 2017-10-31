

import DomRendable from './domRendable';
import DomItem from './domItem';
import {NUMBER_REG} from './util';
const merge = Object.assign;

class Countdown extends DomRendable{
    static ADD = 0
    static MINUS = 1
    constructor(selector,options){
        super(selector,options);
        this.options = options;
        this.direction = options.direction ||  Countdown.ADD;
        this.init(this.value);
    }
    init(value){
        const valStrArr = (value+'').split('');
        const fragment = document.createDocumentFragment();
        let numberIndex = 0;
        this.items = valStrArr.map((val,index)=>{
            const isNumber = NUMBER_REG.test(val);
            const itemValue = isNumber ? parseInt(val) : val;
            const item = DomItem(this,itemValue,merge({},this.options,{
                index,
                rawDirection:this.direction === Countdown.ADD ? 1 : -1,
                rawMode:true
            }),isNumber);
            if(isNumber){
                numberIndex++;
            }
            return item.mount(fragment);
        });
        this.dom.appendChild(fragment);
    }
    update(value){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.render(this.transitionTime,true);
        }
        if(value !== this.value){
            const valStrArr = (value+'').split('');
            valStrArr.forEach((val,index)=>{
                const curItem = this.items[index];
                if(curItem.isNumber){
                    let updateVal = parseInt(val);
                    curItem.update(updateVal);
                }
            })
            this.animateId = window.requestAnimationFrame(this.animate)
            this.value = value;
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