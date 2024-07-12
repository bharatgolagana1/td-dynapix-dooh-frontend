export interface Role {
  id: string;
  name: string;
}

export interface Module {
  id: string;
  name: string;
  value?: string;
}

export interface Task {
  id: string;
  moduleId: string;
  name: string;
  value: string;
}

export interface Permission {
  roleId: string;
  taskId: string;
  enable: boolean;
}
