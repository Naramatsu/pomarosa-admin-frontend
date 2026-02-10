import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/globalState";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { IUpdateProductRequest } from "../interfaces/product";
import { BackArrow } from "../assets/icons";
import { APP_ROUTES, ToasTypes } from "../constants";
import { FilterSection } from "../components/FilterSection";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { AREAS_ITEMS, SCHEDULE_ITEMS } from "../constants";

/* img: optional.string */

export const ProductPage = () => {
  const { product, setToast } = useStore();
  const params = useParams();
  const navigate = useNavigate();
  const { productId } = params;
  const [productForm, setProductForm] = useState<
    Record<string, string | number>
  >({});
  const [isAvailable, setIsAvailable] = useState(
    product.data?.isAvailable || false,
  );
  const { findProductById, updateProduct, fetchAllProducts } = useProducts();

  useEffect(() => {
    if (product.data?._id !== productId) findProductById(productId ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product.data) navigate(APP_ROUTES.HOME);
  const productInfo = useMemo(() => product.data, [product.data]);

  const basicDataFields = useMemo(
    () => [
      {
        label: "Nombre en español",
        name: "nameSpanish",
        value: productForm?.nameSpanish || productInfo?.name.SPANISH || "",
      },
      {
        label: "Nombre en ingles",
        name: "nameEnglish",
        value: productForm?.nameEnglish || productInfo?.name.ENGLISH || "",
      },
      {
        label: "Descripción en español",
        name: "descriptionSpanish",
        value:
          productForm?.descriptionSpanish ||
          productInfo?.description?.SPANISH ||
          "",
      },
      {
        label: "Descripción en ingles",
        name: "descriptionEnglish",
        value:
          productForm?.descriptionEnglish ||
          productInfo?.description?.ENGLISH ||
          "",
      },
      {
        label: "Sección en el menú",
        name: "section",
        value: productForm?.section || productInfo?.section || "",
      },
    ],
    [productInfo, productForm],
  );

  const priceFields = useMemo(
    () => [
      {
        label: "Precio caliente",
        name: "hotPrice",
        value: productForm?.hotPrice || productInfo?.hotPrice || "",
        type: "number",
      },
      {
        label: "Precio frio",
        name: "coldPrice",
        value: productForm?.coldPrice || productInfo?.coldPrice || "",
        type: "number",
      },
      {
        label: "Precio personal",
        name: "personal",
        value: productForm?.personal || productInfo?.personal || "",
        type: "number",
      },
      {
        label: "Precio familiar",
        name: "familiar",
        value: productForm?.familiar || productInfo?.familiar || "",
        type: "number",
      },
    ],
    [productInfo, productForm],
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.currentTarget;
    if (!value) {
      delete productForm[name as string];
    } else {
      setProductForm({
        ...productForm,
        [name]: value,
      });
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const params = {
      ...productForm,
      isAvailable,
    };

    try {
      await updateProduct(
        productId || productInfo?._id || "",
        params as IUpdateProductRequest,
      );
      await fetchAllProducts();
      setToast({
        type: ToasTypes.SUCCESS,
        value: "Producto actualizado exitosamente",
        visible: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setToast({
        type: ToasTypes.ERROR,
        value: "Ups! Ocurrió un error al tratar de actualizar este prodcuto",
        visible: true,
      });
    }
  };

  const onClear = () => {
    setProductForm({});
  };

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
          <h1>Actualizar productos</h1>
        </div>
      </section>
      <form className="advanced-filter-form" onSubmit={onSubmit}>
        <FilterSection title="Datos básicos">
          {basicDataFields.map(({ label, name, value }) => (
            <Input
              key={name}
              label={label}
              name={name}
              value={value}
              placeholder={label}
              onChange={handleChange}
            />
          ))}
        </FilterSection>

        <FilterSection title="Datos administrativos">
          <Select
            label="Area"
            name="area"
            value={productForm.area || productInfo?.area || ""}
            onChange={handleChange}
            items={AREAS_ITEMS}
          />
          <Select
            label="Horario"
            name="schedule"
            value={productForm.schedule || productInfo?.schedule || ""}
            onChange={handleChange}
            items={SCHEDULE_ITEMS}
          />
          <Select
            label="Disponible"
            name="isAvailable"
            value={isAvailable ? "true" : "false"}
            onChange={(e) => {
              setIsAvailable(e.currentTarget.value === "true");
            }}
            items={[
              { value: "true", label: "Sí" },
              { value: "false", label: "No" },
            ]}
            itemDefault
          />
        </FilterSection>

        <FilterSection title="Precios">
          {priceFields.map(({ label, name, value, type }) => (
            <Input
              key={name}
              type={type}
              label={label}
              name={name}
              value={value}
              placeholder={label}
              onChange={handleChange}
            />
          ))}
        </FilterSection>

        <div className="form-actions" style={{ paddingBottom: "16px" }}>
          <button type="button" onClick={onClear}>
            Limpiar
          </button>
          <button type="submit" className="primary">
            Actualizar producto
          </button>
        </div>
      </form>
    </section>
  );
};
