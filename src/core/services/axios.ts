import axios from "axios";

const Axios = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 10000,
  headers: {
    "Cross-Origin-Resource-Policy": "cross-origin",
  },
  responseType: "json",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

export default Axios;
