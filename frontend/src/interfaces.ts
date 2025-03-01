export interface IPermission {
  id?: number;
  name: string;
  key: string;
  description: string;
  group: string;
}

export interface IUserRole {
  id?: number;
  role: string;
  label: string;
  description: string;
  permissions: string[];
}
