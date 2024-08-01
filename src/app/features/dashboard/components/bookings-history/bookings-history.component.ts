import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  profile: string;
  iconName: string;
  inventoryName: string;
  runningAds: string;
  expiryDate: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' },
  { profile: 'Ankit', iconName: 'owner', inventoryName: 'Dynapix', runningAds: 'Unlock the secret to limit....', expiryDate: 'July 20, 2024' }
];

@Component({
  selector: 'app-bookings-history',
  templateUrl: './bookings-history.component.html',
  styleUrls: ['./bookings-history.component.scss']
})
export class BookingsHistoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['profile', 'inventoryName', 'runningAds', 'expiryDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
