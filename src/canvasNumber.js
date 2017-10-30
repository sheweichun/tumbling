
import Canvas from './canvas';
import CanvasItem from './canvasItem';



const merge = Object.assign;
const DEFAULT_OPTIONS = {
    transitionTime:300
}


export default class NumberScroll{
    constructor(selector,options){
        this.dom = document.querySelector(selector);
        const mergeOptions = merge({width:this.dom.offsetWidth,height:this.dom.offsetHeight},DEFAULT_OPTIONS,options);
        const{value,unitWidth,height,width,transitionTime,itemMargin,itemBackgroundColor,backgroundColor,color} = mergeOptions;
        this.height = height;
        this.baseLineHeight = this.height / 2;
        this.width = width;
        this.itemMargin = itemMargin;
        this.animateId = null;
        this.transitionTime= transitionTime;
        this.unitWidth = unitWidth;
        this.value = value;
        this.canvas = new Canvas(mergeOptions);
        this.canvas.mount(this.dom);
        this.color = color || 'black';
        this.itemBackgroundColor = this.getBackGroundColor(itemBackgroundColor);
        this.backgroundColor = this.getBackGroundColor(backgroundColor);
        this.generateNumberItems(value);
        this.animateTimeStamp = null;
        this.animate = this.animate.bind(this);
        
    }
    getBackGroundColor(value){
        if(value && typeof value === 'function'){
            return value(this.canvas.context);
        }
        return value;
    }
    static createLinearGradient(ctx,x1,y1,x2,y2,colors){
        var grad  = ctx.createLinearGradient(x1,y1,x2,y2);
        /* 指定几个颜色 */
        colors && colors.map((color)=>{
            grad.addColorStop(color.position,color.value);  
        })
        return grad;
    }
    generateCanvasItem(val,index,maxValue,baseRange,newBornFlag){
        return CanvasItem(this,val,{
            height:this.height,
            index,
            color:this.color,
            backgroundColor:this.itemBackgroundColor,
            margin:this.itemMargin,
            newBornFlag,
            transitionTime:this.transitionTime,
            baseRange:baseRange,
            maxValue
        });
    }
    generateNumberItems(val=''){
        const valStr = (parseInt(val)+'').split('');
        const valStrLenMinus1 = valStr.length - 1;
        
        this.items = valStr.map((value,index)=>{
            const maxValue = 10;
            const baseRange = Math.pow(maxValue,(valStrLenMinus1 - index));
            return this.generateCanvasItem(val,index,maxValue,baseRange);
        })
    }
    animate(tm){
        if(this.animateTimeStamp == null){
            this.animateTimeStamp = tm;
            window.requestAnimationFrame(this.animate);
            return;
        }
        let diff = tm - this.animateTimeStamp;
        let stopFlag = false;
        if(diff >= this.transitionTime){
            this.animateTimeStamp = null;
            stopFlag = true;
            diff = this.transitionTime;
            this.items = this.items.filter((item)=>{
                return !item.disappearFlag
            })
        }
        /**
         * 
         */
        this.render(diff,stopFlag);

        if(stopFlag){
            this.animateId = null;
            return;
        }
        this.animateId = window.requestAnimationFrame(this.animate)
    }
    start(){
        this.render();
        if(this.value){
            this.animateId = window.requestAnimationFrame(this.animate)
        }
    }
    update(value){
        if(this.animateId){
            window.cancelAnimationFrame(this.animateId);
            this.animateId = null;
            this.render(this.transitionTime,true);
        }
        const valStr = (parseInt(value)+'').split('');
        const itemsLen = this.items.length;
        const valStrLen = valStr.length;
        const diffLen = valStrLen - itemsLen;
        let newItems;
        if(diffLen > 0){
            newItems = [];
            const valStrLenMinus1 = valStrLen - 1;
            for(let i = 0; i < diffLen; i++){
                const maxValue = 10;
                const baseRange = Math.pow(maxValue,(valStrLenMinus1 - i));
                newItems.push(this.generateCanvasItem(value,i,maxValue,baseRange,true))
            }
        }else if(diffLen < 0){
            for(let i = 0; i < -diffLen; i++){
                this.items[i].disappear()
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
    render(tm,flag){
        const ctx = this.canvas.context;
        if(this.backgroundColor){
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(0,0,this.width,this.height);
        }else{
            ctx.clearRect(0,0,this.width,this.height);
        }
        ctx.textAlign="center";
        ctx.font="92px Arial";
        // ctx.textBaseline = "hanging";
        ctx.textBaseline = "middle";
        let startX = 0;
        this.items.forEach((item,index)=>{
            if(tm){
                item.move(tm,flag);
            }
            item.render(ctx,startX+this.unitWidth / 2,startX,this.baseLineHeight,this.unitWidth,this.height);
            startX += item.getUnitWidth(this.unitWidth);
        })
        // ctx.fillText('370911',0,0);
    }
}