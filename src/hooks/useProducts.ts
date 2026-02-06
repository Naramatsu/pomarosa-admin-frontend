import { useEffect } from "react";
import { useStore } from "../store/globalState";
import { RequestStatus } from "../constants";
import { ProductServices } from "../services/product";
import type { IUpdateProductRequest } from "../interfaces/product";

export const useProducts = () => {
  const { products, setProducts, product, setProduct, token } = useStore();
  const {
    fetchAllProductsService,
    findProductByIdService,
    updateProductService,
    productQuickFilterService,
    createProductService,
  } = ProductServices();

  const fetchAllProducts = async () => {
    setProducts({
      ...products,
      status: RequestStatus.LOADING,
    });
    const { data } = await fetchAllProductsService();
    if (data.length)
      setProducts({
        data,
        status: RequestStatus.LOADED,
      });
    else
      setProducts({
        ...products,
        status: RequestStatus.ERROR,
      });
  };

  const findProductById = async (productId: string) => {
    setProduct({
      ...product,
      status: RequestStatus.LOADING,
    });
    const data = await findProductByIdService(productId);
    if (data)
      setProduct({
        data,
        status: RequestStatus.LOADED,
      });
    else
      setProducts({
        ...products,
        status: RequestStatus.ERROR,
      });
  };

  const updateProduct = async (
    productId: string,
    params?: IUpdateProductRequest,
  ) => {
    setProduct({
      ...product,
      status: RequestStatus.LOADING,
    });
    const data = await updateProductService(productId, params);
    if (data) {
      setProduct({
        data,
        status: RequestStatus.LOADED,
      });
    } else
      setProduct({
        ...product,
        status: RequestStatus.ERROR,
      });
  };

  const productsQuickfilter = async (search: string) => {
    setProducts({
      ...products,
      status: RequestStatus.LOADING,
    });
    const { data } = await productQuickFilterService(search);
    if (data)
      setProducts({
        data,
        status: RequestStatus.LOADED,
      });
    else
      setProduct({
        ...product,
        status: RequestStatus.ERROR,
      });
  };

  const createProduct = async (params?: IUpdateProductRequest) => {
    setProduct({
      ...product,
      status: RequestStatus.LOADING,
    });
    const data = await createProductService(params);
    if (data) {
      setProduct({
        data,
        status: RequestStatus.LOADED,
      });
      fetchAllProducts();
    } else
      setProduct({
        ...product,
        status: RequestStatus.ERROR,
      });
  };

  useEffect(() => {
    if (!token) return;
    if (!products.data.length && products.status === RequestStatus.NOT_LOADED)
      fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    fetchAllProducts,
    findProductById,
    updateProduct,
    productsQuickfilter,
    createProduct,
  };
};
