import { ErrorIcon } from "../assets/icons";

export interface ModalProps {
  visible?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  const modalActiveClass = visible ? "open" : "";
  return (
    <>
      <span className={`modal-blur-bg ${modalActiveClass}`} />
      <section role="alert" className={`modal ${modalActiveClass}`}>
        <section className="modal-title">
          {title && <h3>{title}</h3>}
          <ErrorIcon className="modal-close-btn" onClick={onClose} />
        </section>
        <section className="modal-content">{children}</section>
      </section>
    </>
  );
};
