import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  role: string = '';
  status: string = 'active';
  displayedColumns: string[] = ['Role', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService:NotificationService
  ) {}

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.settingsService.getRoles().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addRole() {
    if (this.role) {
      this.settingsService.createRole(this.status, this.role)
        .subscribe(
          response => {
            this.notificationService.showNotification('Role added successfully', 'success');
            console.log('Role created:', response);
            this.role = ''; 
            this.loadRoles(); 
          },
          error => {
            console.error('Error creating role:', error);
            this.notificationService.showNotification('Failed to add Role', 'error');
          }
        );
    }
  }

  deleteRole(role: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete the role "${role}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteRole(role)
          .subscribe(
            response => {
              this.notificationService.showNotification('Role deleted successfully', 'success');
              console.log('Role deleted:', response);
              this.loadRoles(); 
            },
            error => {
              console.error('Error deleting role:', error);
              this.notificationService.showNotification('failed to delete Role', 'error');
            }
          );
      }
    });
  }
}
