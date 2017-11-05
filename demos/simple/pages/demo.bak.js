

import Inferno from 'inferno';
import Component from 'inferno-component';
import Tween from '../../../src/tween';
import Chart from '../components/chart';
import DomScroll from '../examples/domScroll';
import DomCountDown from '../examples/domCountdown';
import DomRaw from '../examples/domRaw';


const TweenKeys = Object.keys(Tween);
export default class Demo extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectTween:TweenKeys[0]
        }
    }
    render(){
        const {selectTween} = this.state;
        return <div>
            <h1 className="head">Tumbling</h1>
            <div className="chartWrapper">
                <div className="chartContainer">
                    <select className="tweenSelect" onChange={(e)=>{
                        this.setState({
                            selectTween:e.target.value
                        })
                    }}>
                        {
                            TweenKeys.map((name,key)=>{
                                return <option key={key} value={name}>{name}</option>
                            })
                        }
                    </select>
                    <Chart tween={Tween[selectTween]}></Chart>
                </div>
            </div>
            <div className="content">
                
                <div className="section">
                    <DomScroll value={1}></DomScroll>
                </div>
                {/*<div className="section">
                    <DomCountDown></DomCountDown>
                </div>
                <div className="section">
                    <DomRaw></DomRaw>
                    </div>*/}
            </div>
        </div>
    }
}