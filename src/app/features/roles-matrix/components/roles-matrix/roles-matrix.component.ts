import { Component, OnInit } from '@angular/core';
import { Capability } from '../../models/capability.model';
import { RolesService } from '../../services/roles.service';
import { ModulesService } from '../../services/modules.service';
import { TasksService } from '../../services/tasks.service';
import { PermissionsService } from '../../services/permissions.service';
import { Permission } from '../../models/role.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleComponent } from '../role/role.component';
import { ModuleComponent } from '../module/module.component';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-roles-matrix',
  templateUrl: './roles-matrix.component.html',
  styleUrls: ['./roles-matrix.component.scss'],
})
export class RolesMatrixComponent implements OnInit {
  capabilities: Capability[] = [];
  displayedColumns: string[] = ['module', 'tasks'];
  dynamicRoles: any[] = [];
  updatedPermissions: any[] = [];

  constructor(
    private modulesService: ModulesService,
    private tasksService: TasksService,
    private roleService: RolesService,
    private permissionsService: PermissionsService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchRoles();
  }

  fetchRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        const uniqueRoles = roles.filter(
          (role, index, self) =>
            index === self.findIndex((r) => r.name === role.name)
        );

        this.dynamicRoles = uniqueRoles;
        this.displayedColumns = ['module', 'tasks', ...uniqueRoles.map((role) => role.name)];
        this.fetchCapabilities();
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }

  fetchCapabilities(): void {
    this.capabilities = [];
  
    this.modulesService.getModules().subscribe({
      next: (modules) => {
        modules.forEach((module) => {
          this.tasksService.getTasksByModuleId(module._id).subscribe({
            next: (tasks) => {
              const tasksForModule = tasks.map((task) => {
                let taskObj: any = {
                  task_value: task.task_value,  
                  _id: task._id,
                };
      
                this.dynamicRoles.forEach((role) => {
                  taskObj[role.name + 'Checked'] = false;
                });
                return taskObj;
              });
  
              const existingModuleIndex = this.capabilities.findIndex(
                (cap) => cap.name === module.name
              );
              if (existingModuleIndex === -1) {
                this.capabilities.push({
                  name: module.name,
                  tasks: tasksForModule,
                });
              }
  
              this.fetchPermissions();
            },
            error: (err) => {
              console.error('Error fetching tasks for module:', module.name, err);
            },
          });
        });
      },
      error: (err) => {
        console.error('Error fetching modules:', err);
      },
    });
  }
  

  fetchPermissions(): void {
    this.permissionsService.getAllPermissions().subscribe({
      next: (permissions) => {
   
        permissions.forEach((permission) => {
          this.capabilities.forEach((module) => {
            const task = module.tasks.find((task) => task._id === permission.taskId);
            if (task) {
              const role = this.dynamicRoles.find((role) => role._id === permission.roleId);
              if (role) {
                task[role.name + 'Checked'] = permission.enable;
              }
            }
          });
        });

  
        this.capabilities = [...this.capabilities];
      },
      error: (err) => {
        console.error('Error fetching permissions:', err);
      },
    });
  }

  openCreateRoleDialog(): void {
    const dialogRef = this.dialog.open(RoleComponent, {
      width: '400px', 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchRoles(); 
      }
    });
  }

  onCheckboxChange(task: any, roleName: string, event: any): void {
    const isChecked = event.checked;
    task[roleName + 'Checked'] = isChecked;

    const roleId = this.getRoleId(roleName);
    const taskId = this.getTaskId(task.name);

    if (roleId && taskId) {
      const existingPermission = this.updatedPermissions.find(
        (perm) => perm.roleId === roleId && perm.taskId === taskId
      );

      if (existingPermission) {
        existingPermission.enable = isChecked; 
      } else {
        this.updatedPermissions.push({
          roleId,
          taskId,
          enable: isChecked,
        }); 
      }
    }
  }

  savePermissions(): void {
    const allPermissions: any[] = [];

    this.capabilities.forEach((module) => {
      module.tasks.forEach((task) => {
        this.dynamicRoles.forEach((role) => {
          const roleId = this.getRoleId(role.name);
          const taskId = task._id;
          const enable = task[role.name + 'Checked'];

          if (roleId && taskId !== undefined) {
            allPermissions.push({
              roleId,
              taskId,
              enable,
            });
          }
        });
      });
    });


    this.permissionsService.updatePermissions({ newPermissions: allPermissions }).subscribe({
      next: () => {
        this.notificationService.showNotification('Role Matrix updated successfully', 'success');
        this.updatedPermissions = []; 
        this.fetchPermissions(); 
      },
      error: (err) => {
        console.error('Error updating permissions:', err);
      },
    });
  }

  getRoleId(roleName: string): string | undefined {
    const role = this.dynamicRoles.find((role) => role.name === roleName);
    return role ? role._id : undefined;
  }

  getTaskId(taskValue: string): string | undefined {
    for (const capability of this.capabilities) {
      const task = capability.tasks.find((task) => task.task_value === taskValue); 
      if (task) {
        return task._id;
      }
    }
    return undefined;
  }

  openAddModuleDialog(): void {
    const dialogRef = this.dialog.open(ModuleComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchCapabilities(); 
      }
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TasksComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchCapabilities();
      }
    });
  }
  
}
