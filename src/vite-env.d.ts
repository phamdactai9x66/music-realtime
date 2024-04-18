/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

declare type looseObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
