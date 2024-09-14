import { Component, OnInit } from '@angular/core';
import { Module, Permission, Role, Task } from '../../models/role.model';
import { RolesService } from '../../services/roles.service';
import { ModulesService } from '../../services/modules.service';
import { TasksService } from '../../services/tasks.service';
import { PermissionsService } from '../../services/permissions.service';
import { Capability } from '../../models/capability.model';
@Component({
  selector: 'app-roles-matrix',
  templateUrl: './roles-matrix.component.html',
  styleUrls: ['./roles-matrix.component.scss'],
})
export class RolesMatrixComponent implements OnInit {
  capabilities: Capability[] = [];
  displayedColumns: string[] = ['module', 'tasks']; 
  dynamicRoles: any[] = [];
  
  constructor(
    private modulesService: ModulesService,
    private tasksService: TasksService,
    private roleService: RolesService
  ) {}
  
  ngOnInit(): void {
    this.fetchRoles();
  }
  
  fetchRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        // Deduplicate roles by name
        const uniqueRoles = roles.filter((role, index, self) =>
          index === self.findIndex((r) => r.name === role.name)
        );
  
        this.dynamicRoles = uniqueRoles;
        this.displayedColumns = ['module', 'tasks', ...uniqueRoles.map(role => role.name)];
        this.fetchCapabilities();
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });
  }
  
  
  fetchCapabilities(): void {
    this.modulesService.getModules().subscribe({
      next: (modules) => {
        modules.forEach((module) => {
          this.tasksService.getTasksByModuleId(module._id).subscribe({
            next: (tasks) => {
              const tasksForModule = tasks.map((task) => {
                let taskObj: any = { name: task.name };
                this.dynamicRoles.forEach(role => {
                  taskObj[role.name + 'Checked'] = false; // Initialize checkboxes for each role
                });
                return taskObj;
              });
  
              this.capabilities.push({
                name: module.name,
                tasks: tasksForModule,
              });
  
              this.capabilities = [...this.capabilities]; // Trigger change detection
            },
            error: (err) => {
              console.error('Error fetching tasks for module:', module.name, err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching modules:', err);
      }
    });
  }
  
  onCheckboxChangeRole(capability: string, task: string, role: string, event: any): void {
    const foundCapability = this.capabilities.find((c) => c.name === capability);
    if (foundCapability) {
      const foundTask = foundCapability.tasks.find((t) => t.name === task);
      if (foundTask) {
        (foundTask as any)[role + 'Checked'] = event.checked;
      }
    }
  }
  

}
