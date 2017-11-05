import Inferno from 'inferno';
import infernoRouter from 'inferno-router';

import { Router, Route, IndexRoute } from 'inferno-router';
import createHashHistory from 'history/createHashHistory';

import Example from './examples/example';

const browserHistory = createHashHistory();
import Layout from './layout';
import Demo from './pages/demo';
import '../../src/index.less';
import './index.less';






__resize();
//注册 resize事件
window.addEventListener('resize', __resize, false);
function __resize() {
	let currClientWidth, fontValue,originWidth = 375;//originWidth用来设置设计稿原型的屏幕宽度
	currClientWidth = document.documentElement.clientWidth;
	//这里是设置屏幕的最大和最小值时候给一个默认值
	if (currClientWidth > 640) currClientWidth = 640;
	if (currClientWidth < 320) currClientWidth = 320;
	const scale = currClientWidth / 10;
	window.adjustScale = 375 / 10;
	document.documentElement.style.fontSize = `${scale}px`;
	document.body.style.fontSize = `${14 / scale}rem`;
	
}

Inferno.render(<Router history={ browserHistory }>
    <Route component={ Layout }>
	  <IndexRoute component={ Demo }/>
	  <Route path="/example" component={Example}></Route>
      {/*<Route path="/about" component={ About }>
        <Route path="/about/teammembers/:person" component={ TeamMember }/>
</Route>*/}
    </Route>
  </Router>,document.getElementById('container'))
