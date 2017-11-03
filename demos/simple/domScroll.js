



import Inferno from 'inferno';
import Component from 'inferno-component';
import {DomNumberScroller} from '../../src/index';

class DomScroll extends Component {
    componentDidMount(){

    }
    initRoot=(el)=>{
        const{value} = this.props;
        if(el && !this.scroller){
            this.scroller = new DomNumberScroller(el,{
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
                this.scroller.update(Ravalue)
            },3000)
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

export default DomScroll;