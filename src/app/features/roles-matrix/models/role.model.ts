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
  moduleId: string;
  checked?: boolean;          // Optional, defaults to false
  financeChecked?: boolean;   // Optional, defaults to false
  trainingChecked?: boolean;  // Optional, defaults to false
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
