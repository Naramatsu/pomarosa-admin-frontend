import React, { useMemo, useState } from "react";
import { AREAS_ITEMS, SCHEDULE_ITEMS } from "../constants";
import { FilterSection } from "../layouts/FilterSection";
import { Input } from "./Input";
import { Select } from "./Select";
import { buildParams } from "../utils";

interface AdvancedFilterProps {
  onApply: (params: Record<string, unknown>) => void;
  onClose?: () => void;
}

type AdvancedFilterState = {
  code: string;
  name: string;
  description: string;
  area: string;
  section: string;
  schedule: string;
  isAvailable: string;
  fromHotPrice: string;
  toHotPrice: string;
  fromColdPrice: string;
  toColdPrice: string;
  fromPersonal: string;
  toPersonal: string;
  fromFamiliar: string;
  toFamiliar: string;
};

const initialState: AdvancedFilterState = {
  code: "",
  name: "",
  description: "",
  area: "",
  section: "",
  schedule: "",
  isAvailable: "",
  fromHotPrice: "",
  toHotPrice: "",
  fromColdPrice: "",
  toColdPrice: "",
  fromPersonal: "",
  toPersonal: "",
  fromFamiliar: "",
  toFamiliar: "",
};

export const AdvancedFilterForm = ({
  onApply,
  onClose,
}: AdvancedFilterProps) => {
  const [form, setForm] = useState<AdvancedFilterState>(initialState);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value } as AdvancedFilterState);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = buildParams(form);
    onApply(params);
    if (onClose) onClose();
  };

  const onClear = () => {
    setForm(initialState);
  };

  const basicDataFilds = useMemo(
    () => [
      {
        label: "Código",
        name: "code",
        value: form.code,
      },
      {
        label: "Nombre",
        name: "name",
        value: form.name,
      },
      {
        label: "Descripción",
        name: "description",
        value: form.description,
      },
      {
        label: "Sección",
        name: "section",
        value: form.section,
      },
    ],
    [form.code, form.name, form.description, form.section],
  );

  const priceFilds = useMemo(
    () => [
      {
        title: "Caliente",
        inputs: [
          {
            label: "Desde",
            name: "fromHotPrice",
            value: form.fromHotPrice,
          },
          {
            label: "Hasta",
            name: "toHotPrice",
            value: form.toHotPrice,
          },
        ],
      },
      {
        title: "Frio",
        inputs: [
          {
            label: "Desde",
            name: "fromColdPrice",
            value: form.fromColdPrice,
          },
          {
            label: "Hasta",
            name: "toColdPrice",
            value: form.toColdPrice,
          },
        ],
      },
      {
        title: "Personal",
        inputs: [
          {
            label: "Desde",
            name: "fromPersonal",
            value: form.fromPersonal,
          },
          {
            label: "Hasta",
            name: "toPersonal",
            value: form.toPersonal,
          },
        ],
      },
      {
        title: "Familiar",
        inputs: [
          {
            label: "Desde",
            name: "fromFamiliar",
            value: form.fromFamiliar,
          },
          {
            label: "Hasta",
            name: "toFamiliar",
            value: form.toFamiliar,
          },
        ],
      },
    ],
    [
      form.fromHotPrice,
      form.toHotPrice,
      form.fromColdPrice,
      form.toColdPrice,
      form.fromPersonal,
      form.toPersonal,
      form.fromFamiliar,
      form.toFamiliar,
    ],
  );

  return (
    <form className="advanced-filter-form" onSubmit={onSubmit}>
      <FilterSection title="Datos básicos">
        {basicDataFilds.map(({ label, name, value }) => (
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
          label="area"
          name="area"
          value={form.area}
          onChange={handleChange}
          items={AREAS_ITEMS}
          itemDefault
        />
        <Select
          label="Horario"
          name="schedule"
          value={form.schedule}
          onChange={handleChange}
          items={SCHEDULE_ITEMS}
          itemDefault
        />
        <Select
          label="Disponible"
          name="isAvailable"
          value={form.isAvailable}
          onChange={handleChange}
          items={[
            { value: "true", label: "Sí" },
            { value: "false", label: "No" },
          ]}
          itemDefault
        />
      </FilterSection>

      <FilterSection title="Precios" isGrid>
        {priceFilds.map(({ title, inputs }) => (
          <div key={title} className="price-group">
            <h4>{title}</h4>
            {inputs.map(({ label, name, value }) => (
              <Input
                key={name}
                type="number"
                label={label}
                name={name}
                value={value}
                placeholder={label}
                onChange={handleChange}
              />
            ))}
          </div>
        ))}
      </FilterSection>

      <div className="form-actions">
        <button type="button" onClick={onClear}>
          Limpiar
        </button>
        <button type="submit" className="primary">
          Aplicar filtro
        </button>
      </div>
    </form>
  );
};

export default AdvancedFilterForm;
