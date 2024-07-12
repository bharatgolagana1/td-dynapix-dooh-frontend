import { Component, OnInit } from '@angular/core';
import { Module, Permission, Role, Task } from '../../models/role.model';
import { RolesService } from '../../services/roles.service';
import { ModulesService } from '../../services/modules.service';
import { TasksService } from '../../services/tasks.service';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'app-roles-matrix',
  templateUrl: './roles-matrix.component.html',
  styleUrls: ['./roles-matrix.component.scss'],
})
export class RolesMatrixComponent implements OnInit {
  modules: Module[] = [];
  roles: Role[] = [];
  tasks: Task[] = [];
  permissions: Permission[] = [];
  displayedColumns!: string[];
  showLoader = false;

  constructor(
    private rolesService: RolesService,
    private modulesService: ModulesService,
    private tasksService: TasksService,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.showLoader = true; // Set loader to visible while fetching data
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.updateColumns();
      },
      complete: () => this.checkDataLoaded(),
    });
    this.modulesService.getModules().subscribe({
      next: (modules) => (this.modules = modules),
      complete: () => this.checkDataLoaded(),
    });
    this.tasksService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      complete: () => this.checkDataLoaded(),
    });
    this.permissionsService.getPermissions().subscribe({
      next: (permissions) => (this.permissions = permissions),
      complete: () => this.checkDataLoaded(),
    });
  }

  updateColumns(): void {
    this.displayedColumns = [
      'moduleName',
      'tasks',
      ...this.roles.map((r) => `role-${r.id}`),
    ];
  }

  checkDataLoaded(): void {
    // Checks if all data is loaded
    if (
      this.roles.length &&
      this.modules.length &&
      this.tasks.length &&
      this.permissions.length
    ) {
      this.showLoader = false; // Hide loader when all data is loaded
    }
  }
  isChecked(taskId: string, roleId: string): boolean {
    return !!this.permissions.find(
      (p) => p.taskId === taskId && p.roleId === roleId && p.enable
    );
  }

  togglePermission(taskId: string, roleId: string, checked: boolean): void {
    const index = this.permissions.findIndex(
      (p) => p.taskId === taskId && p.roleId === roleId
    );
    if (index !== -1) {
      // Toggle the enable status
      this.permissions[index].enable = checked;
    } else {
      // Add a new permission if it doesn't exist
      this.permissions.push({ taskId, roleId, enable: checked });
    }
    // Optionally, call an API to update the server-side data
    this.updatePermissionsOnServer();
  }

  updatePermissionsOnServer(): void {
    // this.permissionsService.updatePermissions(this.permissions).subscribe({
    //   next: () => console.log('Permissions updated successfully!'),
    //   error: (err) => console.error('Failed to update permissions', err),
    // });
  }
}
