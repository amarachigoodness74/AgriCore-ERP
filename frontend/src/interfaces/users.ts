interface IAddress {
  streetNo?: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IEmployeeWithoutPasswordAndRole {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address?: IAddress;
  department: string;
  mustResetPassword?: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy: string;
  updatedBy: string;
}

export interface IEmployee {
  id?: string;
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
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface IClient {
  id?: string;
  name: string;
  email: string;
  phone: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

// Same with IClent but I am giving room for futre additions
export interface ISupplier {
  id?: string;
  name: string;
  email: string;
  phone: string;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}
