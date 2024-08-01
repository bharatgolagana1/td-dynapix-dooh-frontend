import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  customerName: string;
  iconName: string;
  contactNo: number;
  emailAddress: string;
  creditPeriod: number;
  outstandingDays: number;
  inventoryNAme: string;
  region: string;
  city: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { customerName: 'Ankit', iconName: 'owner', contactNo: 9162609989, emailAddress: 'ankit01@gmail.com', creditPeriod: 25, outstandingDays: 250 ,inventoryNAme: 'Dynapix',region: 'North', city:'Delhi'},
  { customerName: 'Ankit', iconName: 'owner', contactNo: 9162609989, emailAddress: 'ankit01@gmail.com', creditPeriod: 25, outstandingDays: 250 ,inventoryNAme: 'Dynapix',region: 'North', city:'Delhi'},
  { customerName: 'Ankit', iconName: 'owner', contactNo: 9162609989, emailAddress: 'ankit01@gmail.com', creditPeriod: 25, outstandingDays: 250 ,inventoryNAme: 'Dynapix',region: 'North', city:'Delhi'},
  { customerName: 'Ankit', iconName: 'owner', contactNo: 9162609989, emailAddress: 'ankit01@gmail.com', creditPeriod: 25, outstandingDays: 250 ,inventoryNAme: 'Dynapix',region: 'North', city:'Delhi'},
];


@Component({
  selector: 'app-outstanding-payments',
  templateUrl: './outstanding-payments.component.html',
  styleUrls: ['./outstanding-payments.component.scss']
})
export class OutstandingPaymentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['customerName','contactNo','emailAddress','creditPeriod','outstandingDays','inventoryNAme','region','city'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
