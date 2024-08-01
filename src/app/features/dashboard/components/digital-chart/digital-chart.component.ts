import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-digital-chart',
  templateUrl: './digital-chart.component.html',
  styleUrls: ['./digital-chart.component.scss']
})
export class DigitalChartComponent implements OnInit {
  adText: string = 'Dynapix';

  constructor() {}

  removeChip() {
    console.log('Chip removed');
  }

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const chartDom = document.getElementById('digitalchart')!;
    const myChart = echarts.init(chartDom);
    const chartOption = {
      xAxis: {
        type: 'category',
        data: ['Ranchi', 'Bangalore', 'Chennai', 'Delhi'],
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 5,
      },
      series: [
        {
          data: [5, 4, 4, 3],
          type: 'bar',
          barWidth:'1%',
          itemStyle: {
            color: function(params: any) {
              const colors = ['#a569bd', '#f5b041', '#e74c3c', '#5dade2'];
              return colors[params.dataIndex];
            }
          },
          markPoint: {
            data: [
              { name: '5', value: 5, xAxis: 0, yAxis: 5, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#a569bd' } },
              { name: '4', value: 4, xAxis: 1, yAxis: 4, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#f5b041' } },
              { name: '4', value: 4, xAxis: 2, yAxis: 4, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#e74c3c' } },
              { name: '3', value: 3, xAxis: 3, yAxis: 3, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#5dade2' } }
            ],
            label: {
              show: true,
              formatter: function(params: any) {
                return params.name;
              },
              color: '#ffffff',
              position: 'inside'
            }
          }
        }
      ]
    };
    myChart.setOption(chartOption);
  }
}
