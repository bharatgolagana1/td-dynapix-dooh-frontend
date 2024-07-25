import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profile: string = '';
  displayedColumns: string[] = ['Profile', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private settingsService: SettingsService) {}

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
      this.settingsService.createProfile(this.profile)
        .subscribe(
          response => {
            console.log('Profile created:', response);
            this.profile = ''; 
            this.loadProfiles(); 
          },
          error => {
            console.error('Error creating profile:', error);
          }
        );
    }
  }

  deleteProfile(profile: string) {
    this.settingsService.deleteProfile(profile)
      .subscribe(
        response => {
          console.log('Profile deleted:', response);
          this.loadProfiles();
        },
        error => {
          console.error('Error deleting profile:', error);
        }
      );
  }
}
