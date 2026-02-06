import { Route, Routes, useNavigate } from "react-router-dom";
import { useStore } from "./store/globalState";
import { LoginPage } from "./pages/LoginPage";
import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { logoutService } from "./services/user";
import { RequestStatus } from "./constants";
import { Toast } from "./components/Toast";

const App = () => {
  const { userProfile, setUserProfile, toast, setToast } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userProfile.data) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer = undefined;
    let timer2 = undefined;

    if (toast.visible) {
      timer = setTimeout(() => {
        setToast({
          ...toast,
          visible: false,
        });
      }, 2000);

      timer2 = setTimeout(() => {
        setToast({
          type: null,
          value: null,
          visible: false,
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  const onLogout = async () => {
    await logoutService(userProfile.data?.user ?? "");
    setUserProfile({
      status: RequestStatus.NOT_LOADED,
      data: null,
    });
  };

  return (
    <main className="app-main">
      {userProfile.data?.user && (
        <section className="global-menu">
          <img src="logo.webp" alt="pomarosa_logo" className="logo" />
          <h3>Bienvenido al modulo de administración</h3>
          <span className="separator" />
          <section className="btn-group">
            <button className="btn-menu" onClick={() => navigate("/users")}>
              Administradores
            </button>
            <button className="btn-menu" onClick={() => navigate("/products")}>
              Productos
            </button>
          </section>
          <button className="btn-logout error" onClick={onLogout}>
            Cerrar sesión
          </button>
        </section>
      )}

      <Toast visible={toast.visible} type={toast.type}>
        {toast.value}
      </Toast>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/users" element={<ProductsPage />} />
        <Route path="/test" element={<p>Hello from test</p>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </main>
  );
};

export default App;
