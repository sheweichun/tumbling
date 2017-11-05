



import Inferno from 'inferno';
import Component from 'inferno-component';
import {DomCountdownTumbling,FlipEffect} from '../../../src/index';


function formatDt(dt,splitStr=':'){
    let hour = dt.getHours();
    hour = hour < 10 ? '0'+hour : hour;
    let minute = dt.getMinutes();
    minute = minute < 10 ? '0'+minute : minute;
    let second = dt.getSeconds();
    second = second < 10 ? '0'+second : second;
    return `${hour}${splitStr}${minute}${splitStr}${second}`;
}
class DomCountDown extends Component {
    componentDidUpdate(){

    }
    initRoot=(el)=>{
        this.value = formatDt(new Date());
        if(el && !this.scroller){
            this.scroller = new DomCountdownTumbling(el,{
                transitionTime:800,
                effect:FlipEffect,
                // rotateDirection:FlipRender.HORIZONTAL,
                // direction:Countdown.ADD,
                // tween:'easeOutBounce',
                value:this.value,
            })
            if(this.realValueEl){
                this.realValueEl.innerHTML = this.value;
            }
            this.scroller.start();
            setInterval(()=>{
                this.value = formatDt(new Date());
                if(this.realValueEl){
                    this.realValueEl.innerHTML = this.value;
                }
                this.scroller.update(this.value,{
                    tween:this.props.tween
                })
            },1000)
        }
    }
    initRealValue=(el)=>{
        this.realValueEl = el;
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
                        <div className="tumbling-body-wrapper" style={{fontSize:'48px'}}>
                            <div ref={this.initRoot}></div>
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
            import {DomCountdownTumbling,FlipEffect} from 'tumbling';
            import 'tumbling/index.css';
            this.scroller = new DomCountdownTumbling(el,{
                transitionTime:800,
                effect:FlipEffect,
                rotateDirection:FlipRender.VERTICAL, //水平翻转还是垂直翻转
                value:this.value,
            })
            this.scroller.start();
            setInterval(()=>{
                this.value = formatDt(new Date());
                this.scroller.update(this.value)
            },1000)`}}>
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
            new DomCountdownTumbling(el,{
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
                rotateDirection:FlipEffect.HORIZONTAL,
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

export default DomCountDown;