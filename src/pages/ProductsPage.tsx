import { memo, useEffect, useMemo, useState } from "react";
import { ProductItem } from "../components/ProductItem";
import { useProducts } from "../hooks/useProducts";
import { useStore } from "../store/globalState";
import { BackArrow } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { RequestStatus } from "../constants";
import { Modal } from "../layouts/Modal";
import { AddProductForm } from "../components/AddProductForm";
import AdvancedFilterForm from "../components/AdvancedFilterForm";
import "../styles/product.style.css";

export const ProductsPage = memo(() => {
  const { productsQuickfilter, fetchAllProducts, productsAdvancedFilter } =
    useProducts();
  const { products } = useStore();
  const [filterInput, setFilterInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [isTypeLoading, setIsTypeLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

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
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver"
        >
          <BackArrow colors="#fff" />
        </button>
        <div className="page-title-wrapper">
          <h1>Listado de productos</h1>
          <p className="page-subtitle">
            {isLoading ? "Cargando..." : `${productList.length} productos`}
          </p>
        </div>
      </section>

      <section className="search-section-container">
        <section className="search-section">
          <section
            className={`form-control quick-filter ${isLoading ? "loading" : ""}`}
          >
            <label htmlFor="iput-search">Filtro rápido</label>
            <input
              id="iput-search"
              className="quick-filter-input"
              type="text"
              value={filterInput}
              placeholder="filtrar por nombre, código, área o sección"
              onChange={(event) => setFilterInput(event.target.value)}
              aria-label="Filtro rápido"
            />
            {isLoading && <Spinner />}
          </section>
          <button className="primary" onClick={onRefreshProductList}>
            Refrescar
          </button>
          <button className="success" onClick={() => setShowModal(true)}>
            Agregar
          </button>
          <button className="info" onClick={() => setShowFilterModal(true)}>
            Filtro avanzado
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

      <Modal
        visible={showFilterModal}
        title="Filtro avanzado"
        onClose={() => setShowFilterModal(false)}
      >
        <AdvancedFilterForm
          onApply={async (params) => {
            await productsAdvancedFilter(params);
            setShowFilterModal(false);
          }}
          onClose={() => setShowFilterModal(false)}
        />
      </Modal>
    </section>
  );
});
