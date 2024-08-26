import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../settings.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-city-name',
  templateUrl: './city-name.component.html',
  styleUrls: ['./city-name.component.scss']
})
export class CityNameComponent implements OnInit {

  cityName: string = '';
  status: boolean = true; 

  displayedColumns: string[] = ['cityName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadCityNames();
  }

  loadCityNames() {
    this.settingsService.getCityNames().subscribe(data => {
      this.dataSource.data = data.cityNames;
      this.dataSource.paginator = this.paginator;
    });
  }

  addCityName() {
    if (this.cityName) {
      this.settingsService.createCityName(this.cityName, this.status)
        .subscribe(
          response => {
            console.log('City Name created:', response);
            this.notificationService.showNotification('City Name added successfully', 'success');
            this.cityName = ''; 
            this.status = true; 
            this.loadCityNames(); 
          },
          error => {
            console.error('Error creating city name:', error);
            this.notificationService.showNotification('City Name not added', 'error');
          }
        );
    } else {
      this.notificationService.showNotification('City Name not added because it was empty', 'error');
    }
  }

  updateCityStatus(element: any) {
    this.settingsService.updateCityNameStatus(element.cityName, element.status)
      .subscribe(
        response => {
          console.log('City Name status updated:', response);
          this.notificationService.showNotification('City Name status updated successfully', 'success');
        },
        error => {
          console.error('Error updating city name status:', error);
          this.notificationService.showNotification('City Name status not updated', 'error');
        }
      );
  }

  deleteCityName(cityName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${cityName}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.settingsService.deleteCityName(cityName)
          .subscribe(
            response => {
              console.log('City Name deleted:', response);
              this.notificationService.showNotification('City Name deleted successfully', 'success');
              this.loadCityNames(); 
            },
            error => {
              console.error('Error deleting city name:', error);
              this.notificationService.showNotification('City Name not deleted', 'error');
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
    this.updateCityStatus(element);
  }
}