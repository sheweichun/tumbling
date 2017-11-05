



import Inferno from 'inferno';
import Component from 'inferno-component';
import {DomNumberTumbling} from '../../../src/index';

class DomScroll extends Component {
    componentDidUpdate(){

    }
    initRoot=(el)=>{
        const{value} = this.props;
        if(el && !this.scroller){
            this.scroller = new DomNumberTumbling(el,{
                transitionTime:1500,
                value:value,
                thousand:true
            });
            if(this.realValueEl){
                this.realValueEl.innerHTML = value;
            }
            this.scroller.start();
            setInterval(()=>{
                const Ravalue = Math.floor(this.scroller.value + Math.random() * 100);
                if(this.realValueEl){
                    this.realValueEl.innerHTML = Ravalue;
                }
                this.scroller.update(Ravalue,{
                    tween:this.props.tween
                })
            },3000)
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
            import {DomNumberTumbling} from 'tumbling';
            import 'tumbling/index.css';
            this.scroller = new DomNumberTumbling(el,{
            transitionTime:1500, //动画时间
            value:1, //显示值
            thousand:true //展示千分位
            });
            this.scroller.start();
            setInterval(()=>{
            const Ravalue = Math.floor(this.scroller.value + Math.random() * 100);
            this.scroller.update(Ravalue,{
                //tween:this.props.tween  修改缓动函数
            })
            },3000)`}}>
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
            new DomNumberTumbling(el,{
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