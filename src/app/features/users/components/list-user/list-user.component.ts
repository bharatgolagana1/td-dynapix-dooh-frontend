import { Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  users:any = [];
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((usersList: any) => {
      if (usersList.users?.length > 0) {
        this.users = usersList.users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

 
}
