export const parseBoolean = (str: string): boolean =>
  str.toLowerCase() === "true";

export const buildParams = (form: object) => {
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

export const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});
