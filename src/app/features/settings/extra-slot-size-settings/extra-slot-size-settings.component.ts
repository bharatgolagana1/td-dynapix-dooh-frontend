import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-extra-slot-size-settings',
  templateUrl: './extra-slot-size-settings.component.html',
  styleUrls: ['./extra-slot-size-settings.component.scss']
})
export class ExtraSlotSizeSettingsComponent implements OnInit {

  slotSize: any;
  status: boolean = true; // Default to true for new slot sizes

  displayedColumns: string[] = ['slotSize', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadExtraSlotSizes();
  }

  loadExtraSlotSizes() {
    this.settingsService.getExtraSlotSizes().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addExtraSlotSize() {
    if (this.slotSize) {
      this.settingsService.createExtraSlotSize(this.slotSize, this.status)
        .subscribe(
          response => {
            console.log('Extra Slot Size created:', response);
            this.notificationService.showNotification('Extra Slot Size added successfully', 'success');
            this.slotSize = ''; 
            this.status = true; // Reset status to default
            this.loadExtraSlotSizes(); 
          },
          error => {
            console.error('Error creating extra slot size:', error);
            this.notificationService.showNotification('Extra Slot Size not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Extra Slot Size not added because it was empty', 'error');
    }
  }

  updateExtraSlotSizeStatus(element: any) {
    this.settingsService.updateExtraSlotSizeStatus(element.slotSize, element.status)
      .subscribe(
        response => {
          console.log('Extra Slot Size status updated:', response);
          this.notificationService.showNotification('Extra Slot Size status updated successfully', 'success');
        },
        error => {
          console.error('Error updating extra slot size status:', error);
          this.notificationService.showNotification('Extra Slot Size status not updated', 'error');
        }
      );
  }

  deleteExtraSlotSize(slotSize: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete slot size ${slotSize}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteExtraSlotSize(slotSize)
          .subscribe(
            response => {
              console.log('Extra Slot Size deleted:', response);
              this.notificationService.showNotification('Extra Slot Size deleted successfully', 'success');
              this.loadExtraSlotSizes(); 
            },
            error => {
              console.error('Error deleting extra slot size:', error);
              this.notificationService.showNotification('Extra Slot Size not deleted', 'error');
            }
          );
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onStatusChange(element: any) {
    element.status = !element.status;
    this.updateExtraSlotSizeStatus(element);
  }
}
