import create, { SetState } from "zustand";
import { persist } from "zustand/middleware";

interface IAuth {
  token: String;
  username: String;
  email: String;
  updateAuth: ({
    token,
    username,
    email,
  }: {
    token: String;
    username: String;
    email: String;
  }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuth>()(
  persist(
    (set, get) => ({
      token: "",
      username: "",
      email: "",
      updateAuth: ({ token, username, email }: { token: String; username: String; email: String; }) => {
        set({
          token,
          username,
          email,
        });
      },
      clearAuth: () => {
        set({
            token: "",
            username: "",
            email: "",
          });
      }
    }),
    {
      name: "auth-storage",
    }
  )
);
