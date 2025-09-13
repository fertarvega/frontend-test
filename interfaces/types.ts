export interface ICompany {
  id: string;
  name: string;
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  country: string;
  age: number;
  gender: string;
  phone: string;
  companyId: string;
  company: ICompany;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaginationUsers {
  users: IUser[];
  total: number;
  page: number;
  rows: number;
  totalPages: number;
}

export interface IFilters {
  email?: string;
  name?: string;
  company?: string;
}

export interface IChartCompanyData {
  company: string;
  count: number;
}

export interface IChartCountryData {
  country: string;
  count: number;
}
