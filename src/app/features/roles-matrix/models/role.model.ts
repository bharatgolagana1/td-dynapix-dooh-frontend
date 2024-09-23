export interface Role {
  _id: string;
  id: string;
  name: string;
}

export interface Module {
  _id: string;
  id: string;
  name: string;
  value: string;
}

export interface Task {
  _id: string;
  name: string;
   task_value: string;
  moduleId: string;
  checked?: boolean;        
  financeChecked?: boolean;  
  trainingChecked?: boolean; 
}

export interface Capability {
  name: string;
  tasks: Task[];
}

export interface Permission {
  roleId: string;
  taskId: string;
  enable: boolean;
}
