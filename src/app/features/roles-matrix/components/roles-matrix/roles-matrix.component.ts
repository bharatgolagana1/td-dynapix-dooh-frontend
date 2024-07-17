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

    console.log(this.modules); // Assuming 'modules' is the data used in your table
    console.log(this.tasks);
  }

  fetchData(): void {
    this.showLoader = true; // Set loader to visible while fetching data
    this.rolesService.getRoles().subscribe({
      next: (roles) => {
        this.roles.push(...roles);
        this.updateColumns();
      },
      complete: () => this.checkDataLoaded(),
    });
    this.modulesService.getModules().subscribe({
      next: (modules) => {
        console.log(modules, 'modules in APP_ID');
        this.modules.push(...modules);
      },
      complete: () => this.checkDataLoaded(),
    });
    this.tasksService.getTasks().subscribe({
      next: (tasks) => {
        console.log(tasks, 'tasks');
        this.tasks.push(...tasks);
      },
      complete: () => this.checkDataLoaded(),
    });
    this.permissionsService.getPermissions().subscribe({
      next: (permissions) => {
        console.log(permissions, 'permissions');
        this.permissions.push(...permissions);
      },
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
    if (this.roles.length && this.modules.length && this.tasks.length) {
      this.showLoader = false;
    }
  }

  handleNewRole(): void {
    const name = prompt('Please enter new role name:');
    if (name !== null) {
      const newRole = { id: String(this.roles.length), name };

      this.rolesService
        .createRoles({ name, value: name.toLowerCase() })
        .subscribe({
          next: (response) => {
            this.roles.push(newRole);
            // Handle success message
          },
          error: () => {
            // Handle error message
          },
        });
    }
  }

  handleNewModule(name: string): void {
    this.modulesService
      .createModule({ name, value: name.toLowerCase() })
      .subscribe({
        next: (response) => {
          this.modules.push(response);
          // Handle success message
        },
        error: () => {
          // Handle error message
        },
      });
  }

  handleNewTask(moduleId: string, taskName: string, taskValue: string): void {
    this.tasksService
      .createTasks({ moduleId, name: taskName, value: taskValue })
      .subscribe({
        next: (response) => {
          this.tasks.push(response);
        },
        error: () => {
          // Handle error message
        },
      });
  }

  getPermissionState(taskId: string, roleId: string): boolean {
    const permission = this.permissions.find(
      (p) => p.taskId === taskId && p.roleId === roleId
    );
    return permission ? permission.enable : false;
  }

  togglePermission(
    taskId: string,
    roleId: string,
    isChecked: boolean = false
  ): void {
    const permissionIndex = this.permissions.findIndex(
      (p) => p.taskId === taskId && p.roleId === roleId
    );
    if (permissionIndex >= 0) {
      this.permissions[permissionIndex].enable = isChecked;
    } else {
      this.permissions.push({
        id: `${roleId}_${taskId}`, // Generate an ID for the new permission
        roleId: roleId,
        taskId: taskId,
        enable: isChecked,
      });
    }
  }

  countTasksByModule(moduleId: string | undefined): number {
    if (!moduleId) return 0;
    return this.tasks.filter((task) => task.moduleId === moduleId).length;
  }
}
