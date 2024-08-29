import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicCasesService } from '../../public-cases.service';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';

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
  userData: any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private publicCasesService: PublicCasesService,
    private keycloakOperationService: KeycloakOperationService,
    private notificationService: NotificationService,
  ) {
    this.publicCaseForm = this.fb.group({
      screenName: [''], 
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
    this.fetchUserData();
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

  fetchUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloakOperationService.getUserData().subscribe(
        (data) => {
          if (data && data.userId && data.email && data.organizationId) {
            this.userData = {
              userId: data.userId,
              userEmail: data.email,
              organizationId: data.organizationId,
            };
            console.log('User data fetched and set:', this.userData);
            resolve();
          } else {
            console.error('Incomplete user data received:', data);
            reject(new Error('Incomplete user data received'));
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching user data:', error);
          reject(error);
        }
      );
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
      const newScreenName: ScreenName = {
        screenName,
        serialNumber: 'NA', 
        location: 'NA', 
        screenId: 'NA' 
      };
      
      this.screenNames.push(newScreenName);
      this.publicCaseForm.get('screenName')?.reset(); 
    } else {
      console.warn('Screen Name is either empty or already exists');
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
      formData.append('organizationId', this.userData.organizationId);

      this.uploadedFiles.forEach((file, index) => {
        formData.append('mediaContent', file, file.name);
      });

      this.publicCasesService.createPublicCase(formData).subscribe({
        next: (response) => {
          console.log('Public case created successfully:', response);
          this.notificationService.showNotification('Public Case created successfully', 'success');
          this.router.navigate(['/successful-submission']);
        },
        error: (error) => console.error('Error creating public case', error)
      });
    } else {
      this.notificationService.showNotification('Error creating Public case', 'error');
    }
  }
}
