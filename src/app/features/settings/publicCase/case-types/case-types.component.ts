import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-case-types',
  templateUrl: './case-types.component.html',
  styleUrls: ['./case-types.component.scss']
})
export class CaseTypesComponent implements OnInit {
  caseType: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['caseType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCaseTypes();
  }

  loadCaseTypes() {
    this.settingsService.getCaseTypes().subscribe(data => {
      this.dataSource.data = data.caseTypes;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCaseType() {
    if (this.caseType) {
      this.settingsService.createCaseType( this.status ,this.caseType).subscribe(
        response => {
          this.notificationService.showNotification('Case Type added successfully', 'success');
          this.caseType = ''; 
          this.status = true; 
          this.loadCaseTypes(); 
        },
        error => {
          this.notificationService.showNotification('Error adding Case Type', 'error');
        }
      );
    } else {
      this.notificationService.showNotification('Case Type cannot be empty', 'error');
    }
  }

  updateCaseStatus(element: any) {
    this.settingsService.updateCaseTypeStatus(element.caseType, element.status).subscribe(
      response => {
        this.notificationService.showNotification('Case Type status updated successfully', 'success');
      },
      error => {
        this.notificationService.showNotification('Error updating Case Type status', 'error');
      }
    );
  }

  deleteCaseType(caseType: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${caseType}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteCaseType(caseType).subscribe(
          response => {
            this.notificationService.showNotification('Case Type deleted successfully', 'success');
            this.loadCaseTypes(); 
          },
          error => {
            this.notificationService.showNotification('Error deleting Case Type', 'error');
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