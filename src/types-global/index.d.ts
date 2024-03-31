export {}

declare global {
    interface Window {
        callbackFn: () => void;
    }
}
