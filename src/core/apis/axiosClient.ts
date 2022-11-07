import axios from "axios";
import { BASE_URL } from "../../utils";

const AXIOS = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AXIOS;
