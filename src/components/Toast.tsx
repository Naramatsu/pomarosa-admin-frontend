import { CheckIcon, ErrorIcon, InfoIcon } from "../assets/icons";
import { ToasTypes } from "../constants";

export interface ToastProps {
  type: ToasTypes | null;
  children: React.ReactNode | string | null;
  visible?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  children,
  visible = false,
}) => {
  const icon =
    type === ToasTypes.SUCCESS ? (
      <CheckIcon />
    ) : type === ToasTypes.INFO ? (
      <InfoIcon />
    ) : (
      <ErrorIcon />
    );
  return (
    <section
      className={`toast ${type} ${visible ? "visible" : ""}`}
      role="alert"
    >
      {icon}
      {children}
    </section>
  );
};
