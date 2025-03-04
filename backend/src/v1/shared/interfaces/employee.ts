export interface IEmployee {
  name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  role: string;
  label: string;
  password?: string;
  mustResetPassword?: boolean;
  isActive?: boolean;
  resetToken?: String;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}

export interface IEmployeeWithoutPasswordAndRole {
  name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  mustResetPassword?: boolean;
  isActive?: boolean;
  resetToken?: String;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}
