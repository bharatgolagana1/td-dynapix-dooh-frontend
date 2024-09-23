export interface Task {
  _id?: string;
  name: string;
  task_value: string;
  moduleId?: string;
  description?: string;
  checked: boolean;
  financeChecked?: boolean;  
  trainingChecked?: boolean;
  [key: string]: any; 
}

  
  export interface Capability {
    name: string;
    tasks: Task[];
  }
  export interface Module {
    _id: string;
    name: string;
  }
  