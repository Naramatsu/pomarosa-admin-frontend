import axios from "axios";
import type { ILoginPayload, ILoginResponse } from "../interfaces/user";

const API_URL = import.meta.env.VITE_API_URL;

export const loginService = async (
  params: ILoginPayload,
): Promise<ILoginResponse> => {
  const { data } = await axios.post(`${API_URL}/admin/login`, params);
  return data;
};

export const logoutService = async (user: string): Promise<ILoginResponse> => {
  const { data } = await axios.post(`${API_URL}/admin/logout`, { user });
  return data;
};
