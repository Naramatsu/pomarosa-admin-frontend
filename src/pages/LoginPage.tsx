import React, { useEffect, useState } from "react";
import { loginService, logoutService } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/globalState";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "../interfaces/user";
import { APP_ROUTES, RequestStatus } from "../constants";

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

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <section className="login-page">
      <h1>Iniciar sesión</h1>
      <form onSubmit={onLogin} className="form-product column">
        <section className="form-control">
          <label>Usuario</label>
          <input
            type="text"
            name="user"
            onChange={handlerChange}
            value={loginForm.user}
          />
        </section>

        <section className="form-control">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            onChange={handlerChange}
            value={loginForm.password}
          />
        </section>

        <button type="submit" className="info">
          login
        </button>
      </form>
    </section>
  );
};
