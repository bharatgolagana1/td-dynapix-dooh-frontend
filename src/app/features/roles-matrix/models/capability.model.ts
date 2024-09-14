export interface Task {
  _id?: string;
  name: string;
  moduleId?: string;
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
  