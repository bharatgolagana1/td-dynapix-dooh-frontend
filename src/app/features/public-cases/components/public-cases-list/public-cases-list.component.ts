import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PublicCasesService } from '../../public-cases.service';
import { DeleteDialogPublicCaseComponent } from '../delete-dialog-public-case/delete-dialog-public-case.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { EditPublicCaseComponent } from '../edit-public-case/edit-public-case.component';

@Component({
  selector: 'app-public-cases-list',
  templateUrl: './public-cases-list.component.html',
  styleUrls: ['./public-cases-list.component.scss']
})
export class PublicCasesListComponent implements OnInit {
  displayedColumns: string[] = ['screenNames', 'customerName', 'caseStatus', 'caseType', 'phoneNumber', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]);
  totalCases = 0;
  pageIndex = 0;
  pageSize = 10;
  search = '';
  sortBy = 'createdAt';
  isLoading: boolean = false;
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private publicCasesService: PublicCasesService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadPublicCases();
  }

  loadPublicCases(): void {
    this.isLoading = true;
    this.publicCasesService.getPublicCases(this.pageIndex, this.pageSize, this.search, this.sortBy,)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.publicCases;
          this.totalCases = response.totalPublicCases;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching public cases', error);
          this.isLoading = false;
        }
        
      });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPublicCases();
  }

  onPageSizeChange(event:any): void {
    this.pageSize = event.pageSize;
    this.loadPublicCases();
  }

  onSearch(event:any): void {
    this.search = event.target.value;
    this.pageIndex = 0; 
    this.loadPublicCases();
  }
  editCase(publicCase: any): void {
    this.router.navigate(['/edit-publicCase', publicCase._id]);
  }

  deleteCase(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogPublicCaseComponent, {
      width: '400px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.publicCasesService.deletePublicCase(id).subscribe(
          (response) => {
            this.notificationService.showNotification('Public Case deleted successfully', 'success');
            this.loadPublicCases();
          },
          (error) => {
            console.error('Error deleting case:', error);
            this.notificationService.showNotification('Error deleting public case', 'error');
          }
        );
      }
    });
  }
  
}
