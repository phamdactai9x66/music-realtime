/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    callbackFn: (currentStatus: boolean) => void;
  }
}
