import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { ICustomResponse } from "@/types";
import { getFromLocalStorage } from "@/utils/local-store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// @ts-ignore
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const modifiedResponse: ICustomResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return modifiedResponse;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
