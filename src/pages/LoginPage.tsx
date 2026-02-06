import React, { useState } from "react";
import { loginService } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/globalState";
import { jwtDecode } from "jwt-decode";
import type { IUser } from "../interfaces/user";
import { RequestStatus } from "../constants";

const loginFormInitialState = {
  user: "",
  password: "",
};

export const LoginPage = () => {
  const { setToken, setUserProfile } = useStore();
  const [loginForm, setLoginForm] = useState(loginFormInitialState);
  const navigate = useNavigate();

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
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Hello from Login page</h1>
      <form onSubmit={onLogin}>
        <input
          type="text"
          name="user"
          value={loginForm.user}
          onChange={handlerChange}
        />
        <input
          type="password"
          name="password"
          value={loginForm.password}
          onChange={handlerChange}
        />
        <button type="submit">login</button>
      </form>
    </section>
  );
};
