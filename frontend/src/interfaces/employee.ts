interface IAddress {
  streetNo?: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IResetData {
  token: string;
  expiresOn: Date;
}

export interface IEmployeeWithoutPasswordAndRole {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: IAddress;
  department: string;
  mustResetPassword: boolean;
  passwordResetData?: IResetData;
  createdBy: string;
  updatedBy: string;
}

export interface IEmployee {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: IAddress;
  department: string;
  role: string;
  password: string;
  mustResetPassword: boolean;
  passwordResetData: IResetData;
  createdBy: string;
  updatedBy: string;
}
