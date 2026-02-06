import { useMemo, useState } from "react";
import type {
  INameDescripction,
  IUpdateProductRequest,
} from "../interfaces/product";
import { useProducts } from "../hooks/useProducts";

interface IProductForm {
  nameSpanish: string;
  nameEnglish: string;
  descriptionSpanish: string;
  descriptionEnglish: string;
  code: string;
  hotPrice: string | number;
  coldPrice: string | number;
  personal: string | number;
  familiar: string | number;
  img: string;
  area: string;
  section: string;
  schedule: string;
}

const productFormInitialState: IProductForm = {
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

export const AddProductForm = () => {
  const [productForm, setProductForm] = useState(productFormInitialState);
  const { createProduct } = useProducts();

  const inputs = useMemo(
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
      {
        label: "Código",
        name: "code",
        value: productForm?.code,
        type: "text",
        isRequired: true,
      },
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

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setProductForm({
      ...productForm,
      [name]: value,
    });
  };

  const onSubmit = async () => {
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
    const result = await createProduct(newProduct as IUpdateProductRequest);
    console.log({ params, result });
  };
  return (
    <form className="form-product">
      {inputs.map(({ label, name, value, isRequired }) => (
        <section key={`${label}-${name}`} className="form-control">
          <label>{label}</label>
          <input
            name={name}
            required={isRequired}
            onChange={handlerChange}
            value={value}
          />
        </section>
      ))}
      <section className="form-control">
        <label>Area:</label>
        <select
          name="area"
          defaultValue={productForm.area}
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
          defaultValue={productForm.schedule}
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
      <button type="button" onClick={onSubmit} className="primary">
        Crear producto
      </button>
    </form>
  );
};
