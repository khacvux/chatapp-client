import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AXIOS;
