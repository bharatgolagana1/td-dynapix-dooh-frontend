import { Task } from './models/role.model';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByModule',
})
export class FilterByModulePipe implements PipeTransform {
  transform(tasks: Task[], moduleId: string): Task[] {
    return tasks.filter((task) => task.moduleId === moduleId);
  }
}

@Pipe({
  name: 'countByModule',
})
export class CountByModulePipe implements PipeTransform {
  transform(tasks: Task[], moduleId: string): number {
    return tasks.filter((task) => task.moduleId === moduleId).length;
  }
}
