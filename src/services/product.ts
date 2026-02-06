import axios, { isAxiosError } from "axios";
import type {
  IProduct,
  IProductAdvanceFilterRequest,
  IProductAdvanceFilterResponse,
  IUpdateProductRequest,
} from "../interfaces/product";
import { useStore } from "../store/globalState";
import { ToasTypes } from "../constants";

const API_URL = import.meta.env.VITE_API_URL;

export const ProductServices = () => {
  const { token, setToast } = useStore();

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const onToastError = (error: string) => {
    setToast({
      visible: true,
      value: error,
      type: ToasTypes.ERROR,
    });
  };

  const fetchAllProductsService =
    async (): Promise<IProductAdvanceFilterResponse> => {
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        return data;
      } catch (error: unknown) {
        if (isAxiosError(error)) onToastError(error.message);
        return { data: [], total: 0 };
      }
    };

  const findProductByIdService = async (
    productId: string,
  ): Promise<IProduct | null> => {
    try {
      const { data } = await axios.get(`${API_URL}/products/${productId}`);
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error)) onToastError(error.message);
      return null;
    }
  };

  const productAdvanceFilterService = async (
    params?: IProductAdvanceFilterRequest,
  ): Promise<IProductAdvanceFilterResponse> => {
    try {
      const query = new URLSearchParams(
        params as Record<string, string>,
      ).toString();
      const { data } = await axios.get(`${API_URL}/products/filter?${query}`);
      return data;
    } catch (error: unknown) {
      if (isAxiosError(error)) onToastError(error.message);
      return { data: [], total: 0 };
    }
  };

  const updateProductService = async (
    productId: string,
    params?: IUpdateProductRequest,
  ): Promise<IProduct | null> => {
    try {
      const { data } = await axios.put(
        `${API_URL}/products/${productId}`,
        params,
      );
      return data?.product;
    } catch (error: unknown) {
      if (isAxiosError(error)) onToastError(error.message);
      return null;
    }
  };

  const productQuickFilterService = async (
    search: string,
  ): Promise<IProductAdvanceFilterResponse> => {
    try {
      const { data } = await axios.get(
        `${API_URL}/products/v1/quick-filter?search=${search}`,
      );
      return data;
    } catch (error) {
      if (isAxiosError(error)) onToastError(error.message);
      return { data: [], total: 0 };
    }
  };

  const createProductService = async (
    params?: IUpdateProductRequest,
  ): Promise<IProduct | null> => {
    try {
      const { data } = await axios.post(`${API_URL}/products`, params);
      return data?.product;
    } catch (error: unknown) {
      if (isAxiosError(error)) onToastError(error.message);
      return null;
    }
  };

  return {
    fetchAllProductsService,
    findProductByIdService,
    productAdvanceFilterService,
    updateProductService,
    productQuickFilterService,
    createProductService,
  };
};
