



import Inferno from 'inferno';
import Component from 'inferno-component';
import {DomRawScroller,FlipRender} from '../../src/index';

function formatDt(dt,splitStr=':'){
    let hour = dt.getHours();
    hour = hour < 10 ? '0'+hour : hour;
    let minute = dt.getMinutes();
    minute = minute < 10 ? '0'+minute : minute;
    let second = dt.getSeconds();
    second = second < 10 ? '0'+second : second;
    return `${hour}${splitStr}${minute}${splitStr}${second}`;
}

class DomRaw extends Component {
    componentDidMount(){

    }
    initRoot=(el)=>{
        
        if(el && !this.scroller){
            this.scroller = new DomRawScroller(el,{
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
    initRealValue=(el)=>{
        this.realValueEl = el;
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
    render() {
        return (
            <div className="tumbling-panel">
                <div className="tumbling-panel-head">
                <div>实际值:<span ref={this.initRealValue}></span></div>
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
        );
    }
}

export default DomRaw;