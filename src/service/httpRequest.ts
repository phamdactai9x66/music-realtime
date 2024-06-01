// import { Action, Store } from "@reduxjs/toolkit";
import axios from "axios";
import {
  get,
  getDatabase,
  push,
  query,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
// import { increment } from "src/store/SongSlice";

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

export const initRequest = () => {
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
      // action.dispatch(increment());
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getData<T = looseObj>(url: string, ...rest: any): Promise<T[]> {
    const queryApi = query(ref(this.db(), url), ...rest);

    const data = await get(queryApi);

    const convertData = Object.entries(data.val() || []) as T[][];

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getOne<T = looseObj>(url: string): Promise<T> {
    const queryApi = ref(this.db(), url);

    const data = await get(queryApi);

    let body: unknown = {};

    if (Object.values(data.val()).length) {
      body = {
        ...data.val(),
        _id: data.key,
      };
    }

    return body as T;
  }
  getPost(url: string, data?: looseObj, autoGenerateId = true) {
    let newDatRef = ref(this.db(), url);

    if (autoGenerateId) newDatRef = push(newDatRef);

    return set(newDatRef, data);
  }
  getDelete(url: string) {
    const newDatRef = ref(this.db(), url);

    return remove(newDatRef);
  }
  getPut(url: string, data: looseObj) {
    const newDatRef = ref(this.db(), url);

    return update(newDatRef, data);
  }
}

export default new httpRequest();
