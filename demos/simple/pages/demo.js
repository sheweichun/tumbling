

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
                <iframe src="https://ghbtns.com/github-btn.html?user=sheweichun&repo=tumbling&type=star&count=false&size=small" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
            </div>
            <div className="demo-container">
                <ul>
                    <li className="demo-item">
                        <Link to="example?type=DomScroll&value=9">
                            <img className="demo-item-thumbnail" src="//img.alicdn.com/tfs/TB1nuMeewMPMeJjy1XdXXasrXXa-1024-640.jpg" />
                            <h3>数字翻转</h3>
                        </Link>

                    </li>
                    <li className="demo-item">
                        <Link to="example?type=DomCountDown">
                            <img className="demo-item-thumbnail" src="//img.alicdn.com/tfs/TB1nuMeewMPMeJjy1XdXXasrXXa-1024-640.jpg" />
                            <h3>倒计时</h3>
                        </Link>

                    </li>
                    <li className="demo-item">
                        <Link to="example?type=DomRaw">
                            <img className="demo-item-thumbnail" src="//img.alicdn.com/tfs/TB1nuMeewMPMeJjy1XdXXasrXXa-1024-640.jpg" />
                            <h3>摇奖</h3>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    }
}