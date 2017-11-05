
import DomRendable from './domRendable';
import DomItem from './domItem';
import {toThousands,NUMBER_REG} from '../util';

const merge = Object.assign;


export default class DomNumber extends DomRendable{
    constructor(selector,options){
        super(selector,options);
        const{thousand,effect} = options;
        const _this = this;
        _this.thousand = thousand;
        _this.options = options;
        _this.generateNumberItems(_this.value);
    }
    generateDomItem(isNumber,val,index,maxValue,baseRange,newBornFlag){
        const _this = this;
        return DomItem(_this,val,merge({},_this.options,{
            index,
            newBornFlag,
            baseRange:baseRange,
            maxValue
        }),isNumber);
    }
    generateNumberItems(val=''){
        const _this = this;
        const {valueStr,transformValueStr} = DomNumber.parseValue(val,_this.thousand);
        const valStrLenMinus1 = valueStr.length - 1;
        const fragment = document.createDocumentFragment();
        _this.strItems = {};
        let transformIndex = 0,domItems = [];
        valueStr.forEach((value,index)=>{
            const maxValue = 10;
            const baseRange = Math.pow(maxValue,valStrLenMinus1 - index);
            const transformCurVal = transformValueStr[transformIndex];
            let isNumber = NUMBER_REG.test(transformCurVal);
            if(!isNumber){
                const domItem = _this.generateDomItem(false,transformCurVal,index,maxValue,baseRange).mount(fragment);
                _this.strItems[(valStrLenMinus1 - transformIndex)] = domItem;
                // domItems.push(domItem);
                transformIndex++;
            }
            transformIndex++;
            domItems.push(_this.generateDomItem(true,val,index,maxValue,baseRange).mount(fragment));
        })
        _this.items = domItems;
        _this.dom.appendChild(fragment);
    }
    update(value,options){
        super.update(options);
        const _this = this;
        _this.complete();
        if(value !== _this.value){
            const {valueStr,transformValueStr} = DomNumber.parseValue(value,_this.thousand);
            const itemsLen = _this.items.length;
            const valStrLen = valueStr.length;
            
            const diffLen = valStrLen - itemsLen;
            let newItems;
            if(diffLen > 0){
                newItems = [];
                const fragment = document.createDocumentFragment();
                const valStrLenMinus1 = valStrLen - 1;
                let transformIndex = 0,strIndex;
                for(let i = 0; i < valStrLen; i++){
                    const maxValue = 10;
                    const baseRange = Math.pow(maxValue,valStrLenMinus1 - i);
                    const transformCurVal = transformValueStr[transformIndex];
                    let isNumber = NUMBER_REG.test(transformCurVal);
                    strIndex = (valStrLenMinus1 - transformIndex);
                    if(!isNumber){
                        if(!_this.strItems[strIndex]){
                            const domItem =  _this.generateDomItem(false,transformCurVal,i,maxValue,baseRange,true).mount(fragment);
                            _this.strItems[strIndex] = domItem;
                        }
                        transformIndex++;
                    }
                    if(i < diffLen){
                        newItems.push(_this.generateDomItem(true,value,i,maxValue,baseRange,true).mount(fragment));
                    }
                    
                    transformIndex++;
                }
                _this.dom.insertBefore(fragment,_this.dom.children[0]);
            }else if(diffLen < 0){
                for(let i = 0; i < -diffLen; i++){
                    _this.items[i].disappear()
                }
                for(let index in _this.strItems){
                    let tmpItem = _this.strItems[index];
                    if(NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length){
                        tmpItem.disappear();
                    }
                }
            }
            _this.items.forEach((item)=>{
                item.update(value)
            });
            if(newItems){
                _this.items = newItems.concat(_this.items);
            }
            _this.animateId = window.requestAnimationFrame(_this.animate)
            _this.value = value;
        }
    }
    clear(){
        const _this = this;
        _this.items = _this.items.filter((item)=>{
            if(item.disappearFlag){
                item.remove();
            }
            return !item.disappearFlag
        })
        for(let index in _this.strItems){
            let curItem = _this.strItems[index];
            if(curItem.disappearFlag){
                curItem.remove();
                delete _this.strItems[index];
            }
            
        }
    }
    static parseValue(val,thousandFlag){
        const integerVal = parseInt(val);
        let valueStr = (''+integerVal).split(''),transformValueStr=valueStr;
        if(thousandFlag){
            transformValueStr = toThousands(integerVal).split('');
        }
        return {
            valueStr:valueStr,
            transformValueStr:transformValueStr
        }
    }
}