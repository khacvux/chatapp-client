import { ISignin, ISignup, ResponseGenerator } from "../dtos";
import AXIOS from "./axiosClient";

const subdirectory = "/auth";

export const signup = async (data: ISignup) => {
  try {
    const res = await AXIOS.post(`${subdirectory}/signup`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const signin = async (data: ISignin) => {
  try {
    return await AXIOS.post(`${subdirectory}/signin`, data);
  } catch (error) {
    return error;
  }
};

export const getusers = async (token: string) => {
  try {
    const res = await AXIOS.get(`${subdirectory}/getusers`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};
