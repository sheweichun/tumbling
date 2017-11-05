

import Inferno from 'inferno';
import Component from 'inferno-component';
import Tween from '../../../src/util/tween';
import Chart from '../components/chart';

import { Link } from 'inferno-router';
import './index.less';


const TweenKeys = Object.keys(Tween);
export default class Demo extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <div className="demo-head">
                <h1 className="head-title">Tumbling</h1>
                <p style="color:#e8e8e8;font-size:14px;">Simple and Powerful Library for Number Changin with zero dependencies</p>
                <iframe src="https://ghbtns.com/github-btn.html?user=sheweichun&repo=tumbling&type=star&count=false&size=small" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
            </div>
            <div className="demo-container">
                <ul>
                    <li className="demo-item">
                        <Link to="example?type=DomNumberTumbling&value=9">
                            <div className="demo-item-bg"></div>
                            <h3>数字翻转</h3>
                        </Link>

                    </li>
                    <li className="demo-item">
                        <Link to="example?type=DomCountdownTumbling">
                            <div className="demo-item-bg"></div>
                            <h3>倒计时</h3>
                        </Link>

                    </li>
                    <li className="demo-item">
                        <Link to="example?type=DomRawTumbling">
                            <div className="demo-item-bg"></div>
                            <h3>摇奖</h3>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    }
}