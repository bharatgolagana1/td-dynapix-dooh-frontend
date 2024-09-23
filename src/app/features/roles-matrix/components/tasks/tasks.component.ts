import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from '../../services/modules.service';
import { TasksService } from '../../services/tasks.service';
import { MatDialogRef } from '@angular/material/dialog';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  modules: any[] = [];
  selectedModule: any = null;
  organizationId: any = ''; 

  constructor(
    private fb: FormBuilder,
    private modulesService: ModulesService,
    private tasksService: TasksService,
    private keycloakOperationService: KeycloakOperationService,
    private dialogRef: MatDialogRef<TasksComponent>
  ) {
    this.taskForm = this.fb.group({
      moduleId: ['', Validators.required], 
      name: ['', Validators.required],
      description: [''],
      task_value: ['', Validators.required],
      organizationId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.modulesService.getModules().subscribe((modules) => {
      this.modules = modules;
    });

    this.organizationId = this.keycloakOperationService.getOrganizationId();
    this.taskForm.patchValue({ organizationId: this.organizationId });
  }

  onSelectModule(moduleId: string): void {
    const selectedModule = this.modules.find((module) => module._id === moduleId);
    if (selectedModule) {
      this.selectedModule = selectedModule;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        moduleId: this.selectedModule ? this.selectedModule._id : null
      };

      this.tasksService.createTasks(taskData).subscribe(
        (response) => {
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
