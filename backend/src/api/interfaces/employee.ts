interface IAddress {
  streetNo?: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IEmployee {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: IAddress;
  department: string;
  role: string;
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
  address: IAddress;
  department: string;
  mustResetPassword?: boolean;
  isActive?: boolean;
  resetToken?: String;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}
