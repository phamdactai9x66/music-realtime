import { Action, Store } from "@reduxjs/toolkit";
import axios from "axios";
import {
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { increment } from "src/store/counterSlice";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const axiosClient = axios.create({
  baseURL: "https://example.com/api/v1",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  timeout: 20 * 1000,
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
  private db = getDatabase;

  async getData<T = looseObj>(url: string): Promise<T[]> {
    const data = await get(ref(this.db(), url));

    const convertData = Object.entries(data.val()) as T[][];

    const mapKey = convertData.reduce((pre, cur) => {
      const [_id, values] = cur;

      return [
        ...pre,
        {
          ...values,
          _id,
        },
      ];
    }, []);

    return mapKey;
  }
  getPost(url: string, data?: looseObj) {
    const newDatRef = ref(this.db(), url);

    return set(push(newDatRef), data);
  }
  getDelete(url: string) {
    const newDatRef = ref(this.db(), url);

    return remove(newDatRef);
  }
  getPut(url: string, data: looseObj) {
    const newDatRef = ref(this.db(), url);

    return update(push(newDatRef), data);
  }
}

export default new httpRequest();
