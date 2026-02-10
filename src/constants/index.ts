import type { IProductForm } from "../interfaces/product";

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

export const AREAS = {
  KITCHEN: {
    value: "KITCHEN",
    label: "Cocina",
  },
  BAKERY: {
    value: "BAKERY",
    label: "Panadería",
  },
};

export const AREAS_ITEMS = [
  {
    value: AREAS.KITCHEN.value,
    label: AREAS.KITCHEN.label,
  },

  {
    value: AREAS.BAKERY.value,
    label: AREAS.BAKERY.label,
  },
];

export const SCHEDULE = {
  ALL_DAY: {
    value: "ALL_DAY",
    label: "Todo el día",
  },
  ONLY_DAY: {
    value: "ONLY_DAY",
    label: "Solo día",
  },
  ONLY_NIGHT: {
    value: "ONLY_NIGHT",
    label: "Solo noche",
  },
};

export const SCHEDULE_ITEMS = [
  {
    value: SCHEDULE.ALL_DAY.value,
    label: SCHEDULE.ALL_DAY.label,
  },
  {
    value: SCHEDULE.ONLY_DAY.value,
    label: SCHEDULE.ONLY_DAY.label,
  },
  {
    value: SCHEDULE.ONLY_NIGHT.value,
    label: SCHEDULE.ONLY_NIGHT.label,
  },
];

export const productFormInitialState: IProductForm = {
  nameSpanish: "",
  nameEnglish: "",
  descriptionSpanish: "",
  descriptionEnglish: "",
  code: "",
  hotPrice: "",
  coldPrice: "",
  personal: "",
  familiar: "",
  img: "",
  area: "KITCHEN",
  section: "",
  schedule: "ALL_DAY",
};
