import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-media-identity',
  templateUrl: './media-identity.component.html',
  styleUrls: ['./media-identity.component.scss']
})
export class MediaIdentityComponent implements OnInit {

  mediaName: string = '';
  status: boolean = true;
  displayedColumns: string[] = ['mediaName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadMediaIdentities();
  }

  loadMediaIdentities() {
    this.settingsService.getMediaIdentities().subscribe(data => {
      this.dataSource.data = data.mediaIdentities;
      this.dataSource.paginator = this.paginator;
    });
  }

  loadActiveMediaIdentities() {
    this.settingsService.getActiveMediaIdentity().subscribe(data => {
      console.log('Active Media Identities:', data);  // You can use this data as needed
    });
  }

  addMediaIdentity() {
    if (this.mediaName) {
      this.settingsService.createMediaIdentity(this.mediaName, this.status)
        .subscribe(
          response => {
            console.log('Media Identity created:', response);
            this.notificationService.showNotification('Media Identity added successfully', 'success');
            this.mediaName = ''; 
            this.status = true; 
            this.loadMediaIdentities(); 
          },
          error => {
            console.error('Error creating media identity:', error);
            this.notificationService.showNotification('Media Identity not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Media Identity not added because it was empty', 'error');
    }
  }

  updateMediaStatus(element: any) {
    this.settingsService.updateMediaIdentityStatus(element.mediaName, element.status)
      .subscribe(
        response => {
          console.log('Media Identity status updated:', response);
          this.notificationService.showNotification('Media Identity status updated successfully', 'success');
          this.loadMediaIdentities(); 
        },
        error => {
          console.error('Error updating media identity status:', error);
          this.notificationService.showNotification('Media Identity status not updated', 'error');
        }
      );
  }

  deleteMediaIdentity(mediaName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${mediaName}?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteMediaIdentity(mediaName)
          .subscribe(
            response => {
              console.log('Media Identity deleted:', response);
              this.notificationService.showNotification('Media Identity deleted successfully', 'success');
              this.loadMediaIdentities();
            },
            error => {
              console.error('Error deleting media identity:', error);
              this.notificationService.showNotification('Media Identity not deleted', 'error');
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
    this.updateMediaStatus(element);
  }
}
