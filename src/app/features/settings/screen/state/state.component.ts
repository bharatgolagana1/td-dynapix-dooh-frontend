import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  stateName: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['stateName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadStates();
  }

  loadStates() {
    this.settingsService.getStates().subscribe(data => {
      this.dataSource.data = data.states;
      this.dataSource.paginator = this.paginator;
    });
  }

  addState() {
    if (this.stateName) {
      this.settingsService.createState(this.stateName, this.status)
        .subscribe(
          response => {
            console.log('State created:', response);
            this.notificationService.showNotification('State added successfully', 'success');
            this.stateName = ''; 
            this.status = true; 
            this.loadStates(); 
          },
          error => {
            console.error('Error creating state:', error);
            this.notificationService.showNotification('State not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('State not added because it was empty', 'error');
    }
  }

  updateStateStatus(element: any) {
    this.settingsService.updateStateStatus(element.stateName, element.status)
      .subscribe(
        response => {
          console.log('State status updated:', response);
          this.notificationService.showNotification('State status updated successfully', 'success');
        },
        error => {
          console.error('Error updating state status:', error);
          this.notificationService.showNotification('State status not updated', 'error');
        }
      );
  }

  deleteState(stateName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${stateName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteState(stateName)
          .subscribe(
            response => {
              console.log('State deleted:', response);
              this.notificationService.showNotification('State deleted successfully', 'success');
              this.loadStates(); 
            },
            error => {
              console.error('Error deleting state:', error);
              this.notificationService.showNotification('State not deleted', 'error');
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
    this.updateStateStatus(element);
  }
}
