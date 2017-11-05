import Inferno from 'inferno';
import Component from 'inferno-component';
import Tween from '../../../src/util/tween';
import Chart from '../components/chart';
import DomScroll from './domScroll';
import DomCountDown from './domCountdown';
import DomRaw from './domRaw';
import {Link} from 'inferno-router';


const COMPONENT_MAP = {
    DomScroll,
    DomCountDown,
    DomRaw
}



const TweenKeys = Object.keys(Tween);
class Example extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectTween:TweenKeys[0]
        }
    }
 
    initStats=(el)=>{
        if(el){
            if(this.statsRoot) return;
            this.statsRoot = el;
            this.createStats(el);
        }else{
            this.statsRoot.removeChild(this.stats.dom);
            cancelAnimationFrame(this.requestId);
        }
    }
    createStats(el){
        const stats = new Stats();
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        el.appendChild( stats.dom );
        const _this = this;
        function animate() {
        
            stats.begin();
        
            // monitored code goes here
        
            stats.end();
        
            _this.requestId = requestAnimationFrame( animate );
        
        }
        _this.stats = stats;
        _this.requestId = requestAnimationFrame( animate );
    }
    render() {
        const{selectTween} = this.state;
        const{type,value} = this.props.params;
        const Demo = COMPONENT_MAP[type];
        return (
            <div className="example-container">
                <div className="exmaple-head">
                    <h1>{type}</h1>
                    <div className="back">
                        <Link to="/" >
                            &lt;
                        </Link>
                    </div>
                </div>
                <div className="stats" ref={this.initStats}>
                </div>
                <div className="example-body">
                    <div className="chartWrapper">
                    <div className="chartContainer">
                            <label>缓动函数：</label>
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
                    {Demo && <Demo value={value} tween={selectTween}></Demo>}
                </div>
                
            </div>
        );
    }
}

export default Example;