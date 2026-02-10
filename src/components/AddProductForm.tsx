import { useMemo, useState } from "react";
import type {
  INameDescripction,
  IProductForm,
  IUpdateProductRequest,
} from "../interfaces/product";
import { useProducts } from "../hooks/useProducts";
import {
  AREAS_ITEMS,
  productFormInitialState,
  SCHEDULE_ITEMS,
  ToasTypes,
} from "../constants";
import { useStore } from "../store/globalState";
import { Input } from "./Input";
import { Select } from "./Select";
import { FilterSection } from "./FilterSection";

export const AddProductForm = () => {
  const { setToast } = useStore();
  const [productForm, setProductForm] = useState(productFormInitialState);
  const { createProduct } = useProducts();

  const basicInputs = useMemo(
    () => [
      {
        label: "Nombre en español",
        name: "nameSpanish",
        value: productForm?.nameSpanish,
        isRequired: true,
        type: "text",
      },
      {
        label: "Nombre en ingles",
        name: "nameEnglish",
        value: productForm?.nameEnglish,
        isRequired: true,
        type: "text",
      },
      {
        label: "Descripción en español",
        name: "descriptionSpanish",
        value: productForm?.descriptionSpanish,
        type: "text",
      },
      {
        label: "Descripción en ingles",
        name: "descriptionEnglish",
        value: productForm?.descriptionEnglish,
        type: "text",
      },
    ],
    [productForm],
  );
  const adminInputs = useMemo(
    () => [
      {
        label: "Código",
        name: "code",
        value: productForm?.code,
        type: "text",
        isRequired: true,
      },
      {
        label: "Sección en el menú",
        name: "section",
        value: productForm?.section,
        type: "text",
        isRequired: true,
      },
    ],
    [productForm],
  );

  const priceInputs = useMemo(
    () => [
      {
        label: "Precio caliente",
        name: "hotPrice",
        value: productForm?.hotPrice,
        type: "number",
      },
      {
        label: "Precio frio",
        name: "coldPrice",
        value: productForm?.coldPrice,
        type: "number",
      },
      {
        label: "Precio personal",
        name: "personal",
        value: productForm?.personal,
        type: "number",
      },
      {
        label: "Precio familiar",
        name: "familiar",
        value: productForm?.familiar,
        type: "number",
      },
    ],
    [productForm],
  );

  const handlerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const params: IProductForm = { ...productForm };
    for (const key in params) {
      if (!params[key as keyof typeof params])
        delete params[key as keyof typeof params];
    }

    const {
      nameSpanish,
      nameEnglish,
      descriptionSpanish,
      descriptionEnglish,
      ...rest
    } = params;

    const name: INameDescripction = {
      SPANISH: nameSpanish,
      ENGLISH: nameEnglish,
    };
    const description: INameDescripction = {
      SPANISH: descriptionSpanish,
      ENGLISH: descriptionEnglish,
    };

    const newProduct = {
      ...rest,
      name,
      ...(description.SPANISH && { description }),
      ...(params.hotPrice && {
        hotPrice: parseFloat(params.hotPrice.toString()),
      }),
      ...(params.coldPrice && {
        coldPrice: parseFloat(params.coldPrice.toString()),
      }),
      ...(params.personal && {
        personal: parseFloat(params.personal.toString()),
      }),
      ...(params.familiar && {
        familiar: parseFloat(params.familiar.toString()),
      }),
    };
    await createProduct(newProduct as IUpdateProductRequest);
    setToast({
      type: ToasTypes.SUCCESS,
      visible: true,
      value: "Producto creado exitosamente",
    });
  };

  return (
    <form className="advanced-filter-form" onSubmit={onSubmit}>
      <FilterSection title="Datos básicos">
        {basicInputs.map(({ label, name, value, isRequired }) => (
          <Input
            key={name}
            label={label}
            name={name}
            value={value}
            placeholder={label}
            onChange={handlerChange}
            isRequired={isRequired}
          />
        ))}
      </FilterSection>

      <FilterSection title="Precios">
        {priceInputs.map(({ label, name, value }) => (
          <Input
            key={name}
            type="number"
            label={label}
            name={name}
            value={value}
            placeholder="0"
            onChange={handlerChange}
          />
        ))}
      </FilterSection>

      <FilterSection title="Datos administrativos">
        {adminInputs.map(({ label, name, value, isRequired }) => (
          <Input
            key={name}
            label={label}
            name={name}
            value={value}
            placeholder={label}
            onChange={handlerChange}
            isRequired={isRequired}
          />
        ))}
        <Select
          label="area"
          name="area"
          value={productForm.area}
          onChange={handlerChange}
          items={AREAS_ITEMS}
        />
        <Select
          label="Horario"
          name="schedule"
          value={productForm.schedule}
          onChange={handlerChange}
          items={SCHEDULE_ITEMS}
        />
      </FilterSection>

      <div className="form-actions">
        <button type="submit" className="primary">
          Crear producto
        </button>
      </div>
    </form>
  );
};
