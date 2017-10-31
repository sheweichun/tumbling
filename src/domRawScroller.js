
import DomRendable from './domRendable';
import DomItem from './domItem';
const merge = Object.assign;

export default class DomRawScroller extends DomRendable{
    constructor(selector,options){
        super(selector,options);
        const{thousand,effect} = options;
        this.value = DomRawScroller.transformValue(this.value);
        this.stopImmediate = options.stopImmediate || false;
        this.maxRandomStep = options.maxRandomStep || 100;
        this.debounceRatio = options.debounceRatio || 0.3;
        this.stopFlag = false;
        this.onStop= options.onStop;
        this.options = options;
        this.generateRawItems(this.value);
    }
    static transformValue(value){
        if(typeof value !== 'object'){
            let newValue = [];
            for(let i = 0; i < value; i++){
                newValue.push({})
            }
            return newValue
        }
        return value;
    }
    generateRawItems(value){
        const fragment = document.createDocumentFragment();
        this.items = value.map((itemValue,index)=>{
            itemValue.step = itemValue.step || (Math.floor(Math.random() * this.maxRandomStep));
            return DomItem(this,itemValue.step,merge({},this.options,{
                index,
                baseRange:1,
                maxValue:itemValue.maxValue || 10
            }),true).mount(fragment);
        });
        this.dom.appendChild(fragment);
    }
    animateStop(timestamp){
        if(this.stopFlag){
            this.onStop && this.onStop(this.items.map((item)=>{
                // console.log(item.showCurValue);
                return item.value % item.maxValue;
            },this))
            return;
        }
        if(timestamp){
            this.value.forEach((itemValue,index)=>{
                const curItem = this.items[index];
                curItem.update(curItem.value + itemValue.step);
                curItem.value = curItem.value % curItem.maxValue;
            });
            this.animateTimeStamp = timestamp;
            this.animateId = window.requestAnimationFrame(this.animate);
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
    beforeStart(){
        this.stopFlag = false;
    }
    stop(){
        this.stopFlag = true;
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.render(this.transitionTime,true);
            if(this.stopImmediate){
                this.animateStop();
                return;
            }
            this.value.forEach((itemValue,index)=>{
                const curItem = this.items[index];
                curItem.update(curItem.value + Math.floor(itemValue.step * this.debounceRatio));
            });
            this.animateId = window.requestAnimationFrame(this.animate);
        }
    }
}