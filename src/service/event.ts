type listenerCb = (this: Document, ev: any) => any;

export enum LIST_EVENT {
  CURRENT_SONG = "CURRENT_SONG",
  SNACKBAR = "SNACKBAR",
  MODAL_GLOBAL = "MODAL_GLOBAL",
}

function subscribe(eventName: LIST_EVENT, listener: listenerCb) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: LIST_EVENT, listener: listenerCb) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName: LIST_EVENT, data: looseObj) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
