import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BookingService } from '../../booking.service';
@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss']
})
export class ListBookingComponent {
  displayedColumns: string[] = [
    'startDate', 'endDate', 'slotSize', 'totalAmount',
    'customerName', 'categoryType', 'screenIds', 'actions'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(): void {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.dataSource.data = bookings;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editBooking(booking: any): void {
    // Implement edit functionality
  }

  deleteBooking(bookingId: string): void {
    // Implement delete functionality
  }
}
