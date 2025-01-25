interface IAddress {
  streetNo?: number;
  street: string;
  town: string;
  state: string;
  country: string;
}

export interface IRefreshToken {
  token: string;
  expiresOn: Date;
  isRevoked: boolean;
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
  refreshToken: IRefreshToken;
  createdBy: string;
  updatedBy: string;
}

export interface IEmployeeWithoutPasswordAndRole {
  name: string;
  email: string;
  phone: string;
  gender: string;
  department: string;
  street: string;
  town: string;
  state: string;
  country: string;
  createdBy: string;
  updatedBy: string;
}
