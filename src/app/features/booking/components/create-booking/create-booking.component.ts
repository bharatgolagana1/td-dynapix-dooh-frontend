import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  slotOptions = [
    { label: '5 sec', value: 5 },
    { label: '10 sec', value: 10 },
    { label: '15 sec', value: 15 },
    { label: '20 sec', value: 20 },
    { label: '25 sec', value: 25 },
    { label: '30 sec', value: 30 },
    { label: '35 sec', value: 35 },
    { label: '40 sec', value: 40 },
    { label: '45 sec', value: 45 },
    { label: '50 sec', value: 50 },
    { label: '55 sec', value: 55 },
    { label: '60 sec', value: 60 },
  ];
  constructor() {}
  isSubmitting: boolean = false;
  private formBuilder!: FormBuilder;
  selectedScreenIds: string[] = [];
  dateRange!: FormGroup;

  selectedSlotSize!: string;
  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      slotSize: ['', [Validators.required]],
      dateRange: this.formBuilder.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }),
      categoryType: ['', Validators.required],
    });
  }

  dateFilter = function (a: Date | null): boolean {
    const today = new Date();
    if (a) {
      const formattedToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const formattedDate = new Date(
        a.getFullYear(),
        a.getMonth(),
        a.getDate()
      );
      return formattedDate >= formattedToday;
    }
    return false;
  };
  onSubmit() {
    if (this.bookingForm.valid) {
      console.log('Form Submitted!', this.bookingForm.value);
      // API call to get available screens
    }
  }
  onContinue() {}

  onDateChange(): void {
    const datePipe = new DatePipe('en-US');
    const formattedStartDate = datePipe.transform(
      this.dateRange.value.startDate,
      'dd-MM-yyyy'
    );
    const formattedEndDate = datePipe.transform(
      this.dateRange.value.endDate,
      'dd-MM-yyyy'
    );
    this.dateRange.patchValue({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  }
}
