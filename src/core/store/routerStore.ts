import create from "zustand";
import { CurrentRoutType, IRouterStore, ModalTypes } from "../dtos";

export const useRouterStore = create<IRouterStore>((set) => ({
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
}));
