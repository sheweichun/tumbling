




import Inferno from 'inferno';
import Component from 'inferno-component';
import Chart from 'chart.js';
// import Tween from '../../src/tween';




Chart.defaults.global.elements.rectangle.borderWidth = 0;

export default class TweenChart extends Component{
    static generateChartData(tweenFn,total,xLen){
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
    initCanvas=(dom)=>{
        if(!dom){
            // if(this.chart){
            //     this.chart.destroy();
            // }
            return ;
        }
        if(this.canvasEl) return;
        this.canvasEl = dom;
        const{tween} = this.props;
        if(!tween) return ;
        const chartData = TweenChart.generateChartData(tween,300,10);
        this.ctx = dom.getContext('2d');
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'linear',
                    data: chartData.data,
                    backgroundColor:'rgba(0,125,255,0.2)',
                    borderWidth: 1
                }],
            },
            options: {
                scales: {
                    yAxes: [{
                        gridLines:{
                            display:false,
                            drawBorder:false
                        },
                        ticks: {
                            beginAtZero:true
                        }
                    }],
                    xAxes:[{
                        gridLines:{
                            display:false,
                            drawBorder:false
                        }
                    }]
                }
            }
        });
    }
    refreshChart(){
        const{tween} = this.props;
        if(!tween) return ;
        const chartData = TweenChart.generateChartData(tween,300,10);
        const chart = this.chart;
        chart.data.labels = chartData.labels;
        chart.data.datasets[0].data = chartData.data;
        chart.update();
    }
    componentDidUpdate(){
        this.refreshChart();
    }
    componentDidMount(){
        
    }
    render(){
        return <canvas ref={this.initCanvas} id="myChart" width="220" height="220">
        </canvas>
    }
}
