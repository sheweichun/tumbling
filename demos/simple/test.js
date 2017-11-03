
import './index.less';
// import CanvasNumber from '../../src/index';
import '../../src/index.less';
import {DomNumberScroller,Countdown,FlipRender,DomRawScroller} from '../../src/index';
import Chart from 'chart.js';
import Tween from '../../src/tween';

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {

	stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( animate );

}

requestAnimationFrame( animate );

const HEIGHT = 108;
let value = 348;
function formatDt(dt,splitStr='/'){
    let hour = dt.getHours();
    hour = hour < 10 ? '0'+hour : hour;
    let minute = dt.getMinutes();
    minute = minute < 10 ? '0'+minute : minute;
    let second = dt.getSeconds();
    second = second < 10 ? '0'+second : second;
    return `${hour}${splitStr}${minute}${splitStr}${second}`;
}


const scroller = new DomNumberScroller('#container',{
    transitionTime:800,
    value:value,
    thousand:true
})
scroller.start();



setInterval(()=>{
    // scroller.transitionTime = 30000;
    value = [3817319,313][Math.round(Math.random())];
    // value += Math.random() * 100;
    if(!window.stopFlag){
        // console.log('value :',value);
        scroller.update(value)
    }
    
},1200)

const d = new Date();

const CountdownScroller =  new Countdown('#countdown',{
    transitionTime:300,
    effect:FlipRender,
    // rotateDirection:FlipRender.HORIZONTAL,
    direction:Countdown.MINUS,
    // tween:'easeOutBounce',
    value:formatDt(d),
})
CountdownScroller.start();

setInterval(()=>{
    // CountdownScroller.transitionTime = 8000;
    d.setSeconds(d.getSeconds()-1);
    const fmt = formatDt(d);
    // console.log('fmt :',fmt);
    CountdownScroller.update(fmt)
},1000);



const domRawScroller = new DomRawScroller('#raw',{
    transitionTime:3000,
    // stopImmediate:true,
    value:30,
    onStop:(value)=>{
        console.log('onStop :',value);
    }
});
domRawScroller.start();


document.getElementById('raw-start-button').addEventListener('click',()=>{
    domRawScroller.start()
})
document.getElementById('raw-stop-button').addEventListener('click',()=>{
    domRawScroller.stop()
})

function generateChartData(tweenFn,total,xLen){
    const unit = Math.floor(total / xLen);
    const data = [],labels = [];
    for(let i = 0; i <= xLen; i++){
        let value = i * unit;
        labels.push(value);
        data.push(tweenFn(value,0,100,total));
    }
    return {
        data,
        labels
    }
}

const chartData = generateChartData(Tween.linear,300,10);
// console.log('chartData :',chartData);
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartData.labels,
        datasets: [{
            label: 'linear',
            data: chartData.data,
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
            // borderColor: [
            //     'rgba(255,99,132,1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


// const scroller1 = new NumberScroller('#swc',{
//     width:300,
//     height:68,
//     transitionTime:800,
//     value:7864,
//     unitWidth:48
// })
// scroller1.start();

// setTimeout(()=>{
//     // scroller.transitionTime = 30000;
//     scroller1.update(42)
// },2000)