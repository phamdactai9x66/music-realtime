import { describe, it, expect } from 'vitest';

import reducer, { triggerSong } from './SongSlice';

describe('SongSlice', () => {
  const initialState = {
    audio_url: '',
    description: '',
    image_song: '',
    name_authors: '',
    name_song: '',
  };

  it('returns initial state', () => {
    const state = reducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });

  it('triggerSong sets the song payload', () => {
    const payload = {
      audio_url: 'https://example.com/audio.mp3',
      description: 'A test song',
      image_song: 'https://example.com/image.jpg',
      name_authors: 'Test Artist',
      name_song: 'Test Song',
    };

    const state = reducer(initialState, triggerSong(payload));
    expect(state).toEqual(payload);
  });

  it('triggerSong returns state unchanged when payload is falsy', () => {
    const state = reducer(initialState, triggerSong(undefined as any));
    expect(state).toEqual(initialState);
  });

  it('triggerSong preserves extra properties on payload', () => {
    const payload = {
      audio_url: 'https://example.com/audio.mp3',
      description: '',
      image_song: '',
      name_authors: '',
      name_song: 'Song',
      _id: 'xyz789',
    };

    const state = reducer(initialState, triggerSong(payload));
    expect(state).toHaveProperty('_id', 'xyz789');
    expect(state.name_song).toBe('Song');
  });
});
