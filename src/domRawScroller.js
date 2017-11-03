
import DomRendable from './domRendable';
import DomItem from './domItem';
const merge = Object.assign;

export default class DomRawScroller extends DomRendable{
    constructor(selector,options){
        super(selector,options);
        const _this = this;
        const{thousand,effect} = options;
        _this.value = DomRawScroller.transformValue(_this.value);
        _this.stopImmediate = options.stopImmediate || false;
        _this.maxRandomStep = options.maxRandomStep || 100;
        _this.debounceRatio = options.debounceRatio || 0.3;
        _this.stopFlag = false;
        _this.onStop= options.onStop;
        _this.options = options;
        _this.generateRawItems(_this.value);
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
        const _this = this;
        const fragment = document.createDocumentFragment();
        _this.items = value.map((itemValue,index)=>{
            itemValue.step = itemValue.step || (Math.floor(Math.random() * _this.maxRandomStep));
            return DomItem(_this,itemValue.step,merge({},_this.options,{
                index,
                baseRange:1,
                maxValue:itemValue.maxValue || 10
            }),true).mount(fragment);
        });
        _this.dom.appendChild(fragment);
    }
    updateItems(getNewValue){
        getNewValue = getNewValue || DomRawScroller.addValue;
        const _this = this;
        _this.value.forEach((itemValue,index)=>{
            const curItem = _this.items[index];
            // curItem.update(curItem.value + itemValue.step);
            curItem.update(getNewValue(curItem,itemValue));
            curItem.value = curItem.value % curItem.maxValue;
        });
    }
    static addValue(curItem,itemValue){
        return curItem.value + itemValue.step;
    }
    animateStop(timestamp){
        const _this = this;
        if(_this.stopFlag){
            _this.onStop && _this.onStop(_this.items.map((item)=>{
                // console.log(item.showCurValue);
                return item.value % item.maxValue;
            },_this))
            return;
        }
        if(timestamp){
            _this.updateItems();
            _this.animateTimeStamp = timestamp;
            _this.animateId = window.requestAnimationFrame(_this.animate);
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
    afterStartComplete(){
        this.updateItems();
    }
    stop(){
        const _this = this;
        if(_this.stopFlag) return;
        _this.stopFlag = true;
        if(_this.animateId){
            window.cancelAnimationFrame(_this.animateId);
            _this.animateId = null;
            _this.render(_this.transitionTime,true);
            if(_this.stopImmediate){
                _this.animateStop();
                return;
            }
            _this.updateItems((curItem,itemValue)=>{
                return curItem.value + Math.floor(itemValue.step * _this.debounceRatio);
            })
            _this.animateId = window.requestAnimationFrame(_this.animate);
        }
    }
}