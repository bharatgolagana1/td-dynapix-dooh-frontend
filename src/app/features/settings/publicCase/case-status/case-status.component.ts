import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['./case-status.component.scss']
})
export class CaseStatusComponent implements OnInit {
  caseStatus: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['caseStatus', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCaseStatuses();
  }

  loadCaseStatuses() {
    this.settingsService.getCaseStatuses().subscribe(data => {
      this.dataSource.data = data.caseStatus;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCaseStatus() {
    if (this.caseStatus) {
      this.settingsService.createCaseStatus(this.status, this.caseStatus).subscribe(
        response => {
          this.notificationService.showNotification('Case Status added successfully', 'success');
          this.caseStatus = ''; 
          this.status = true; 
          this.loadCaseStatuses(); 
        },
        error => {
          this.notificationService.showNotification('Error adding Case Status', 'error');
        }
      );
    } else {
      this.notificationService.showNotification('Case Status cannot be empty', 'error');
    }
  }

  updateCaseStatus(element: any) {
    this.settingsService.updateCaseStatusStatus(element.caseStatus, element.status).subscribe(
      response => {
        this.notificationService.showNotification('Case Status updated successfully', 'success');
      },
      error => {
        this.notificationService.showNotification('Error updating Case Status', 'error');
      }
    );
  }

  deleteCaseStatus(caseStatus: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${caseStatus}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteCaseStatus(caseStatus).subscribe(
          response => {
            this.notificationService.showNotification('Case Status deleted successfully', 'success');
            this.loadCaseStatuses(); 
          },
          error => {
            this.notificationService.showNotification('Error deleting Case Status', 'error');
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
    this.updateCaseStatus(element);
  }
}