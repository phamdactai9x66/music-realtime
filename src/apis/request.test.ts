import { describe, it, expect } from 'vitest';

import { songUrl, userUrl, myFavoritesUrl, RoomsUrl } from './request';

describe('songUrl', () => {
  it('returns "songs" when no id is provided', () => {
    expect(songUrl()).toBe('songs');
  });

  it('returns "songs/{id}" when id is provided', () => {
    expect(songUrl('abc123')).toBe('songs/abc123');
  });

  it('returns "songs" when undefined is passed', () => {
    expect(songUrl(undefined)).toBe('songs');
  });
});

describe('userUrl', () => {
  it('returns "users" when no id is provided', () => {
    expect(userUrl()).toBe('users');
  });

  it('returns "users/{id}" when id is provided', () => {
    expect(userUrl('user1')).toBe('users/user1');
  });

  it('returns "users" when undefined is passed', () => {
    expect(userUrl(undefined)).toBe('users');
  });
});

describe('myFavoritesUrl', () => {
  it('returns "my_favorites" when no id is provided', () => {
    expect(myFavoritesUrl()).toBe('my_favorites');
  });

  it('returns "my_favorites/{id}" when id is provided', () => {
    expect(myFavoritesUrl('fav1')).toBe('my_favorites/fav1');
  });

  it('returns "my_favorites" when undefined is passed', () => {
    expect(myFavoritesUrl(undefined)).toBe('my_favorites');
  });
});

describe('RoomsUrl', () => {
  it('returns "room" when no id is provided', () => {
    expect(RoomsUrl()).toBe('room');
  });

  it('returns "room/{id}" when id is provided', () => {
    expect(RoomsUrl('room1')).toBe('room/room1');
  });

  it('returns "room" when undefined is passed', () => {
    expect(RoomsUrl(undefined)).toBe('room');
  });
});
