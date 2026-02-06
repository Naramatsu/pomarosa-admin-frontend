import type { RequestStatus } from "../constants";

export interface INameDescripction {
  SPANISH: string;
  ENGLISH: string;
}

export interface IProduct {
  _id?: string;
  name: INameDescripction;
  description: INameDescripction;
  code: string;
  hotPrice?: number;
  coldPrice?: number;
  personal?: number;
  familiar?: number;
  img?: string;
  area: string;
  section: string;
  schedule: string;
  isAvailable: boolean;
  productHistoryIds: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export interface IProductState {
  data: IProduct | null;
  status: RequestStatus;
}

export interface IProductsState {
  data: IProduct[];
  status: RequestStatus;
}

export interface IProductAdvanceFilterRequest {
  code?: string;
  name?: string;
  description?: string;
  area?: string;
  section?: string;
  schedule?: boolean;

  fromHotPrice?: number;
  toHotPrice?: number;

  fromColdPrice?: number;
  toColdPrice?: number;

  fromPersonal?: number;
  toPersonal?: number;

  fromFamiliar?: number;
  toFamiliar?: number;
}

export interface IProductAdvanceFilterResponse {
  data: IProduct[];
  total: number;
}

export interface IUpdateProductRequest {
  name?: INameDescripction;
  description?: INameDescripction;
  hotPrice?: number;
  coldPrice?: number;
  personal?: number;
  familiar?: number;
  img?: string;
  area?: string;
  section?: string;
  schedule?: string;
  isAvailable?: boolean;
}
