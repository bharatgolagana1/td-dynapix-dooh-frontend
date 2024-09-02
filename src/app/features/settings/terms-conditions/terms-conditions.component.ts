import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {

  termsConditions: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['IdentificationType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadTermsAndConditions();
  }

  loadTermsAndConditions() {
    this.settingsService.getTermsAndConditions().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addTermsConditions() {
    if (this.termsConditions) {
      this.settingsService.createTermsAndConditions(this.termsConditions, this.status)
        .subscribe(
          response => {
            console.log('Terms and Conditions created:', response);
            this.notificationService.showNotification('Terms and Conditions added successfully', 'success');
            this.termsConditions = ''; 
            this.loadTermsAndConditions(); 
          },
          error => {
            console.error('Error creating Terms and Conditions:', error);
            this.notificationService.showNotification('Terms and Conditions not added', 'error');
          }
        );
    }
  }

  deleteTermsConditions(element: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete this item?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteTermsAndConditions(element._id)
          .subscribe(
            response => {
              console.log('Terms and Conditions deleted:', response);
              this.notificationService.showNotification('Terms and Conditions deleted successfully', 'success');
              this.loadTermsAndConditions(); 
            },
            error => {
              console.error('Error deleting Terms and Conditions:', error);
              this.notificationService.showNotification('Terms and Conditions not deleted', 'error');
            }
          );
      }
    });
  }
}
