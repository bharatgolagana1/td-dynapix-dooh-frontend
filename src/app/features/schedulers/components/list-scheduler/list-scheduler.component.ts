import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulerService } from '../scheduler.service';

@Component({
  selector: 'app-list-scheduler',
  templateUrl: './list-scheduler.component.html',
  styleUrls: ['./list-scheduler.component.scss']
})
export class ListSchedulerComponent implements OnInit, AfterViewInit {
  schedulers: any[] = [];
  displayedColumns: string[] = ['cycleTime', 'slotSize', 'videoUrls', 'screenId'];
  dataSource!: MatTableDataSource<any>; // Update Scheduler to any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0; // Define totalItems property
  pageSize: number = 10; // Define pageSize property

  constructor(private schedulerService: SchedulerService) { }

  ngOnInit(): void {
    this.getPaginatedSchedulers(0, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getPaginatedSchedulers(pageIndex: number, pageSize: number): void {
    this.schedulerService.getSchedulers(pageIndex, pageSize).subscribe((response: any) => {
      if (response.schedules.length > 0) {
        this.schedulers = response.schedules;
        this.dataSource = new MatTableDataSource<any>(response.schedules);
        this.totalItems = response.totalSchedulesCount; // Assign total count to totalItems
      }
    });
  }

  onPageChange(event: any): void {
    this.getPaginatedSchedulers(event.pageIndex, event.pageSize);
  }
}
