



import Inferno from 'inferno';
import Component from 'inferno-component';
import {Countdown,FlipRender} from '../../src/index';

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
    componentDidMount(){

    }
    initRoot=(el)=>{
        this.value = formatDt(new Date());
        if(el && !this.scroller){
            this.scroller = new Countdown(el,{
                transitionTime:800,
                effect:FlipRender,
                // rotateDirection:FlipRender.HORIZONTAL,
                direction:Countdown.MINUS,
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
                this.scroller.update(this.value)
            },1000)
        }
    }
    initRealValue=(el)=>{
        this.realValueEl = el;
    }
    render() {
        return (
            <div className="tumbling-panel">
                <div className="tumbling-panel-head">
                <div>实际值:<span ref={this.initRealValue}></span></div>
                </div>
                <div className="tumbling-panel-body">
                    <div className="tumbling-body-wrapper" style={{fontSize:'48px'}}>
                        <div ref={this.initRoot}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DomCountDown;