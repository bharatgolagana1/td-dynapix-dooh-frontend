import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  selectedMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    this.selectedMonth = this.months[0]; // Default to the first month
  }

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    const chartDom = document.getElementById('revenueChart')!;
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
        type: 'category',
        data: ['North', 'South', 'East', 'West']
      },
      yAxis: {
        type: 'value',
        min: 10000,
        max: 90000,
        interval: 10000,
        axisLabel: {
          formatter: function (value: number) {
            return value / 1000 + 'k';
          }
        }
      },
      series: [{
        data: [70000, 60000, 90000, 60000],
        type: 'bar',
        barWidth: '1%', // Adjusted bar width to fit circles better
        itemStyle: {
          color: function (params: any) {
            const colors = ['#9575cd', '#fbc02d', '#ef5350', '#29b6f6'];
            return colors[params.dataIndex];
          }
        },
        markPoint: {
          data: [
            { name: '70K', value: 70000, xAxis: 0, yAxis: 70000, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#9575cd' } },
            { name: '60K', value: 60000, xAxis: 1, yAxis: 60000, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#fbc02d' } },
            { name: '90K', value: 90000, xAxis: 2, yAxis: 90000, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#ef5350' } },
            { name: '60K', value: 60000, xAxis: 3, yAxis: 60000, symbol: 'circle', symbolSize: 40, itemStyle: { color: '#29b6f6' } }
          ],
          label: {
            show: true,
            formatter: function (params: any) {
              return params.name;
            },
            color: '#ffffff',
            position: 'inside'
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: function (params: any) {
            return params.data / 1000 + 'k';
          }
        }
      }]
    };
    option && myChart.setOption(option);
  }

  onMonthChange(event: any): void {
    console.log('Selected Month:', this.selectedMonth);
    // Update your chart data based on the selected month
    // For example, you can fetch new data and update the chart
  }
}
