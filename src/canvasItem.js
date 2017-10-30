
import Tween from './tween';
const NUMBER_TYPE = 0;
const NO_NUMBER_TYPE = 1;
const NUMBER_REG = new RegExp("[0-9]")


class NumberItem{
    constructor(context,value,options){
        this.context = context;
        this.value = 0;
        this.index = options.index;
        this.color = options.color;
        this.margin = options.margin || 0;
        this.baseRange = options.baseRange;
        this.maxValue = options.maxValue || 10;
        this.height = options.height + this.margin;
        this.backgroundColor = options.backgroundColor || '';
        this.diffDistance = 0;
        this.moveY = 0;
        this.moveRatio = 1;
        this.disappearFlag = false;
        this.newBornFlag = options.newBornFlag || false;
        this.showCurValue = 0;
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
        this.update(value);
    }
    static floor(val){
        if(val < 0){
            return -(Math.floor(-val))
        }
        return Math.floor(val);
    }
    update(value=0){
        const dividedValue = NumberItem.floor(value / this.baseRange);
        let diff = dividedValue - this.value;
        this.diffDistance = diff;
        this.value = dividedValue;
        this.originCurValue = this.showCurValue ;
    }
    processNumber(value,diff){
        let ret = NumberItem.floor((value + diff) % this.maxValue);
        if(ret < 0){
            return this.maxValue + ret;
        }
        return ret;
    }
    add(value,diff){
        let fValue = value + diff;
        if(fValue >= this.maxValue){
            return 0;
        }else if(fValue < 0){
            return this.maxValue - 1
        }
        return fValue
    }
    updateValue(changeY){
        let integerDistance = NumberItem.floor(changeY);
        this.showCurValue = this.processNumber(this.originCurValue,integerDistance );
        
        this.showPrevValue = this.add(this.showCurValue,-1);
        this.showNextValue = this.add(this.showCurValue,1);
    }
    move(tm,stopFlag){
        let distance;
        const {transitionTime} = this.context;
        if(stopFlag && this.newBornFlag){
            this.newBornFlag = false;
        }
        if(this.diffDistance === 0){
            return
        }
        
        // else if(this.diffDistance > 0){
        //     distance = Tween.easeOutElastic(tm,0,this.diffDistance,this.context.transitionTime);
        // }
        else{
            //easeOutElastic
            distance= Tween.linear(tm,0,this.diffDistance,transitionTime);

        }
        this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        this.moveY = distance;
        this.updateValue(distance);
    }
    getUnitWidth(val){
        if(this.disappearFlag && this.moveRatio != null){
            return Math.floor(val * this.moveRatio)
        }
        if(this.newBornFlag && this.moveRatio != null){
            return Math.floor(val * (1 - this.moveRatio))
        }
        return val;
    }
    disappear(){
        this.disappearFlag = true;
    }
    static renderText(ctx,content,x,y){
        if(content != null && content >= 0){
            ctx.fillText(content,x,y);
        }
    } 
    fillBackground(ctx,x,rectWidth,rectHeight){
        if(this.backgroundColor){
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(x,0,rectWidth,rectHeight);
        }
    }
    render(ctx,x,fillX,y,rectWidth,rectHeight){
        const{height,diffDistance} = this;
        const changeY = this.moveY % 1 * (this.height);
        // console.log(this.showPrevValue,this.showCurValue,this.showNextValue,changeY);
        if(this.disappearFlag){
            ctx.save();
            ctx.scale(this.moveRatio,1);
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
            ctx.globalAlpha = this.moveRatio;
        }else if(this.newBornFlag){
            let newRatio = 1 - this.moveRatio;
            ctx.save();
            ctx.scale(newRatio,1);
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
            ctx.globalAlpha = newRatio;
        }else{
            this.fillBackground(ctx,fillX,rectWidth,rectHeight);
        }
        ctx.fillStyle = this.color;
        (diffDistance > 0) && NumberItem.renderText(ctx,this.showNextValue,x,y+changeY-height);
        NumberItem.renderText(ctx,this.showCurValue,x,y+changeY);
        (diffDistance < 0) && NumberItem.renderText(ctx,this.showPrevValue,x,y+changeY+height);
        if(this.disappearFlag || this.newBornFlag){
            ctx.restore();
        }
    }
}

class NoNumberItem{
    constructor(context,value){
        this.context = context;
        this.value = value;
    }
}


export default (context,value,options)=>{
    if(NUMBER_REG.test(value)){
        return new NumberItem(context,value,options);
    }
    return new NoNumberItem(context,value,options);
}