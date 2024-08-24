import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenService } from '../../screen.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteScreenListComponent } from '../delete-screen-list/delete-screen-list.component';

@Component({
  selector: 'app-list-screen',
  templateUrl: './list-screen.component.html',
  styleUrls: ['./list-screen.component.scss'],
})
export class ListScreenComponent implements OnInit {
  screens: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  total: number = 0;
  search: string = '';
  isLoading: boolean = false;

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
      data: { images: imageUrls },
    });
  }

  loadScreens() {
    this.isLoading = true;
    this.screenService
      .listScreens(this.page, this.pageSize, this.search)
      .subscribe(
        (data) => {
          this.screens = data.screens;
          this.total = data.screens.total;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching screens:', error);
          this.isLoading = false;
        }
      );
  }

  deleteScreen(id: string) {
    const dialogRef = this.dialog.open(DeleteScreenListComponent, {
      width: '400px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.screenService.deleteScreen(id).subscribe(
          (response) => {
            this.notificationService.showNotification(
              'Screen deleted successfully',
              'success'
            );
            this.loadScreens();
          },
          (error) => {
            console.error('Error deleting screen:', error);
            this.notificationService.showNotification(
              'Error deleting screen',
              'error'
            );
            this.isLoading = false;
          }
        );
      }
    });
  }

  editScreen(screenId: string) {
    this.router.navigate(['/updateScreen', screenId]);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadScreens();
  }

  onSearchChange(event: any) {
    this.search = event.target.value;
    this.page = 1;
    this.loadScreens();
  }
}
