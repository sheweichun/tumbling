
import DomRendable from './domRendable';
import DomItem from './domItem';
import {toThousands,NUMBER_REG} from './util';




export default class DomNumber extends DomRendable{
    constructor(selector,options){
        super(selector,options);
        const{thousand} = options;
        this.thousand = thousand;
        this.generateNumberItems(this.value);
    }
    generateDomItem(isNumber,val,index,maxValue,baseRange,newBornFlag){
        return DomItem(this,val,{
            index,
            parentDom:this.dom,
            tween:this.tween,
            renderItem:this.renderItem,
            appearAnimation:this.appearAnimation,
            disappearAnimation:this.disappearAnimation,
            animationFlag:this.animationFlag,
            newBornFlag,
            transitionTime:this.transitionTime,
            baseRange:baseRange,
            maxValue
        },isNumber);
    }
    generateNumberItems(val=''){
        const {valueStr,transformValueStr} = DomNumber.parseValue(val,this.thousand);
        const valStrLenMinus1 = valueStr.length - 1;
        const fragment = document.createDocumentFragment();
        this.strItems = {};
        let transformIndex = 0,domItems = [];
        valueStr.forEach((value,index)=>{
            const maxValue = 10;
            const baseRange = Math.pow(maxValue,valStrLenMinus1 - index);
            const transformCurVal = transformValueStr[transformIndex];
            let isNumber = NUMBER_REG.test(transformCurVal);
            if(!isNumber){
                const domItem = this.generateDomItem(false,transformCurVal,index,maxValue,baseRange).mount(fragment);
                this.strItems[(valStrLenMinus1 - transformIndex)] = domItem;
                // domItems.push(domItem);
                transformIndex++;
            }
            transformIndex++;
            domItems.push(this.generateDomItem(true,val,index,maxValue,baseRange).mount(fragment));
        })
        this.items = domItems;
        this.dom.appendChild(fragment);
    }
    update(value){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.clear();
            this.render(this.transitionTime,true);
        }
        const {valueStr,transformValueStr} = DomNumber.parseValue(value,this.thousand);
        const itemsLen = this.items.length;
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
                    if(!this.strItems[strIndex]){
                        const domItem =  this.generateDomItem(false,transformCurVal,i,maxValue,baseRange,true).mount(fragment);
                        this.strItems[strIndex] = domItem;
                    }
                    transformIndex++;
                }
                if(i < diffLen){
                    // console.log('push i');
                    newItems.push(this.generateDomItem(true,value,i,maxValue,baseRange,true).mount(fragment));
                }
                
                transformIndex++;
            }
            // console.log('newItems :',newItems.length);
            this.dom.insertBefore(fragment,this.dom.children[0]);
        }else if(diffLen < 0){
            for(let i = 0; i < -diffLen; i++){
                this.items[i].disappear()
            }
            for(let index in this.strItems){
                let tmpItem = this.strItems[index];
                if(NUMBER_REG.test(transformValueStr[index]) || index >= transformValueStr.length){
                    tmpItem.disappear();
                }
            }
        }
        this.items.forEach((item)=>{
            item.update(value)
        });
        if(newItems){
            this.items = newItems.concat(this.items);
        }
        if(value !== this.value){
            this.animateId = window.requestAnimationFrame(this.animate)
            this.value = value;
        }
    }
    clear(){
        this.items = this.items.filter((item)=>{
            if(item.disappearFlag){
                item.remove();
            }
            return !item.disappearFlag
        })
        for(let index in this.strItems){
            let curItem = this.strItems[index];
            if(curItem.disappearFlag){
                curItem.remove();
                delete this.strItems[index];
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
    render(tm,flag){
        this.items.forEach((item,index)=>{
            if(tm){
                item.move(tm,flag);
            }
            item.render();
        });
        for(let index in this.strItems){
            let curItem = this.strItems[index];
            curItem.move(tm,flag);
            curItem.render();
        }
        // ctx.fillText('370911',0,0);
    }
}