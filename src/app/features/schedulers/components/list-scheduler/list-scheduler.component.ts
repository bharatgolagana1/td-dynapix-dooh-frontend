import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulerService } from '../../scheduler.service';
import { MatDialog } from '@angular/material/dialog';
import { SchedulerDeleteComponent } from '../scheduler-delete/scheduler-delete.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  styleUrls: ['./list-scheduler.component.scss'],
  providers: [DatePipe],
})
export class ListSchedulerComponent implements OnInit, AfterViewInit {
  schedulers: Scheduler[] = [];
  displayedColumns: string[] = ['schedulerName', 'cycleTime', 'slotSize', 'videoUrls', 'screenId', 'startDate', 'endDate', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Scheduler>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  isLoading: boolean = false;
  searchTerm: string = '';
  noSchedulersFound: boolean = false;

  constructor(
    private router: Router,
    private schedulerService: SchedulerService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
  }

  private formatSchedulerDates(schedulers: Scheduler[]): Scheduler[] {
    return schedulers.map(scheduler => ({
      ...scheduler,
      startDate: this.formatDate(scheduler.startDate),
      endDate: this.formatDate(scheduler.endDate)
    }));
  }

  private formatDate(dateStr: string): string {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      return this.datePipe.transform(formattedDate, 'dd-MM-yyyy') || '';
    }
    return dateStr;
  }

  formatCycleTime(minutes: number): string {
    return `${minutes} min`;
  }

  formatSlotSize(seconds: number): string {
    return `${seconds} sec`;
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  getPaginatedSchedulers(pageIndex: number, pageSize: number, search: string = ''): void {
    this.isLoading = true;
    this.schedulerService.getSchedulers(pageIndex, pageSize, search).subscribe(
      (response: any) => {
        const schedulers = this.formatSchedulerDates(response.schedules);
        this.schedulers = schedulers;
        this.noSchedulersFound = schedulers.length === 0;
        this.dataSource = new MatTableDataSource<Scheduler>(schedulers);
        this.totalItems = response.totalSchedulesCount;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error fetching schedulers:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedSchedulers(this.pageIndex, this.pageSize, this.searchTerm);
  }

  editScheduler(schedulerId: string): void {
    this.router.navigate(['/updateScheduler', schedulerId]);
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
