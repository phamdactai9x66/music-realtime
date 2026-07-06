import { describe, it, expect } from 'vitest';

import reducer, { loginUser } from './UserSlice';

describe('UserSlice', () => {
  const initialState = {
    isLogin: false,
    userInfo: {},
  };

  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('loginUser sets isLogin to true and stores userInfo', () => {
    const payload = {
      id: 'user123',
      name: 'John Doe',
      picture: 'https://example.com/avatar.jpg',
    };

    const state = reducer(initialState, loginUser(payload));
    expect(state.isLogin).toBe(true);
    expect(state.userInfo).toEqual(payload);
  });

  it('loginUser returns state unchanged when payload is falsy', () => {
    const state = reducer(initialState, loginUser(undefined as any));
    expect(state).toEqual(initialState);
  });

  it('loginUser stores extra properties on userInfo', () => {
    const payload = {
      id: 'user456',
      name: 'Jane',
      email: 'jane@example.com',
      verified_email: true,
    };

    const state = reducer(initialState, loginUser(payload));
    expect(state.userInfo).toHaveProperty('email', 'jane@example.com');
    expect(state.userInfo).toHaveProperty('verified_email', true);
  });
});
