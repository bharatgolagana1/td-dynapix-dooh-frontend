import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../settings.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-category-option-settings',
  templateUrl: './category-option-settings.component.html',
  styleUrls: ['./category-option-settings.component.scss']
})
export class CategoryOptionSettingsComponent implements OnInit {

  categoryType: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['categoryType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCategoryOptions();
  }

  loadCategoryOptions() {
    this.settingsService.getCategoryOptions().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCategoryType() {
    if (this.categoryType) {
      this.settingsService.createCategoryOption(this.status, this.categoryType)
        .subscribe(
          response => {
            console.log('categoryType created:', response);
            this.notificationService.showNotification('CategoryType added successfully', 'success');
            this.categoryType = ''; 
            this.status = true,
            this.loadCategoryOptions(); 
          },
          error => {
            console.error('Error creating categoryType:', error);
            this.notificationService.showNotification('CategoryType not added', 'error');
          }
        );
    }
  }

  updateCategoryOptionStatus(element: any) {
    this.settingsService.updateCategoryOption(element.categoryOption, element.status)
      .subscribe(
        response => {
          console.log('Category Option status updated:', response);
          this.notificationService.showNotification('Category Option status updated successfully', 'success');
        },
        error => {
          console.error('Error updating category option status:', error);
          this.notificationService.showNotification('Category Option status not updated', 'error');
        }
      );
  }

  deleteCategoryType(categoryOption: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${categoryOption}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteCategoryOption(categoryOption)
          .subscribe(
            response => {
              console.log('Category Option deleted:', response);
              this.notificationService.showNotification('Category Option deleted successfully', 'success');
              this.loadCategoryOptions(); 
            },
            error => {
              console.error('Error deleting category option:', error);
              this.notificationService.showNotification('Category Option not deleted', 'error');
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
    this.updateCategoryOptionStatus(element);
  }
}
