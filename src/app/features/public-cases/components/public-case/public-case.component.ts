import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicCasesService } from '../../public-cases.service';

interface ScreenName {
  screenName: string;
  serialNumber: string;
  location: string;
  screenId: string;
}

@Component({
  selector: 'app-public-case',
  templateUrl: './public-case.component.html',
  styleUrls: ['./public-case.component.scss']
})
export class PublicCaseComponent implements OnInit {
  publicCaseForm: FormGroup;
  isUploadVisible = false;
  uploadedFiles: File[] = [];
  screenNames: ScreenName[] = [];
  caseTypes: string[] = [];
  caseStatus: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private publicCasesService: PublicCasesService
  ) {
    this.publicCaseForm = this.fb.group({
      screenNames: this.fb.array([]),
      caseSubject: ['', Validators.required],
      caseType: ['', Validators.required],
      caseStatus: ['', Validators.required],
      caseDescription: ['', Validators.required],
      customerName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      documentsUpload: [false]
    });
  }

  ngOnInit(): void {
    this.loadCaseTypes();
    this.loadCaseStatus();
  }

  loadCaseTypes(): void {
    this.publicCasesService.getCaseTypes().subscribe({
      next: (types) => this.caseTypes = types,
      error: (error) => console.error('Error loading case types', error)
    });
  }

  loadCaseStatus(): void {
    this.publicCasesService.getCaseStatus().subscribe({
      next: (status) => this.caseStatus = status,
      error: (error) => console.error('Error loading case status', error)
    });
  }

  onCheckboxChange(event: any): void {
    this.isUploadVisible = event.checked;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files) {
      this.handleFiles(event.target.files);
    }
  }

  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedFiles.push(file);
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  addScreenName(): void {
    const screenName = this.publicCaseForm.get('screenName')?.value;
    if (screenName && !this.screenNames.some(name => name.screenName === screenName)) {
      this.screenNames.push({ screenName, serialNumber: 'NA', location: 'NA', screenId: 'NA' });
      this.publicCaseForm.get('screenName')?.reset();
    }
  }

  removeScreenName(screenName: ScreenName): void {
    this.screenNames = this.screenNames.filter(name => name !== screenName);
  }

  onSubmit(): void {
    if (this.publicCaseForm.valid) {
      const formData = new FormData();
      formData.append('screenNames', JSON.stringify(this.screenNames));
      formData.append('caseSubject', this.publicCaseForm.get('caseSubject')?.value);
      formData.append('caseType', this.publicCaseForm.get('caseType')?.value);
      formData.append('caseStatus', this.publicCaseForm.get('caseStatus')?.value);
      formData.append('caseDescription', this.publicCaseForm.get('caseDescription')?.value);
      formData.append('customerName', this.publicCaseForm.get('customerName')?.value);
      formData.append('phoneNumber', this.publicCaseForm.get('phoneNumber')?.value);

      this.uploadedFiles.forEach((file, index) => {
        formData.append('mediaContent', file, file.name); 
      });

      this.publicCasesService.createPublicCase(formData).subscribe({
        next: (response) => {
          console.log('Form Data:', response);
          this.router.navigate(['/successful-submission']);
        },
        error: (error) => console.error('Error creating public case', error)
      });
    }
  }
}
