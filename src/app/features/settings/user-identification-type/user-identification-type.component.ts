import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-user-identification-type',
  templateUrl: './user-identification-type.component.html',
  styleUrls: ['./user-identification-type.component.scss']
})
export class UserIdentificationTypeComponent implements OnInit {

  identificationType: string = '';
  status: string = 'active'; 

  displayedColumns: string[] = ['IdentificationType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService :NotificationService
  ) {}

  ngOnInit() {
    this.loadIdentificationTypes();
  }

  loadIdentificationTypes() {
    this.settingsService.getIdentificationTypes().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addIdentificationType() {
    if (this.identificationType) {
      this.settingsService.createIdentificationType(this.status, this.identificationType)
        .subscribe(
          response => {
            console.log('Identification Type created:', response);
            this.notificationService.showNotification('Identificationtype added successfully', 'success');
            this.identificationType = ''; 
            this.loadIdentificationTypes(); 
          },
          error => {
            console.error('Error creating identification type:', error);
            this.notificationService.showNotification('Identificationtype not added', 'error');
          }
        );
    }
  }

  deleteIdentificationType(type: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${type}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteIdentificationType(type)
          .subscribe(
            response => {
              console.log('Identification Type deleted:', response);
              this.notificationService.showNotification('Identificationtype deleted successfully', 'success');
              this.loadIdentificationTypes(); 
            },
            error => {
              console.error('Error deleting identification type:', error);
              this.notificationService.showNotification('Identificationtype not deleted', 'success');
            }
          );
      }
    });
  }
}
