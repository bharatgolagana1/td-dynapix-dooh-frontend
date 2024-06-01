
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulerService } from '../scheduler.service';
import { MatDialog } from '@angular/material/dialog';
import { SchedulerDeleteComponent } from '../scheduler-delete/scheduler-delete.component';
import { NotificationService } from 'src/app/core/services/notification.service';

export interface Scheduler {
  id: number;
  schedulerName: string;
  cycleTime: number;
  slotSize: number;
  videoUrls: { videoUrl: string }[];
  screenIds: number[];
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-list-scheduler',
  templateUrl: './list-scheduler.component.html',
  styleUrls: ['./list-scheduler.component.scss']
})
export class ListSchedulerComponent implements OnInit, AfterViewInit {
  schedulers: Scheduler[] = [];
  displayedColumns: string[] = ['schedulerName', 'cycleTime', 'slotSize', 'videoUrls', 'screenId', 'startDate', 'endDate', 'delete'];
  dataSource = new MatTableDataSource<Scheduler>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  isLoading: boolean = false;
  searchTerm: string = '';

  constructor(
    private schedulerService: SchedulerService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getPaginatedSchedulers(pageIndex: number, pageSize: number, search: string = ''): void {
    this.isLoading = true;
    this.schedulerService.getSchedulers(pageIndex, pageSize, search).subscribe((response: any) => {
      this.schedulers = response.schedules;
      this.dataSource = new MatTableDataSource<Scheduler>(response.schedules);
      this.totalItems = response.totalSchedulesCount;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
  }

  onSearch(): void {
    this.pageIndex = 0;
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
  }

  deleteScheduler(scheduler: Scheduler): void {
    const dialogRef = this.dialog.open(SchedulerDeleteComponent, {
      width: '400px',
      data: { scheduler }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.isLoading = true;
        this.schedulerService.deleteScheduler(scheduler).subscribe(
          () => {
            this.notificationService.showNotification('Scheduler deleted successfully.', 'success');
            this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
          },
          (error: any) => {
            this.isLoading = false;
            console.error('Error deleting scheduler:', error);
            this.notificationService.showNotification('Failed to delete scheduler. Please try again.', 'error');
          }
        );
      }
    });
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.trim().toLowerCase();
    this.pageIndex = 0; 
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
  }
}

