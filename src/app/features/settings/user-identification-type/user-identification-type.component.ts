import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-user-identification-type',
  templateUrl: './user-identification-type.component.html',
  styleUrls: ['./user-identification-type.component.scss']
})
export class UserIdentificationTypeComponent implements OnInit {

  identificationType: string = '';

  displayedColumns: string[] = ['IdentificationType', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.loadIdentificationTypes();
  }

  loadIdentificationTypes() {
    this.settingsService.getIdentificationTypes().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  addIdentificationType() {
    if (this.identificationType) {
      this.settingsService.createIdentificationType(this.identificationType)
        .subscribe(
          response => {
            console.log('Identification Type created:', response);
            this.identificationType = ''; 
            this.loadIdentificationTypes(); 
          },
          error => {
            console.error('Error creating identification type:', error);
          }
        );
    }
  }

  deleteIdentificationType(type: string) {
    this.settingsService.deleteIdentificationType(type)
      .subscribe(
        response => {
          console.log('Identification Type deleted:', response);
          this.loadIdentificationTypes(); 
        },
        error => {
          console.error('Error deleting identification type:', error);
        }
      );
  }
}