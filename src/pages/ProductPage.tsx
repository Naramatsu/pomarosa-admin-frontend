import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/globalState";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../hooks/useProducts";
import type { IUpdateProductRequest } from "../interfaces/product";
import { BackArrow } from "../assets/icons";
import { ToasTypes } from "../constants";

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

  if (!product.data) navigate("/");
  const productInfo = useMemo(() => product.data, [product.data]);
  const inputs = useMemo(
    () => [
      {
        label: "Nombre en español",
        name: "nameSpanish",
        value: productForm?.nameSpanish || productInfo?.name.SPANISH || "",
        type: "text",
      },
      {
        label: "Nombre en ingles",
        name: "nameEnglish",
        value: productForm?.nameEnglish || productInfo?.name.ENGLISH || "",
        type: "text",
      },
      {
        label: "Descripción en español",
        name: "descriptionSpanish",
        value:
          productForm?.descriptionSpanish ||
          productInfo?.description?.SPANISH ||
          "",
        type: "text",
      },
      {
        label: "Descripción en ingles",
        name: "descriptionEnglish",
        value:
          productForm?.descriptionEnglish ||
          productInfo?.description?.ENGLISH ||
          "",
        type: "text",
      },
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
      {
        label: "Sección en el menú",
        name: "section",
        value: productForm?.section || productInfo?.section || "",
        type: "text",
      },
    ],
    [productInfo, productForm],
  );

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (!value) delete productForm[name as string];

    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    if (!value) delete productForm[name as string];

    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const onHandlerAvailable = () => {
    setIsAvailable(!isAvailable);
  };

  const onSubmit = async () => {
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

  return (
    <section className="product-page">
      <section className="page-header">
        <BackArrow colors="#fff" onClick={() => navigate(-1)} />
        <h1>Actualizar producto</h1>
      </section>
      <form className="form-product">
        {inputs.map(({ label, name, value }) => (
          <section key={`${label}-${name}`} className="form-control">
            <label>{label}</label>
            <input name={name} onChange={handlerChange} value={value} />
          </section>
        ))}
        <section className="form-control">
          <label>Area:</label>
          <select
            name="area"
            defaultValue={productInfo?.area}
            onChange={handlerSelect}
          >
            <option key="KITCHEN" value="KITCHEN">
              Cocina
            </option>
            <option key="BAKERY" value="BAKERY">
              Panadería
            </option>
          </select>
        </section>
        <section className="form-control">
          <label>Horario:</label>
          <select
            name="schedule"
            defaultValue={productInfo?.schedule}
            onChange={handlerSelect}
          >
            <option key="ALL_DAY" value="ALL_DAY">
              Todo el día
            </option>
            <option key="ONLY_DAY" value="ONLY_DAY">
              Solo en el día
            </option>
            <option key="ONLY_NIGHT" value="ONLY_NIGHT">
              Solo en la noche
            </option>
          </select>
        </section>
        <section className="form-control checkbox">
          <input
            id="isAvailable"
            type="checkbox"
            name="isAvailable"
            defaultChecked={isAvailable}
            onChange={onHandlerAvailable}
          />
          <label htmlFor="isAvailable">¿Está disponible?</label>
        </section>
        <button type="button" onClick={onSubmit} className="primary">
          Actualizar producto
        </button>
      </form>
    </section>
  );
};
