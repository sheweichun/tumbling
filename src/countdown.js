

import DomRendable from './domRendable';
import DomItem from './domItem';
import {NUMBER_REG} from './util';


class Countdown extends DomRendable{
    static ADD = 0
    static MINUS = 1
    constructor(selector,options){
        super(selector,options);
        this.format = [
            3,
            4,
            6,
            10,
            6,
            10
        ]
        this.direction = options.direction ||  Countdown.ADD;
        this.init(this.value);
    }
    init(value){
        const valStrArr = (value+'').split('');
        const fragment = document.createDocumentFragment();
        let numberIndex = 0;
        this.items = valStrArr.map((val,index)=>{
            const isNumber = NUMBER_REG.test(val);
            const item = DomItem(this,val,{
                index,
                parentDom:this.dom,
                tween:this.tween,
                renderItem:this.renderItem,
                appearAnimation:this.appearAnimation,
                disappearAnimation:this.disappearAnimation,
                animationFlag:this.animationFlag,
                transitionTime:this.transitionTime,
                baseRange:1,
                maxValue:parseInt(this.format[numberIndex])
            },isNumber);
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
        const valStrArr = (value+'').split('');
        valStrArr.forEach((val,index)=>{
            let updateVal = val;
            const curItem = this.items[index];
            if(this.direction === Countdown.ADD && updateVal < curItem.value){
                updateVal += curItem.maxValue;
            }
            else if(this.direction === Countdown.MINUS && updateVal > curItem.value){
                updateVal -= curItem.maxValue;
            }
            
            curItem.update(updateVal);
            curItem.value = curItem.value % curItem.maxValue;
        })
        if(value !== this.value){
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