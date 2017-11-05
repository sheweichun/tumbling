



import Inferno from 'inferno';
import Component from 'inferno-component';
import {DomRawTumbling,FlipEffect} from '../../../src/index';

const CHAR_LIST = ['A','B','C','D','E','F','G','H','J','K','L','M','O']

class DomScroll extends Component {
    componentDidUpdate(){
        this.scroller.changeTween(this.props.tween)
        this.charScroller.changeTween(this.props.tween);
    }
    initRoot=(el)=>{
        
        if(el && !this.scroller){
            this.scroller = new DomRawTumbling(el,{
                transitionTime:3000,
                value:10,  
                onStop:(value)=>{
                    if(this.realValueEl){
                        this.realValueEl.innerHTML = value.join('');
                    }
                }
            });
            
            this.scroller.start();
        }
    }
    initCharRoot=(el)=>{
        if(el && !this.charScroller){
            this.charScroller = new DomRawTumbling(el,{
                transitionTime:3000,
                value:10,  
                renderItem:(value)=>{
                    if(value < 0){
                        return 'D'
                    }
                    return CHAR_LIST[value];
                },
                onStop:(value)=>{
                    if(this.realCharValueEl){
                        this.realCharValueEl.innerHTML = value.join('');
                    }
                }
            });
            
            this.charScroller.start();
        }
    }
    initRealValue=(el)=>{
        this.realValueEl = el;
    }
    initRealCharValue=(el)=>{
        this.realCharValueEl = el;
    }
    start=()=>{
        if(this.scroller){
            this.scroller.start()
        }
    }
    stop=()=>{
        if(this.scroller){
            this.scroller.stop();
        }
    }
    startChar=()=>{
        if(this.charScroller){
            this.charScroller.start()
        }
    }
    stopChar=()=>{
        if(this.charScroller){
            this.charScroller.stop();
        }
    }
    initCode=(el)=>{
        if(el){
            hljs.highlightBlock(el);
        }
    }
    render() {
        return (
            <div>
                <div className="tumbling-panel">
                    <div className="tumbling-panel-head">
                        <h3>实例</h3>
                        <div style="float:right;">
                            实际值:<span ref={this.initRealValue}></span>
                        </div>
                    </div>
                    <div className="tumbling-panel-body">
                        <div>
                            <button onClick={this.start}>开始</button>
                            <button onClick={this.stop}>停止</button>
                        </div>
                        <div className="tumbling-body-wrapper" style={{fontSize:'48px'}}>
                            <div ref={this.initRoot}></div>
                        </div>
                    </div>
                </div>

                <div className="tumbling-panel">
                    <div className="tumbling-panel-head">
                        <h3>实例</h3>
                        <div style="float:right;">
                            实际值:<span ref={this.initRealCharValue}></span>
                        </div>
                    </div>
                    <div className="tumbling-panel-body">
                        <div>
                            <button onClick={this.startChar}>开始</button>
                            <button onClick={this.stopChar}>停止</button>
                        </div>
                        <div className="tumbling-body-wrapper" style={{fontSize:'48px'}}>
                            <div ref={this.initCharRoot}></div>
                        </div>
                    </div>
                </div>

                <div className="tumbling-panel">
                    <div className="tumbling-panel-head">
                        <h3>代码</h3>
                    </div>
                    <div className="tumbling-panel-body">
                        <pre className="code" >
                            <code ref={this.initCode} dangerouslySetInnerHTML={{__html:`
            import {DomRawTumbling} from 'tumbling';
            import 'tumbling/index.css';
            new DomRawTumbling(el,{
                transitionTime:3000,
                value:10,//十个坑位 或者 传入数组 [{step:步长,maxValue:最大值}]
                onStop:(value)=>{
                    
                }
            });`}}>
                            </code>
                        </pre>
                    </div>
                </div>
                <div className="tumbling-panel">
                    <div className="tumbling-panel-head">
                        <h3>配置</h3>
                    </div>
                    <div className="tumbling-panel-body">
                        <pre className="code" >
                            <code ref={this.initCode} dangerouslySetInnerHTML={{__html:`
            new DomRawTumbling(el,{
                effect:class EffectInterface(){  //效果扩展
                    constructor(context,options){

                    },
                    //挂载内容到wrapper
                    mount(wrapper){

                    },
                    //渲染
                    render(){

                    }
                },
                onStop:function(value){ //动画停止回调

                },
                transitionTime:3000,//Number (ms)  //动画时长
                renderItem:function(value){  //单个数字的渲染函数

                },
                tween:'linear', //缓动函数
                disappearAnimation:function(wrapper,ratio){  //消失效果

                },
                appearAnimation:function(wrapper,ratio){ //出现效果

                },
                thousand:true //千分位
            })`}}>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
}

export default DomScroll;