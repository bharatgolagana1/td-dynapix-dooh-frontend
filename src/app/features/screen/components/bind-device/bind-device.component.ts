import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ScreenService } from '../../screen.service';
import { FormControl } from '@angular/forms';
import { debounceTime, map, switchMap, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-bind-device',
  templateUrl: './bind-device.component.html',
  styleUrls: ['./bind-device.component.scss']
})
export class BindDeviceComponent implements OnInit {
  searchControl = new FormControl('');
  devices: any[] = [];
  filteredDevices!: Observable<any[]>;
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
      this.filteredDevices = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map((value:any) => this.filterDevices(value))
      );
      this.loaderService.hideLoader();
    });
  }

  filterDevices(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.devices.filter(device => device.Guuid.toLowerCase().includes(filterValue));
  }

  onDeviceSelect(guuid: string): void {
    this.selectedDevice = this.devices.find(device => device.Guuid === guuid);
  }

  onBind(): void {
    if (this.selectedDevice) {
      this.loaderService.showLoader();
      this.screenService.bindDevice(this.selectedDevice.Guuid, this.data.screen._id).subscribe(response => {
        this.loaderService.hideLoader();
        this.dialogRef.close(true); 
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
