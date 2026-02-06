import type { ToasTypes } from "../constants";

export interface IToast {
  type: ToasTypes | null;
  value: React.ReactNode | string | null;
  visible: boolean;
}
