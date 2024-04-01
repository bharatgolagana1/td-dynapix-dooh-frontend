import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchedulerService } from '../scheduler.service';

export interface Scheduler {
  cycleTime: number;
  slotSize: number;
  videoUrls: string;
  screenId: number;
}

@Component({
  selector: 'app-list-scheduler',
  templateUrl: './list-scheduler.component.html',
  styleUrls: ['./list-scheduler.component.scss']
})
export class ListSchedulerComponent implements OnInit, AfterViewInit {
  schedulers: any[] = [];
  displayedColumns: string[] = ['cycleTime', 'slotSize', 'videoUrls', 'screenId'];
  dataSource!: MatTableDataSource<any>; // Update Scheduler to any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private schedulerService: SchedulerService) {}

  ngOnInit(): void {
    this.schedulerService.getSchedulers().subscribe((schedulersList: any) => {
      
      if (schedulersList.schedules.length > 0) {
        console.log("list,",schedulersList.schedules )
        this.schedulers = schedulersList.schedules;
        this.dataSource = new MatTableDataSource<any>(schedulersList.schedules); 
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    
  }
}
