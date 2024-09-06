import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {
  totalScreens: number = 0;
  inactiveScreens: number = 0;
  boundDevicesCount: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getTotalAndInactiveScreens().subscribe(
      (data: { totalScreens: number, inactiveScreens: number }) => {
        this.totalScreens = data.totalScreens;
        this.inactiveScreens = data.inactiveScreens;
      },
      (error: any) => {
        console.error('Error fetching screen data:', error);
      }
    );
    this.dashboardService.getBoundDevicesCount().subscribe(
      (response: { message: string, count: number }) => {
        this.boundDevicesCount = response.count;
      },
      (error: any) => {
        console.error('Error fetching bound devices count:', error);
      }
    );
  }
}
