import create from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuth, IResAuth, IReturnAuth } from "../dtos";

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
        console.log(response)
        if (response.status == 200) {
          set({
            access_token: response.data.access_token,
            username: response.data.username,
            id: response.data.id,
            response_message: "",
          });
        } else {
          set({
            response_message: response.data.msg? response.data.msg : "Eror",
          });
        }
      },
      fetchSignup: async (data) => {
        const response: any = await signup(data);
        console.log(response);
        if (response.status == 201) {
          set({
            access_token: response.data.access_token,
            username: response.data.username,
            id: response.data.id,
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
          id: undefined,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
