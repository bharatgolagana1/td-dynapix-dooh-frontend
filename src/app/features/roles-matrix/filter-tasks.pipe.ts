import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './models/role.model';


@Pipe({
  name: 'filterTasks',
})
export class FilterTasksPipe implements PipeTransform {
  transform(tasks: Task[], moduleId: string): Task[] {
    return tasks.filter((task) => task.moduleId === moduleId);
  }
}
