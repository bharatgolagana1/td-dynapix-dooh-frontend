import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() filesSelected = new EventEmitter<File[]>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  files: File[] = [];

  onFileSelected(event: any): void {
    const selectedFiles: File[] = Array.from(event.target.files);
    this.files.push(...selectedFiles);
    this.filesSelected.emit(this.files);
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    this.files.push(...droppedFiles);
    this.filesSelected.emit(this.files);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  openFileSelector(): void {
    this.fileInput.nativeElement.click();
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filesSelected.emit(this.files);
  }
}
