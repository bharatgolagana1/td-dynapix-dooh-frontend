import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-revenue-screens',
  templateUrl: './revenue-screens.component.html',
  styleUrls: ['./revenue-screens.component.scss']
})
export class RevenueScreensComponent implements OnInit {
  revenueOptions: string[] = ['Revenue 1', 'Revenue 2', 'Revenue 3'];
  topOptions: string[] = ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5'];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() { }

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        data: [40, 80, 120, 160],
        axisLabel: {
          formatter: function (value: number) {
            return value === 0 ? '0' : value + 'k';
          }
        },
        splitNumber: 4
      },
      yAxis: {
        type: 'category',
        data: ['5', '4', '3', '2', '1']
      },
      series: [
        {
          name: 'Dynapix',
          type: 'bar',
          data: [ 120, 100, 80, 70, 40],
          itemStyle: {
            color: 'rgba(153, 102, 255, 0.8)'
          },
          label: {
            show: true,
            position: 'insideRight',
            formatter: '{b} {c}k'
          }
        }
      ]
    };

    myChart.setOption(option);
  }
}
