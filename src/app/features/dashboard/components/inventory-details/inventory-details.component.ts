import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  inventoryName: string;
  revenue: string;
  expiryDate: string;
  ratings: string;
  ratedBy: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { inventoryName: 'Dynapix', revenue: '₹250k',ratings: '' ,ratedBy: 250, expiryDate: 'July 20, 2024'},
  { inventoryName: 'Dynapix', revenue: '₹250k',ratings: '' ,ratedBy: 250, expiryDate: 'July 20, 2024'},
  { inventoryName: 'Dynapix', revenue: '₹250k',ratings: '' ,ratedBy: 250, expiryDate: 'July 20, 2024'},
  { inventoryName: 'Dynapix', revenue: '₹250k',ratings: '' ,ratedBy: 250, expiryDate: 'July 20, 2024'},
];

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.scss']
})
export class InventoryDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['inventoryName', 'revenue','ratings','ratedBy','expiryDate'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
