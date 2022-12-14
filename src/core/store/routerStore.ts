import create from "zustand";
import { CurrentRoutType, IRouterStore, ModalTypes } from "../dtos";

export const useRouterStore = create<IRouterStore>()((set) => ({
  currentRoute: CurrentRoutType.Chatbox,
  modals: ModalTypes.none,
  caller: undefined,
  setCurrentRoute: (route) => {
    set({
      currentRoute: route,
    });
  },

  setModals: (type) => {
    set({
      modals: type,
    });
  },
  setCaller: (caller) => {
    set({
      caller,
    });
  },
}));
