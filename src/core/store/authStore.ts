import create from "zustand";
import jwt from 'jwt-decode'
import { persist } from "zustand/middleware";
import { signin } from "../apis";
import { IAuth, IResAuth, ISignin, ResponseGenerator } from "../dtos";

export const useAuthStore = create<IAuth>()(
  persist(
    (set, get) => ({
      message: "",
      access_token: "",
      username: "",
      email: "",
      id: undefined,
      fetchSignin: async (data) => {
        const response: any = await signin(data)
        if (response.status == 200) {
          const decode_token: IResAuth = jwt(response.data.access_token)
          console.log(decode_token)
          set({
            access_token: response.data.access_token,
            username: decode_token.username,
            id: decode_token.id,
            // email: decode_token.email,
            message: ""
          })
        } else {
          set({
            message: "Error"
          })  
        }
      },
      clearAuth: () => {
        set({
          access_token: "",
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
