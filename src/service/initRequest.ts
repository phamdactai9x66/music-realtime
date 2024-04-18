import { Action, Store } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import { increment } from "src/store/counterSlice";

const axiosClient = axios.create({
  baseURL: "https://example.com/api/v1",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 20 * 1000,
  //   `withCredentials` indicates whether or not cross-site Access-Control requests
  withCredentials: false,
});

export const initRequest = (action: Store<unknown, Action>) => {
  // handle request api
  axios.interceptors.request.use(
    function (request) {
      return request;
    },
    null,
    { synchronous: true }
  );

  axios.interceptors.response.use(
    function (response) {
      action.dispatch(increment());
      //Dispatch any action on success
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        //Add Logic to
      }
      return Promise.reject(error);
    }
  );
};

class httpRequest {
  getData(url: string, config?: AxiosRequestConfig<looseObj>) {
    return axiosClient.get(url, config);
  }
  getPost(url: string, data?: looseObj, config?: AxiosRequestConfig<looseObj>) {
    return axiosClient.post(url, data, config);
  }
  getDelete(url: string, config?: AxiosRequestConfig<looseObj>) {
    return axiosClient.delete(url, config);
  }
  getPut(url: string, data?: looseObj, config?: AxiosRequestConfig<looseObj>) {
    return axiosClient.post(url, data, config);
  }
}

export default new httpRequest();
