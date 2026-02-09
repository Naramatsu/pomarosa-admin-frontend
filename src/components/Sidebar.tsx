import { useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../store/globalState";
import { logoutService } from "../services/user";
import { APP_ROUTES, RequestStatus } from "../constants";
import "../styles/sidebar.css";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile, setUserProfile } = useStore();

  const onLogout = async () => {
    await logoutService(userProfile.data?.user ?? "");
    setUserProfile({
      status: RequestStatus.NOT_LOADED,
      data: null,
    });
  };

  const isActive = (path: string) => location.pathname === path;
  const productPath = APP_ROUTES.PRODUCTS;
  const usersPath = APP_ROUTES.USERS;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="logo.webp" alt="Pomarosa Logo" className="sidebar-logo" />
        <h2 className="sidebar-title">Pomarosa Admin</h2>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${isActive(productPath) ? "active" : ""}`}
          onClick={() => navigate(productPath)}
        >
          <span className="nav-icon">📦</span>
          <span className="nav-text">Productos</span>
        </button>

        <button
          className={`nav-item ${isActive(usersPath) ? "active" : ""}`}
          onClick={() => navigate(usersPath)}
        >
          <span className="nav-icon">👥</span>
          <span className="nav-text">Usuarios</span>
        </button>
      </nav>

      <button className="btn-logout" onClick={onLogout}>
        <span className="logout-icon">🚪</span>
        Cerrar sesión
      </button>
    </aside>
  );
};
