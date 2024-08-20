import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-customer-name-settings',
  templateUrl: './customer-name-settings.component.html',
  styleUrls: ['./customer-name-settings.component.scss']
})
export class CustomerNameSettingsComponent implements OnInit {

  customerName: string = '';
  status: boolean = true; // Default to false when adding

  displayedColumns: string[] = ['customerName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCustomerNames();
  }

  loadCustomerNames() {
    this.settingsService.getCustomerNames().subscribe(data => {
      this.dataSource.data = data.customerNames;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCustomerName() {
    if (this.customerName) {
      this.settingsService.createCustomerName(this.customerName, this.status)
        .subscribe(
          response => {
            console.log('Customer Name created:', response);
            this.notificationService.showNotification('Customer Name added successfully', 'success');
            this.customerName = ''; 
            this.status = true; // Reset status to default
            this.loadCustomerNames(); 
          },
          error => {
            console.error('Error creating customer name:', error);
            this.notificationService.showNotification('Customer Name not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Customer Name not added because it was empty', 'error');
    }
  }

  updateCustomerStatus(element: any) {
    this.settingsService.updateCustomerNameStatus(element.name, element.status)
      .subscribe(
        response => {
          console.log('Customer Name status updated:', response);
          this.notificationService.showNotification('Customer Name status updated successfully', 'success');
        },
        error => {
          console.error('Error updating customer name status:', error);
          this.notificationService.showNotification('Customer Name status not updated', 'error');
        }
      );
  }

  deleteCustomerName(name: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteCustomerName(name)
          .subscribe(
            response => {
              console.log('Customer Name deleted:', response);
              this.notificationService.showNotification('Customer Name deleted successfully', 'success');
              this.loadCustomerNames(); 
            },
            error => {
              console.error('Error deleting customer name:', error);
              this.notificationService.showNotification('Customer Name not deleted', 'error');
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
    this.updateCustomerStatus(element);
  }
}
