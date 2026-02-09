import { Route, Routes } from "react-router-dom";
import { useStore } from "./store/globalState";
import { LoginPage } from "./pages/LoginPage";
import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductPage } from "./pages/ProductPage";
import { Toast } from "./components/Toast";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { APP_ROUTES } from "./constants";

const App = () => {
  const { userProfile, toast, setToast } = useStore();

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

  if (!userProfile.data?.user) {
    return (
      <>
        <Toast visible={toast.visible} type={toast.type}>
          {toast.value}
        </Toast>
        <Routes>
          <Route path={APP_ROUTES.LOGIN} element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Toast visible={toast.visible} type={toast.type}>
        {toast.value}
      </Toast>
      <DashboardLayout>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<HomePage />} />
          <Route path={APP_ROUTES.PRODUCTS} element={<ProductsPage />} />
          <Route path={APP_ROUTES.PRODUCT} element={<ProductPage />} />
          <Route path={APP_ROUTES.USERS} element={<ProductsPage />} />
          <Route path="/test" element={<p>Hello from test</p>} />
        </Routes>
      </DashboardLayout>
    </>
  );
};

export default App;
