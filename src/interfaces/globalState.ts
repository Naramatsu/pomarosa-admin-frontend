import type { IToast } from "./commons";
import type { IProductsState, IProductState } from "./product";
import type { IUsersState, IUserState } from "./user";

export interface IGlobalState {
  token: string | null;
  userProfile: IUserState;
  users: IUsersState;
  user: IUserState;
  products: IProductsState;
  product: IProductState;
  toast: IToast;
}

export interface IGlobalActions {
  setToken: (token: string | null) => void;
  setUserProfile: (userProfile: IUserState) => void;
  setUsers: (users: IUsersState) => void;
  setUser: (user: IUserState) => void;
  setProducts: (products: IProductsState) => void;
  setProduct: (product: IProductState) => void;
  setToast: (toast: IToast) => void;
}
