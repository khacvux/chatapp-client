import create from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuth, IResAuth } from "../dtos";

export const useAuthStore = create<IAuth>()(
  persist(
    (set, get) => ({
      response_message: "",
      access_token: "",
      username: "",
      email: "",
      id: undefined,
      fetchSignin: async (data) => {
        const response: any = await signin(data);
        if (response.status == 200) {
          const decode_token: IResAuth = jwt(response.data.access_token);
          set({
            access_token: response.data.access_token,
            username: decode_token.username,
            id: decode_token.id,
            email: decode_token?.email || "",
            response_message: "",
          });
        } else {
          set({
            response_message: "Error",
          });
        }
      },
      fetchSignup: async (data) => {
        const response: any = await signup(data);
        console.log(response);
        if (response.status == 201) {
          const decode_token: IResAuth = jwt(response.data.access_token);
          set({
            access_token: response.data.access_token,
            username: decode_token.username,
            id: decode_token.id,
            email: decode_token?.email || "",
            response_message: "",
          });
        } else {
          set({
            response_message: "Account already exist",
          });
        }
      },
      setResponseMessage: (message) => {
        set({
          response_message: message,
        });
      },
      clearAuth: () => {
        set({
          access_token: "",
          username: "",
          email: "",
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
