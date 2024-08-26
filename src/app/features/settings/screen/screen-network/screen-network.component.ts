import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-screen-network',
  templateUrl: './screen-network.component.html',
  styleUrls: ['./screen-network.component.scss']
})
export class ScreenNetworkComponent implements OnInit {

  networkName: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['networkName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadScreenNetworks();
  }

  loadScreenNetworks() {
    this.settingsService.getScreenNetworks().subscribe(data => {
      this.dataSource.data = data.screenNetworks;
      this.dataSource.paginator = this.paginator;
    });
  }

  addScreenNetwork() {
    if (this.networkName) {
      this.settingsService.createScreenNetwork(this.networkName, this.status)
        .subscribe(
          response => {
            console.log('Screen Network created:', response);
            this.notificationService.showNotification('Screen Network added successfully', 'success');
            this.networkName = ''; 
            this.status = true; 
            this.loadScreenNetworks(); 
          },
          error => {
            console.error('Error creating screen network:', error);
            this.notificationService.showNotification('Screen Network not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Screen Network not added because it was empty', 'error');
    }
  }

  updateScreenNetworkStatus(element: any) {
    this.settingsService.updateScreenNetworkStatus(element.networkName, element.status)
      .subscribe(
        response => {
          console.log('Screen Network status updated:', response);
          this.notificationService.showNotification('Screen Network status updated successfully', 'success');
        },
        error => {
          console.error('Error updating screen network status:', error);
          this.notificationService.showNotification('Screen Network status not updated', 'error');
        }
      );
  }

  deleteScreenNetwork(networkName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${networkName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteScreenNetwork(networkName)
          .subscribe(
            response => {
              console.log('Screen Network deleted:', response);
              this.notificationService.showNotification('Screen Network deleted successfully', 'success');
              this.loadScreenNetworks(); 
            },
            error => {
              console.error('Error deleting screen network:', error);
              this.notificationService.showNotification('Screen Network not deleted', 'error');
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
    this.updateScreenNetworkStatus(element);
  }
}
