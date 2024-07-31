import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../../screen.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { StatusConfirmDailogComponent } from '../status-confirm-dailog/status-confirm-dailog.component';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DateRangeDialogComponent } from '../date-range-dialog/date-range-dialog.component';
import { BindDeviceComponent } from '../bind-device/bind-device.component';

export interface Screen {
  _id: string;
  screenName: string;
  screenType: string;
  screenSize: string;
  SFT: string;
  NextAvailableDate: Date;
  address: string;
  locationCoordinates: string;
  screenStatus: string;
  createdAt: Date;
  imageUrls: string[];
  selected?: boolean; 
  Guuid?: string | null;
}

@Component({
  selector: 'app-screens-list',
  templateUrl: './screens-list.component.html',
  styleUrls: ['./screens-list.component.scss']
})
export class ScreensListComponent implements OnInit {
  screens: Screen[] = [];
  isLoading: boolean = true;
  filters = {
    addressOrPincode: '',
    screenType: 'Both',
    orientation: 'Both',
    status: 'Both',
    date: 'All Time',
    fromDate: null,
    toDate: null
  };
  allSelected: boolean = false;
  private filterSubject = new Subject<any>();

  dateOptions = [
    { value: 'All Time', label: 'All Time' },
    { value: 'Today', label: 'Today' },
    { value: 'Yesterday', label: 'Yesterday' },
    { value: 'This Month', label: 'This Month' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'This Year', label: 'This Year' },
    { value: 'Date Range', label: 'Date Range' }
  ];

  screenTypeOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Tvs', label: 'Tvs' },
    { value: 'Billboard', label: 'Billboard' }
  ];

  orientationOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Horizontal', label: 'Horizontal' },
    { value: 'Vertical', label: 'Vertical' }
  ];

  statusOptions = [
    { value: 'Both', label: 'Both' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  constructor(
    private screenService: ScreenService,
    private dialog: MatDialog
  ) {}

  openDialog(imageUrls: string[]) {
    this.dialog.open(ImageDialogComponent, {
      data: { images: imageUrls }
    });
  }

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
      this.loadScreens();
    });
    this.loadScreens();
  }

  onFilterChange() {
    if (this.filters.date === 'Date Range') {
      this.openDateRangeDialog();
    } else {
      this.filterSubject.next(this.filters);
    }
  }

  openDateRangeDialog(): void {
    const dialogRef = this.dialog.open(DateRangeDialogComponent, {
      width: '300px',
      data: { fromDate: this.filters.fromDate, toDate: this.filters.toDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filters.fromDate = result.fromDate;
        this.filters.toDate = result.toDate;
        this.filterSubject.next(this.filters);
      } else {
        this.filters.date = 'All Time';
        this.filterSubject.next(this.filters);
      }
    });
  }

  loadScreens() {
    this.screenService.screensList(this.filters).subscribe(
      (data: { screens: Screen[] }) => {
        this.screens = data.screens.map(screen => ({ ...screen, selected: false }));
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching screens:', error);
        this.isLoading = true;
      }
    );
  }

  toggleAllSelection(event: any) {
    this.allSelected = event.checked;
    this.screens.forEach(screen => screen.selected = this.allSelected);
  }

  someSelected(): boolean {
    const numSelected = this.screens.filter(screen => screen.selected).length;
    return numSelected > 0 && numSelected < this.screens.length;
  }

  onScreenCheckboxChange(event: any, screen: Screen) {
    screen.selected = event.checked;
    this.allSelected = this.screens.every(s => s.selected);
  }

  updateStatus(screen: Screen, newStatus: string) {
    if (newStatus === 'Inactive') {
      const dialogRef = this.dialog.open(StatusConfirmDailogComponent);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.screenService.updateScreenStatus(screen._id, newStatus).subscribe(
            updatedScreenData => {
              screen.screenStatus = newStatus;
            },
            error => {
              console.error('Error updating screen status:', error);
            }
          );
        }
      });
    } else {
      this.screenService.updateScreenStatus(screen._id, newStatus).subscribe(
        updatedScreenData => {
          screen.screenStatus = newStatus;
        },
        error => {
          console.error('Error updating screen status:', error);
        }
      );
    }
  }

  onBindTextClick(screen: any): void {
    const dialogRef = this.dialog.open(BindDeviceComponent, {
      width: '50%',
      data: { screen }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Device bound successfully:', result);
        this.loadScreens(); // Refresh the screen list
      }
    });
  }

  isDeviceBound(screen: any): boolean {
    return !!screen.Guuid; // Check if the screen has a bound device
  }
}
