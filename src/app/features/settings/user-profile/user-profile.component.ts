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
  status: string = 'active';
  displayedColumns: string[] = ['Profile', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService:NotificationService
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
            this.notificationService.showNotification('Profile added successfully', 'success');
            console.log('Profile created:', response);
            this.profile = ''; 
            this.loadProfiles(); 
          },
          error => {
            console.error('Error creating profile:', error);
            this.notificationService.showNotification('Failed to add Profile', 'error');
          }
        );
    }
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
              this.notificationService.showNotification('Profile deleted successfully', 'success');
              console.log('Profile deleted:', response);
              this.loadProfiles();
            },
            error => {
              console.error('Error deleting profile:', error);
              this.notificationService.showNotification('failed to delete Profile', 'error');
            }
          );
      }
    });
  }
}
