import axios from "axios";

export default function () {
  const instance = axios.create({
    baseURL: "http://localhost:5000",
  });
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  return {
    $axios: instance,
  };
}
