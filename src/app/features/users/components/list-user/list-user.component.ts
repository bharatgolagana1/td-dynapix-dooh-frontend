import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


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
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'role', 'createdAt', 'updatedAt'];
  dataSource!: MatTableDataSource<User>;
  totalUsers: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(pageIndex: number = 0,pageSize: number=0): void {
    this.userService.getUsers(pageIndex + 1, this.pageSize, this.searchValue).subscribe((usersList: any) => {
      this.dataSource = new MatTableDataSource<User>(usersList.users);
      this.totalUsers = usersList.totalUsers;
      this.pageIndex = usersList.pageIndex - 1;
      this.dataSource.paginator = this.paginator;
    });
  }

  onPageChange(event: PageEvent): void {
    this.loadUsers(event.pageIndex);
  }

  onSearch(event: any): void {
    this.searchValue = event.target.value.trim().toLowerCase();
    this.loadUsers();
  }
}


