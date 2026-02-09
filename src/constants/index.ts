export enum RequestStatus {
  NOT_LOADED,
  LOADING,
  LOADED,
  ERROR,
}

export enum ToasTypes {
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
}

export const APP_ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT: "/products/:productId",
  USERS: "/users",
  LOGIN: "/login",
};
