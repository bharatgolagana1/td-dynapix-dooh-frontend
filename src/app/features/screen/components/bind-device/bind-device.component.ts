import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ScreenService } from '../../screen.service';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bind-device',
  templateUrl: './bind-device.component.html',
  styleUrls: ['./bind-device.component.scss']
})
export class BindDeviceComponent {
  searchControl = new FormControl('');
  devices: any[] = [];
  filteredDevices: any[] = [];
  selectedDevice: any;

  constructor(
    public dialogRef: MatDialogRef<BindDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private screenService: ScreenService,
    private loaderService: LoaderService
  ) {}
  
  ngOnInit(): void {
    this.loaderService.showLoader();
    this.screenService.listUnboundDevices().subscribe(devices => {
      this.devices = devices;
      this.filteredDevices = devices;
      this.loaderService.hideLoader();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map(value => value ? value : ''), // Handle null values
      map(value => {
        this.loaderService.showLoader();
        return this.filterDevices(value);
      })
    ).subscribe(filtered => {
      this.filteredDevices = filtered;
      this.loaderService.hideLoader();
    });
  }

  filterDevices(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.devices.filter(device => device.Guuid.toLowerCase().includes(filterValue));
  }

  onDeviceSelect(device: any): void {
    this.selectedDevice = device;
  }

  onBind(): void {
    if (this.selectedDevice) {
      this.loaderService.showLoader();
      this.screenService.bindDevice(this.selectedDevice.Guuid, this.data.screen._id).subscribe(response => {
        this.loaderService.hideLoader();
        this.dialogRef.close(true); // Pass true to indicate success
      }, error => {
        this.loaderService.hideLoader();
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  isLoading(): Observable<boolean> {
    return this.loaderService.loaderState;
  }
}
