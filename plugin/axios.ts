// "use client";

import axios from "axios";
// import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_SERVICE_BASE_URL;
const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/vnd.github+json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  return response;
});

export { api };
