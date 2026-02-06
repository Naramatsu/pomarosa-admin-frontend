import type { RequestStatus } from "../constants";

export interface IUserInfo {
  name: string;
  lastname: string;
  email: string;
}

export interface IUserPayload {
  user: string;
  password: string;
  userInfo: IUserInfo;
}

export interface ILoginPayload {
  user: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
}

export interface IUser {
  _id?: string;
  user: string;
  userInfo: IUserInfo;
  isVerified: boolean;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: Date;
  loginAttempts: number;
  lastConnection?: Date;
  deletedAt?: null;
  isDeletedAccount?: boolean;
  updatedAt?: Date;
  isBlocked?: boolean;
}

export interface IUserState {
  data: IUser | null;
  status: RequestStatus;
}

export interface IUsersState {
  data: IUser[];
  status: RequestStatus;
}
