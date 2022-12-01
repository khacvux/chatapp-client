import create from "zustand";
import { IToastStore, ToastTypes } from "../dtos";

export const useToastStore = create<IToastStore>()((set, get) => ({
  toast: ToastTypes.none,
  setToast: (toast) => {
    set({
      toast: toast,
    });
  },
}));
