import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss']
})
export class ListScreenComponent implements OnInit {
  screens: any[] = [];
  displayedColumns: string[] = ['image', 'screenName', 'nextAvailableDate', 'size', 'SFT', 'actions'];
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  search: string = '';

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadScreens();
  }

  openDialog(imageUrls: string[]) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      data: { images: imageUrls }
    });
  }

  loadScreens() {
    this.screenService.listScreens(this.page, this.limit, this.search).subscribe(
      data => {
        this.screens = data.screens;
        this.total = data.total;
      },
      error => {
        console.error('Error fetching screens:', error);
      }
    );
  }

  deleteScreen(id: string) {
    this.screenService.deleteScreen(id).subscribe(
      response => {
        this.notificationService.showNotification('Screen deleted successfully', 'success');
        this.loadScreens(); // Refresh the list
      },
      error => {
        console.error('Error deleting screen:', error);
        this.notificationService.showNotification('Error deleting screen', 'error');
      }
    );
  }

  editScreen(screenId: string) {
    // Navigate to the edit screen component with the screenId as a parameter
    this.router.navigate(['/updateScreen', screenId]);
  }

  onPageChange(event: any) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.loadScreens();
  }

  onSearchChange(event: any) {
    this.search = event.target.value;
    this.page = 1; // Reset to first page on new search
    this.loadScreens();
  }
}
