import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicCasesService } from '../../public-cases.service';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-edit-public-case',
  templateUrl: './edit-public-case.component.html',
  styleUrls: ['./edit-public-case.component.scss'],
})
export class EditPublicCaseComponent implements OnInit {
  editForm: FormGroup;
  caseStatus: any[] = [];
  userData: any;
  comments: any[] = [];
  publicCaseId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private publicCasesService: PublicCasesService,
    private keycloakOperationService: KeycloakOperationService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      customerName: [{ value: '', disabled: true }],
      caseType: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      caseStatus: [''],
      comment: [''],
    });
  }

  ngOnInit(): void {
    this.publicCaseId = this.route.snapshot.paramMap.get('id');
    if (this.publicCaseId) {
      this.loadPublicCaseDetails();
      this.loadCaseStatus();
      this.fetchUserData();
    }
  }

  loadCaseStatus(): void {
    this.publicCasesService.getCaseStatus().subscribe(
      (data: { caseStatus: any[] }) => {
        this.caseStatus = data.caseStatus;
      },
      (error) => {
        console.error('Error fetching case statuses:', error);
      }
    );
  }

  fetchUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.keycloakOperationService.getUserData().subscribe(
        (data) => {
          if (data && data.role && data.userName && data.organizationId) {
            this.userData = {
              userName: data.userName,
              role: data.role,
              organizationId: data.organizationId,
            };
            resolve();
          } else {
            console.error('Incomplete user data received:', data);
            reject(new Error('Incomplete user data received'));
          }
        },
        (error) => {
          console.error('Error fetching user data:', error);
          reject(error);
        }
      );
    });
  }

  loadPublicCaseDetails(): void {
    if (this.publicCaseId) {
      this.publicCasesService.getPublicCaseById(this.publicCaseId).subscribe(
        (publicCase) => {
          if (publicCase) {
            this.editForm.patchValue({
              customerName: publicCase.customerName,
              caseType: publicCase.caseType,
              phoneNumber: publicCase.phoneNumber,
              caseStatus: publicCase.caseStatus,
            });
            this.comments = publicCase.comments || [];
          }
        },
        (error) => {
          console.error('Error loading public case details:', error);
        }
      );
    }
  }

  onSave(): void {
    if (this.editForm.valid && this.userData) {
      const newComment = {
        comment: this.editForm.get('comment')?.value,
        commentedBy: this.userData.userName,
        role: this.userData.role,
        date: new Date(),
      };

      const updatedCase = {
        caseStatus: this.editForm.get('caseStatus')?.value,
        comments: [...this.comments, newComment],
      };

      if (this.publicCaseId) {
        this.publicCasesService.updatePublicCase(this.publicCaseId, updatedCase).subscribe(
          () => {
            this.notificationService.showNotification('Public Case updated successfully', 'success');
            this.router.navigate(['/public-cases-list']);
          },
          (error) => {
            console.error('Error updating case:', error);
            this.notificationService.showNotification('Error updating public case', 'error');
          }
        );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/publicCase']);
  }
}
