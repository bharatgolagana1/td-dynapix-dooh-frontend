import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SettingsService } from '../settings.service';
import { EditSchedulerDialogComponent } from '../edit-scheduler-dialog/edit-scheduler-dialog.component';

export interface scheduler{
  schedulerName : string,
  slotSize : number,
  cycleTime : number,
  status : boolean,
  _id:string
}
@Component({
  selector: 'app-scheduler-slot-settings',
  templateUrl: './scheduler-slot-settings.component.html',
  styleUrls: ['./scheduler-slot-settings.component.scss'],
})
export class SchedulerSlotSettingsComponent {
  schedulers : scheduler[] = []
  schedulerName: string = '';
  slotSize: number | null = null;
  cycleTime: number | null = null;
  status: boolean = true;
  searchQuery: string = '';
  displayedColumns: string[] = [
    'schedulerName',
    'slotSize',
    'cycleTime',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadSchedulers();
  }

  loadSchedulers() {
    this.settingsService.getSchedulers().subscribe((schedulerList : any) => {
      this.schedulers = schedulerList.schedulers;
      this.dataSource.data = this.schedulers;
      this.dataSource.paginator = this.paginator;
    });
  }

  addScheduler() {
    if (this.schedulerName && this.slotSize && this.cycleTime) {
      const scheduler = {
        schedulerName: this.schedulerName,
        slotSize: this.slotSize,
        cycleTime: this.cycleTime,
        status: this.status,
      };
      this.settingsService.createScheduler(scheduler).subscribe(
        (response) => {
          this.notificationService.showNotification(
            'Scheduler added successfully',
            'success'
          );
          this.schedulerName = '';
          this.slotSize = null;
          this.cycleTime = null;
          this.status = true;
          this.loadSchedulers();
        },
        (error) => {
          this.notificationService.showNotification(
            'Failed to add scheduler',
            'error'
          );
        }
      );
    }
  }

  updateScheduler(element: any) {
    this.settingsService.updateScheduler(element._id, element.status)
      .subscribe(
        response => {
          this.notificationService.showNotification('scheduler status updated successfully', 'success');
        },
        error => {
          console.error('Error updating scheduler status:', error);
          this.notificationService.showNotification('scheduler status not updated', 'error');
        }
      );
  }



  deleteScheduler(scheduler: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {
        message: `Are you sure you want to delete the scheduler "${scheduler.schedulerName}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.settingsService.deleteScheduler(scheduler._id).subscribe(
          (response) => {
            this.notificationService.showNotification(
              'Scheduler deleted successfully',
              'success'
            );
            this.loadSchedulers();
          },
          (error) => {
            this.notificationService.showNotification(
              'Failed to delete scheduler',
              'error'
            );
          }
        );
      }
    });
  }

  applyFilter() {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onStatusChange(element: any) {
    element.status = !element.status;
    this.updateScheduler(element);
  }
}
