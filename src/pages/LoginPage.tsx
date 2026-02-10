import React, { useEffect, useState } from "react";
import { loginService, logoutService } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/globalState";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "../interfaces/user";
import { APP_ROUTES, RequestStatus } from "../constants";
import "../styles/login.css";
import { Input } from "../components/Input";

const loginFormInitialState = {
  user: "",
  password: "",
};

export const LoginPage = () => {
  const { setToken, userProfile, setUserProfile } = useStore();
  const [loginForm, setLoginForm] = useState(loginFormInitialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfile.data?.user)
      (async () => {
        await logoutService(userProfile.data?.user ?? "");
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginForm.user || !loginForm.password) return;
    try {
      const result = await loginService(loginForm);
      const token = result.token;
      if (token) {
        setToken(token);
        const decoded = jwtDecode<IUser>(token);
        setUserProfile({
          data: decoded,
          status: RequestStatus.LOADED,
        });
        navigate(APP_ROUTES.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="login-screen">
      <section className="login-card">
        <section className="login-left">
          <img src="logo.webp" alt="pomarosa" className="login-logo" />
          <h2>Bienvenido</h2>
          <p className="muted">
            Ingresa tus credenciales para acceder al panel administrativo
          </p>
        </section>

        <section className="login-right">
          <h3>Iniciar sesión</h3>
          <form onSubmit={onLogin} className="login-form">
            <Input
              label="Usuario"
              name="user"
              onChange={handlerChange}
              value={loginForm.user}
              placeholder="tu usuario"
            />
            <Input
              label="Contraseña"
              name="password"
              type="password"
              onChange={handlerChange}
              value={loginForm.password}
              placeholder="••••••••"
            />

            <button type="submit" className="btn primary full">
              Entrar
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};
