import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizationService } from '../../organization.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrganizationComponent } from '../delete-organization/delete-organization.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'status', 'delete'];
  dataSource = new MatTableDataSource<any>();
  totalOrganizations = 0;
  pageSize = 10;
  pageIndex = 0;
  search = '';
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private organizationService: OrganizationService ,public dialog: MatDialog, private notificationService: NotificationService,) {}

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.isLoading = true;
    this.organizationService.getOrganizations(this.pageIndex + 1, this.pageSize, this.search)
      .subscribe((data) => {
        this.dataSource.data = data.organizations;
        this.totalOrganizations = data.totalPages * this.pageSize;
        this.isLoading = false;
      });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search = target.value.trim().toLowerCase();
    this.loadOrganizations();
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrganizations();
  }

  deleteOrganization(id: string) {
    const dialogRef = this.dialog.open(DeleteOrganizationComponent, {
      width: '400px',
      data: { id: id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.organizationService.deleteOrganization(id).subscribe(
          _response => {
            this.dataSource.data = this.dataSource.data.filter(organization => organization._id !== id);
            this.notificationService.showNotification('Organization deleted successfully', 'success');
          },
          error => {
            console.error('Error deleting organization:', error);
            this.notificationService.showNotification('Error deleting organization', 'error');
          }
        );
      }
    });
  }
  

}
