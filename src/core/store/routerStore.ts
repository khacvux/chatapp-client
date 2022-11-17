import create from "zustand";
import { persist } from "zustand/middleware";
import { CurrentRoutType, IRouterStore, ModalTypes } from "../dtos";

export const useRouterStore = create<IRouterStore>()(
  persist(
    (set) => ({
      currentRoute: CurrentRoutType.Chatbox,
      modals: ModalTypes.none,
      setModals: (type) => {
        set({
          modals: type,
        });
      },
      setCurrentRoute: (route) => {
        set({
          currentRoute: route,
        });
      },
    }),
    {
      name: "router-storage",
    }
  )
);
