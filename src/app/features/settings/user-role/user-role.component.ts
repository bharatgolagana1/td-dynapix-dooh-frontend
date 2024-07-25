import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  role: string = '';
  displayedColumns: string[] = ['Role', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private settingsService: SettingsService) {}

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
      this.settingsService.createRole(this.role)
        .subscribe(
          response => {
            console.log('Role created:', response);
            this.role = ''; 
            this.loadRoles(); 
          },
          error => {
            console.error('Error creating role:', error);
          }
        );
    }
  }

  deleteRoles(role: string) {
    this.settingsService.deleteRole(role)
      .subscribe(
        response => {
          console.log('Role deleted:', response);
          this.loadRoles(); 
        },
        error => {
          console.error('Error deleting role:', error);
        }
      );
  }
}
