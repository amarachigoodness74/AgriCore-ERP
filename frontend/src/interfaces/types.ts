export enum UserRoleType {
  userRole = "User Role",
  permissions = "Permissions",
  employees = "Employees",
}

export interface IPermission {
  id?: string;
  key: string;
  name: string;
  description: string;
  group: UserRoleType;
}

export interface IUserRole {
  id?: string;
  label: string;
  role: string;
  description: string;
  permissions: string[];
}


export interface IPermissionIRole {
  id: string;
  key?: string;
  name?: string;
  label?: string;
  role?: string;
  description: string;
}