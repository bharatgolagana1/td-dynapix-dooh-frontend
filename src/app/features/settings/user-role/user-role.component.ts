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
  status: boolean = true; // Default to true when adding

  displayedColumns: string[] = ['role', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
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
            console.log('Role created:', response);
            this.notificationService.showNotification('Role added successfully', 'success');
            this.role = ''; 
            this.status = true; // Reset status to default
            this.loadRoles(); 
          },
          error => {
            console.error('Error creating role:', error);
            this.notificationService.showNotification('Role not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Role not added because it was empty', 'error');
    }
  }

  updateRoleStatus(element: any) {
    this.settingsService.updateRoleStatus(element.role, element.status)
      .subscribe(
        response => {
          console.log('Role status updated:', response);
          this.notificationService.showNotification('Role status updated successfully', 'success');
        },
        error => {
          console.error('Error updating role status:', error);
          this.notificationService.showNotification('Role status not updated', 'error');
        }
      );
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
              console.log('Role deleted:', response);
              this.notificationService.showNotification('Role deleted successfully', 'success');
              this.loadRoles(); 
            },
            error => {
              console.error('Error deleting role:', error);
              this.notificationService.showNotification('Role not deleted', 'error');
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
    this.updateRoleStatus(element);
  }
}
