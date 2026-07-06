import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LIST_EVENT, publish, subscribe, unsubscribe } from './event';

describe('event bus', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('subscribe receives published data', () => {
    const listener = vi.fn();
    const data = { message: 'hello' };

    subscribe(LIST_EVENT.SNACKBAR, listener);
    publish(LIST_EVENT.SNACKBAR, data);

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual(data);
  });

  it('unsubscribe removes the listener', () => {
    const listener = vi.fn();

    subscribe(LIST_EVENT.SNACKBAR, listener);
    unsubscribe(LIST_EVENT.SNACKBAR, listener);
    publish(LIST_EVENT.SNACKBAR, { test: true });

    expect(listener).not.toHaveBeenCalled();
  });

  it('multiple subscribers receive the same event', () => {
    const listener1 = vi.fn();
    const listener2 = vi.fn();

    subscribe(LIST_EVENT.CURRENT_SONG, listener1);
    subscribe(LIST_EVENT.CURRENT_SONG, listener2);
    publish(LIST_EVENT.CURRENT_SONG, { songId: 's1' });

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });

  it('publishes MODAL_GLOBAL event correctly', () => {
    const listener = vi.fn();
    const data = { Component: 'TestModal', ComponentProps: { id: 1 } };

    subscribe(LIST_EVENT.MODAL_GLOBAL, listener);
    publish(LIST_EVENT.MODAL_GLOBAL, data);

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail.Component).toBe('TestModal');
  });
});
