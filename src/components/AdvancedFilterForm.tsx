import React, { useState } from "react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value } as AdvancedFilterState);
  };

  const buildParams = () => {
    const params: Record<string, unknown> = {};
    Object.entries(form).forEach(([k, v]) => {
      if (v === "" || v === undefined || v === null) return;
      if (k === "isAvailable" || k === "schedule") {
        if (v === "true") params[k] = true;
        else if (v === "false") params[k] = false;
      } else if (k.startsWith("from") || k.startsWith("to")) {
        const num = Number(v);
        if (!Number.isNaN(num)) params[k] = num;
      } else {
        params[k] = v;
      }
    });
    return params;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = buildParams();
    onApply(params);
    if (onClose) onClose();
  };

  const onClear = () => {
    setForm(initialState);
  };

  return (
    <form className="advanced-filter-form" onSubmit={onSubmit}>
      <div className="filter-section">
        <div className="filter-section-header">
          <h3 className="filter-section-title">📋 Datos básicos</h3>
        </div>
        <div className="filter-section-content">
          <div className="form-control">
            <label>Código</label>
            <input name="code" value={form.code} onChange={handleChange} />
          </div>

          <div className="form-control">
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="form-control">
            <label>Descripción</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label>Area</label>
            <select name="area" value={form.area} onChange={handleChange}>
              <option value="">- Cualquiera -</option>
              <option value="KITCHEN">Cocina</option>
              <option value="BAKERY">Panadería</option>
            </select>
          </div>

          <div className="form-control">
            <label>Sección</label>
            <input
              name="section"
              value={form.section}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-header">
          <h3 className="filter-section-title">✅ Disponibilidad</h3>
        </div>
        <div className="filter-section-content">
          <div className="form-control">
            <label>Horario</label>
            <select
              name="schedule"
              value={form.schedule}
              onChange={handleChange}
            >
              <option value="">- Cualquiera -</option>
              <option value="ALL_DAY">Todo el día</option>
              <option value="ONLY_DAY">Solo día</option>
              <option value="ONLY_NIGHT">Solo noche</option>
            </select>
          </div>

          <div className="form-control">
            <label>Disponible</label>
            <select
              name="isAvailable"
              value={form.isAvailable}
              onChange={handleChange}
            >
              <option value="">- Cualquiera -</option>
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-section-header">
          <h3 className="filter-section-title">💰 Precios</h3>
        </div>
        <div className="filter-section-content prices-grid">
          <div className="price-group">
            <h4>Caliente</h4>
            <div className="form-control">
              <label>Desde</label>
              <input
                name="fromHotPrice"
                type="number"
                value={form.fromHotPrice}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="form-control">
              <label>Hasta</label>
              <input
                name="toHotPrice"
                type="number"
                value={form.toHotPrice}
                onChange={handleChange}
                placeholder="999"
              />
            </div>
          </div>

          <div className="price-group">
            <h4>Frío</h4>
            <div className="form-control">
              <label>Desde</label>
              <input
                name="fromColdPrice"
                type="number"
                value={form.fromColdPrice}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="form-control">
              <label>Hasta</label>
              <input
                name="toColdPrice"
                type="number"
                value={form.toColdPrice}
                onChange={handleChange}
                placeholder="999"
              />
            </div>
          </div>

          <div className="price-group">
            <h4>Personal</h4>
            <div className="form-control">
              <label>Desde</label>
              <input
                name="fromPersonal"
                type="number"
                value={form.fromPersonal}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="form-control">
              <label>Hasta</label>
              <input
                name="toPersonal"
                type="number"
                value={form.toPersonal}
                onChange={handleChange}
                placeholder="999"
              />
            </div>
          </div>

          <div className="price-group">
            <h4>Familiar</h4>
            <div className="form-control">
              <label>Desde</label>
              <input
                name="fromFamiliar"
                type="number"
                value={form.fromFamiliar}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
            <div className="form-control">
              <label>Hasta</label>
              <input
                name="toFamiliar"
                type="number"
                value={form.toFamiliar}
                onChange={handleChange}
                placeholder="999"
              />
            </div>
          </div>
        </div>
      </div>

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
