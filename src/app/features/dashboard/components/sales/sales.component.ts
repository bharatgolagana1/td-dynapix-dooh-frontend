import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  userName: string;
  numberOfSales: number ;
  iconName:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { userName: 'Ankit', numberOfSales: 10, iconName:'owner'},
  { userName: 'Ankit', numberOfSales: 10, iconName:'owner'},
  { userName: 'Ankit', numberOfSales: 10, iconName:'owner'},
  { userName: 'Ankit', numberOfSales: 10, iconName:'owner'},
  
];

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, AfterViewInit {
  selectedMonth: string;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    this.selectedMonth = this.months[0]; 
  }
  displayedColumns: string[] = ['userName', 'numberOfSales',];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onMonthChange(event: any): void {
    console.log('Selected Month:', this.selectedMonth);
  }
}
