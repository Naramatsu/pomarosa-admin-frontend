import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { IGlobalActions, IGlobalState } from "../interfaces/globalState";
import { RequestStatus } from "../constants";

export const useStore = create<
  IGlobalState & IGlobalActions,
  [["zustand/persist", Partial<IGlobalState>]]
>(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        set(() => ({ token }));
      },

      userProfile: { data: null, status: RequestStatus.NOT_LOADED },
      setUserProfile: (userProfile) => {
        set(() => ({ userProfile }));
      },

      users: {
        data: [],
        status: RequestStatus.NOT_LOADED,
      },
      setUsers: (users) => {
        set(() => ({ users }));
      },

      user: { data: null, status: RequestStatus.NOT_LOADED },
      setUser: (user) => {
        set(() => ({ user }));
      },

      products: {
        data: [],
        status: RequestStatus.NOT_LOADED,
      },
      setProducts: (products) => {
        set(() => ({ products }));
      },

      product: { data: null, status: RequestStatus.NOT_LOADED },
      setProduct: (product) => {
        set(() => ({ product }));
      },

      toast: { type: null, value: null, visible: false },
      setToast: (toast) => {
        set(() => ({ toast }));
      },
    }),
    {
      name: "globalState",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        userProfile: state.userProfile,
        users: state.users,
        user: state.user,
        products: state.products,
        product: state.product,
      }),
    },
  ),
);
