import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-screen-category',
  templateUrl: './screen-category.component.html',
  styleUrls: ['./screen-category.component.scss']
})
export class ScreenCategoryComponent implements OnInit {

  categoryName: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['categoryName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadScreenCategories();
  }

  loadScreenCategories() {
    this.settingsService.getScreenCategories().subscribe(data => {
      this.dataSource.data = data.screenCategories;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCategory() {
    if (this.categoryName) {
      this.settingsService.createScreenCategory(this.categoryName, this.status)
        .subscribe(
          response => {
            console.log('Screen Category created:', response);
            this.notificationService.showNotification('Screen Category added successfully', 'success');
            this.categoryName = ''; 
            this.status = true; 
            this.loadScreenCategories(); 
          },
          error => {
            console.error('Error creating screen category:', error);
            this.notificationService.showNotification('Screen Category not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('Screen Category not added because it was empty', 'error');
    }
  }

  updateCategoryStatus(element: any) {
    this.settingsService.updateScreenCategoryStatus(element.categoryName, element.status)
      .subscribe(
        response => {
          console.log('Screen Category status updated:', response);
          this.notificationService.showNotification('Screen Category status updated successfully', 'success');
        },
        error => {
          console.error('Error updating screen category status:', error);
          this.notificationService.showNotification('Screen Category status not updated', 'error');
        }
      );
  }

  deleteCategory(categoryName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${categoryName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteScreenCategory(categoryName)
          .subscribe(
            response => {
              console.log('Screen Category deleted:', response);
              this.notificationService.showNotification('Screen Category deleted successfully', 'success');
              this.loadScreenCategories(); 
            },
            error => {
              console.error('Error deleting screen category:', error);
              this.notificationService.showNotification('Screen Category not deleted', 'error');
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
    this.updateCategoryStatus(element);
  }
}
