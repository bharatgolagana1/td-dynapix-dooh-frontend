import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-media-video-dialog',
  templateUrl: './list-media-video-dialog.component.html',
  styleUrls: ['./list-media-video-dialog.component.scss']
})
export class ListMediaVideoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { videoUrl: string }) {}
}
