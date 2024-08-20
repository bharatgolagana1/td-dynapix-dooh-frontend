import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-identification-type',
  templateUrl: './user-identification-type.component.html',
  styleUrls: ['./user-identification-type.component.scss']
})
export class UserIdentificationTypeComponent implements OnInit {

  identificationType: string = '';
  status: boolean = true; // Default to true when adding

  displayedColumns: string[] = ['identificationType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadIdentificationTypes();
  }

  loadIdentificationTypes() {
    this.settingsService.getIdentificationTypes().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addIdentificationType() {
    if (this.identificationType) {
      this.settingsService.createIdentificationType(this.status, this.identificationType)
        .subscribe(
          response => {
            console.log('Identification Type created:', response);
            this.notificationService.showNotification('Identification Type added successfully', 'success');
            this.identificationType = ''; 
            this.status = true; // Reset status to default
            this.loadIdentificationTypes(); 
          },
          error => {
            console.error('Error creating identification type:', error);
            this.notificationService.showNotification('Identification Type not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Identification Type not added because it was empty', 'error');
    }
  }

  updateIdentificationStatus(element: any) {
    this.settingsService.updateIdentificationTypeStatus(element.identificationType, element.status)
      .subscribe(
        response => {
          console.log('Identification Type status updated:', response);
          this.notificationService.showNotification('Identification Type status updated successfully', 'success');
        },
        error => {
          console.error('Error updating identification type status:', error);
          this.notificationService.showNotification('Identification Type status not updated', 'error');
        }
      );
  }

  deleteIdentificationType(type: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${type}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteIdentificationType(type)
          .subscribe(
            response => {
              console.log('Identification Type deleted:', response);
              this.notificationService.showNotification('Identification Type deleted successfully', 'success');
              this.loadIdentificationTypes(); 
            },
            error => {
              console.error('Error deleting identification type:', error);
              this.notificationService.showNotification('Identification Type not deleted', 'error');
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
    this.updateIdentificationStatus(element);
  }
}
