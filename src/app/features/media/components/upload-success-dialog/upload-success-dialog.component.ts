import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-success-dialog',
  templateUrl: './upload-success-dialog.component.html',
  styleUrls: ['./upload-success-dialog.component.scss']
})
export class UploadSuccessDialogComponent implements OnInit {
  ngOnInit() {
    setTimeout(() => {
      // The navigation action is handled in the parent component
    }, 3000);
  }
}
