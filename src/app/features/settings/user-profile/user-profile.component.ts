import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profile: string = '';
  status: boolean = true; // Default to true when adding

  displayedColumns: string[] = ['profile', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    this.settingsService.getProfiles().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addProfile() {
    if (this.profile) {
      this.settingsService.createProfile(this.status, this.profile)
        .subscribe(
          response => {
            console.log('Profile created:', response);
            this.notificationService.showNotification('Profile added successfully', 'success');
            this.profile = ''; 
            this.status = true; // Reset status to default
            this.loadProfiles(); 
          },
          error => {
            console.error('Error creating profile:', error);
            this.notificationService.showNotification('Profile not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Profile not added because it was empty', 'error');
    }
  }

  updateProfileStatus(element: any) {
    this.settingsService.updateProfileStatus(element.profile, element.status)
      .subscribe(
        response => {
          console.log('Profile status updated:', response);
          this.notificationService.showNotification('Profile status updated successfully', 'success');
        },
        error => {
          console.error('Error updating profile status:', error);
          this.notificationService.showNotification('Profile status not updated', 'error');
        }
      );
  }

  deleteProfile(profile: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete the profile "${profile}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteProfile(profile)
          .subscribe(
            response => {
              console.log('Profile deleted:', response);
              this.notificationService.showNotification('Profile deleted successfully', 'success');
              this.loadProfiles(); 
            },
            error => {
              console.error('Error deleting profile:', error);
              this.notificationService.showNotification('Profile not deleted', 'error');
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
    this.updateProfileStatus(element);
  }
}
