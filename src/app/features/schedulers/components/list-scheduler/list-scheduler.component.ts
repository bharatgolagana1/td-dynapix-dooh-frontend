import { AfterViewInit, Component, OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
export class ListSchedulerComponent  implements OnInit,AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  
  schedulers: Scheduler[] = [
    {
     
      cycleTime: 1,
      slotSize: 5,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      screenId: 1236545,
    },
    {
      
      cycleTime: 2,
      slotSize: 10,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 234,
      
    }, 
     {
     
      cycleTime: 3,
      slotSize: 15,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      screenId: 345,
      
    },
    {
     
      cycleTime: 4,
      slotSize: 20,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 456,
      
    },
    {
     
      cycleTime: 5,
      slotSize: 25,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 567,
      
    },
    {
     
      cycleTime: 6,
      slotSize: 30,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 678,
      
    },
    {
     
      cycleTime: 7,
      slotSize: 35,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 789,
      
    },
    {
     
      cycleTime: 8,
      slotSize: 40,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 891,
      
    },
    {
     
      cycleTime: 9,
      slotSize: 45,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 912,
      
    },
    {
     
      cycleTime: 0,
      slotSize: 50,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 852,
      
    },
    {
     
      cycleTime: 5,
      slotSize: 25,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 567454354,
      
    },
    {
     
      cycleTime: 6,
      slotSize: 30,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 678,
      
    },
    {
     
      cycleTime: 7,
      slotSize: 35,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 789,
      
    },
    {
     
      cycleTime: 8,
      slotSize: 40,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 891,
      
    },
    {
     
      cycleTime: 9,
      slotSize: 45,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 912,
      
    },
    {
     
      cycleTime: 0,
      slotSize: 50,
      videoUrls: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      screenId: 852,
      
    },
        
    // Add more example users as needed
  ];
  dataSource = new MatTableDataSource<Scheduler>(this.schedulers);
  displayedColumns: string[] = [ 'cycleTime', 'slotSize', 'videoUrls','screenId'];
  constructor() { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    
  }
}
