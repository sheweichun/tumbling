

const NUMBER_TYPE = 0;
const NO_NUMBER_TYPE = 1;
const NUMBER_REG = new RegExp("[0-9]")


const CLASSNAME_PREFIX = 'tumbling-wrapper';

export class BaseItem{
    constructor(context,value,options){
        const{effect,appearAnimation,disappearAnimation,animationFlag,dom,renderItem,tween} = context;
        const _this = this;
        _this.context = context;
        _this.value = value;
        _this.index = options.index;
        _this.rawMode = options.rawMode || false;
        _this.rawDirection = options.rawDirection || 1;
        _this.visible = false;
        _this.wrapper = null;
        _this.hasRender = false;
        _this.effectController = new effect(_this,options);
        _this.moveRatio = 1;
        _this.animationFlag = animationFlag || true;
        _this.parentDom = dom;
        _this.renderItem = renderItem;
        _this.newBornFlag = options.newBornFlag || false;
        _this.appearAnimation = appearAnimation;
        _this.disappearAnimation = disappearAnimation;
        _this.disappearFlag = false;
    }
    remove(){
        const _this = this;
        if(_this.parentDom && _this.wrapper){
            _this.parentDom.removeChild(_this.wrapper);
            _this.wrapper = null;
        }
    }
    getWrapperWidth(){
        const _this = this;
        if(!_this.wrapperWidth){
            _this.wrapperWidth = _this.wrapper.offsetWidth;
            return _this.wrapperWidth;
        }
        return _this.wrapperWidth;
    }
    disappear(){
        this.disappearFlag = true;
    }
    animateRender(){
        const _this = this;
        if(!_this.visible){
            _this.wrapper.className += ` ${CLASSNAME_PREFIX}-visible`;
            _this.visible = true;
            _this.getWrapperWidth();
        }
        if(_this.disappearFlag){
            if(_this.disappearAnimation){
                _this.disappearAnimation(_this.wrapper,_this.moveRatio);
            }else if(this.animationFlag){
                _this.wrapper.style.width = `${_this.wrapperWidth * _this.moveRatio}px`;
                _this.wrapper.style.opacity = _this.moveRatio;
            }
            
        }else if(_this.newBornFlag){
            let newRatio = 1 - _this.moveRatio;
            if(_this.appearAnimation){
                _this.appearAnimation(_this.wrapper,newRatio);
            }else if(this.animationFlag){
                _this.wrapper.style.width = `${_this.wrapperWidth * newRatio}px`;
                _this.wrapper.style.opacity = newRatio;
            }
        }
    }
}

class NumberItem extends BaseItem{
    constructor(context,value,options){
        super(context,value,options);
        const _this = this;
        _this.value = 0;
        _this.isNumber = true;
        _this.baseRange = options.baseRange;
        _this.diffDistance = 0;
        _this.maxValue = options.maxValue || 10;
        _this.moveY = 0;
        _this.showCurValue = 0;
        _this.update(value);
    }
    mount(dom){
        const _this = this;
        let wrapper = document.createElement('div');
        _this.effectController.mount(wrapper);
        _this.wrapper = wrapper;
        _this.visible = false;
        dom.appendChild(wrapper);
        return _this;
    }
    static floor(val){
        if(val < 0){
            return -(Math.floor(-val))
        }
        return Math.floor(val);
    }
    update(value=0){
        const _this = this;
        if(_this.rawMode){
            _this.showPrevValue = _this.showNextValue = value;
            if(value === _this.value){
                _this.diffDistance = 0;
                return;
            }
            _this.diffDistance = _this.rawDirection;
            _this.value = value;
        }else{
            const dividedValue = NumberItem.floor(value / _this.baseRange);
            let diff = dividedValue - _this.value;
            _this.diffDistance = diff;
            _this.value = dividedValue;
            _this.showPrevValue = _this.add(_this.showCurValue,-1);
            _this.showNextValue = _this.add(_this.showCurValue,1);
            _this.originCurValue = _this.showCurValue ;
        }
    }
    processNumber(value,diff){
        const _this = this;
        let ret = NumberItem.floor((value + diff) % _this.maxValue);
        if(ret < 0){
            return _this.maxValue + ret;
        }
        return ret;
    }
    add(value,diff){
        const _this = this;
        let fValue = value + diff;
        if(fValue >= _this.maxValue){
            return 0;
        }else if(fValue < 0){
            return _this.maxValue - 1
        }
        return fValue
    }
    updateValue(changeY){
        const _this = this;
        let integerDistance = NumberItem.floor(changeY);
        _this.showCurValue = _this.processNumber(_this.originCurValue,integerDistance );
        _this.showPrevValue = _this.add(_this.showCurValue,-1);
        _this.showNextValue = _this.add(_this.showCurValue,1);
    }
    updateRawValue(changeY){
        const _this = this;
        if(changeY === 1 || changeY === -1){
            _this.showCurValue = _this.showPrevValue;
            _this.showPrevValue = _this.showNextValue = _this.showCurValue;
        }
    }
    move(tm,stopFlag){
        const _this = this;
        let distance;
        const {transitionTime} = _this.context;
        if(stopFlag && _this.newBornFlag){
            _this.newBornFlag = false;
        }
        if(_this.diffDistance === 0){
            return
        }
        //easeOutElastic linear
        if(tm === transitionTime){
            distance = _this.diffDistance;
        }else{
            distance= _this.context.tween(tm,0,_this.diffDistance,transitionTime);
        }
        // this.moveRatio = (this.diffDistance - Tween.linear(tm,0,this.diffDistance,transitionTime)) / this.diffDistance;
        _this.moveRatio = (transitionTime - tm) / transitionTime;
        _this.moveY = distance;
        if(_this.rawMode){
            _this.updateRawValue(distance);
        }else{
            _this.updateValue(distance);
        }
    }
    // remove(){
    //     const _this = this;
    //     if(_this.parentDom && _this.wrapper){
    //         _this.parentDom.removeChild(_this.wrapper);
    //         _this.wrapper = null;
    //     }
    // }
    render(){
        const _this = this;
        const{diffDistance} = _this;
        if(diffDistance === 0 && _this.hasRender) return;
        _this.hasRender = true;
        let changeY = _this.moveY % 1;
        _this.animateRender();
        _this.effectController.render(diffDistance,changeY)
    }
}

class NoNumberItem extends BaseItem{
    constructor(context,value,options){
        super(context,value,options);
    }
    mount(dom){
        const _this = this;
        let wrapper = document.createElement('div');
        wrapper.className = CLASSNAME_PREFIX;
        wrapper.innerHTML = _this.value;
        _this.wrapper = wrapper;
        dom.appendChild(wrapper);
        return _this;
    }
    move(tm,stopFlag){
        const _this = this;
        const {transitionTime} = _this.context;
        _this.moveRatio = (transitionTime - tm) / transitionTime;
        if(stopFlag && _this.newBornFlag){
            _this.newBornFlag = false;
        }
    }
    update(){

    }
    render(){
        this.animateRender();
    }
}


export default (context,value,options,flag)=>{
    if(flag){
        return new NumberItem(context,value,options);
    }
    return new NoNumberItem(context,value,options);
}