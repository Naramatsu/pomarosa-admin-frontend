import { useNavigate } from "react-router-dom";
import { BackArrow } from "../assets/icons";

export interface HeaderProps {
  children?: React.ReactNode | string;
  title: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <section className="page-header">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Volver"
      >
        <BackArrow colors="#fff" />
      </button>
      <div className="page-title-wrapper">
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
        {children && children}
      </div>
    </section>
  );
};
