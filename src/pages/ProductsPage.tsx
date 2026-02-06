import { memo, useEffect, useMemo, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { useProducts } from "../hooks/useProducts";
import { useStore } from "../store/globalState";
import { BackArrow } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { RequestStatus } from "../constants";
import "../styles/product.style.css";
import { Modal } from "../components/Modal";
import { AddProductForm } from "../components/AddProductForm";

export const ProductsPage = memo(() => {
  const { productsQuickfilter, fetchAllProducts } = useProducts();
  const { products } = useStore();
  const [filterInput, setFilterInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isTypeLoading, setIsTypeLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (filterInput.length < 3) {
      setDebouncedValue("");
      return;
    }

    setIsTypeLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(filterInput);
      setIsTypeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filterInput]);

  useEffect(() => {
    if (!debouncedValue) {
      fetchAllProducts();
      return;
    }

    const fetchData = async () => await productsQuickfilter(debouncedValue);

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const onRefreshProductList = async () => await fetchAllProducts();

  const isLoading = products.status === RequestStatus.LOADING || isTypeLoading;
  const productList = useMemo(() => products.data ?? [], [products.data]);
  const isEmpty = productList.length === 0;

  return (
    <section className="products-section">
      <section className="page-header">
        <BackArrow colors="#fff" onClick={() => navigate(-1)} />
        <h1>Listado de productos</h1>
      </section>

      <section className="search-section-container">
        <section className="search-section">
          <section className={`form-control ${isLoading ? "loading" : ""}`}>
            <label htmlFor="iput-search">Filtro rápido</label>
            <input
              id="iput-search"
              type="text"
              value={filterInput}
              placeholder="filtrar por nombre, código, área o sección"
              onChange={(event) => setFilterInput(event.target.value)}
            />
            {isLoading && <Spinner />}
          </section>
          <button className="primary" onClick={onRefreshProductList}>
            Refrescar
          </button>
          <button className="success" onClick={() => setShowModal(true)}>
            Agregar
          </button>
        </section>
      </section>
      <section className="product-list-container">
        {isEmpty && <p>No hay productos agregados</p>}
        {!isEmpty &&
          productList.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </section>
      <Modal
        visible={showModal}
        title="Agregar Producto"
        onClose={() => setShowModal(false)}
      >
        <AddProductForm />
      </Modal>
    </section>
  );
});
