export interface ICompany {
  id?: string;
  name: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id?: string;
  email: string;
  name: string;
  country: string;
  age: number;
  gender: string;
  phone: string;
  companyId: string;
  company?: ICompany;
  createdAt: Date;
  updatedAt: Date;
}