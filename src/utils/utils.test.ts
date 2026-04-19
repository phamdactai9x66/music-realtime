import { describe, it, expect, vi, beforeEach } from 'vitest';

import httpRequest from 'src/service/httpRequest';

import { cloneObj, addOrRemoveUser, getRouteMatchPath, isMatchRouters } from './utils';

// ─── Mock dependencies ────────────────────────────────────────────────────────

vi.mock('src/service/httpRequest', () => ({
  default: {
    getOne: vi.fn(),
    getPut: vi.fn(),
  },
}));

vi.mock('src/apis/request', () => ({
  RoomsUrl: (id?: string) => (id ? `room/${id}` : 'room'),
}));

vi.mock('src/routers/routers', () => ({
  PATH_ROUTER: {
    ROOT: '/',
    LOGIN: '/login',
    ROOMS: '/rooms',
    ROOM_DETAIL: '/rooms/:idRoom',
  },
}));

// ─── cloneObj ─────────────────────────────────────────────────────────────────

describe('cloneObj', () => {
  it('returns a deep clone of an object', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = cloneObj(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.b).not.toBe(original.b);
  });

  it('returns a deep clone of an array', () => {
    const original = [1, 2, { x: 3 }];
    const cloned = cloneObj(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[2]).not.toBe(original[2]);
  });

  it('handles empty object', () => {
    expect(cloneObj({})).toEqual({});
  });

  it('handles empty array', () => {
    expect(cloneObj([])).toEqual([]);
  });
});

// ─── isMatchRouters ───────────────────────────────────────────────────────────

describe('isMatchRouters', () => {
  it('returns array of path objects from PATH_ROUTER', () => {
    const result = isMatchRouters();

    expect(Array.isArray(result)).toBe(true);
    expect(result).toContainEqual({ path: '/' });
    expect(result).toContainEqual({ path: '/login' });
    expect(result).toContainEqual({ path: '/rooms' });
    expect(result).toContainEqual({ path: '/rooms/:idRoom' });
  });

  it('each item has a path property', () => {
    const result = isMatchRouters();
    result.forEach((item) => {
      expect(item).toHaveProperty('path');
      expect(typeof item.path).toBe('string');
    });
  });
});

// ─── getRouteMatchPath ────────────────────────────────────────────────────────

describe('getRouteMatchPath', () => {
  it('returns matched path for a known route', () => {
    const routes = [{ path: '/' }, { path: '/login' }, { path: '/rooms' }];
    const result = getRouteMatchPath(routes, '/login');

    expect(result).toBe('/login');
  });

  it('returns null when no route matches', () => {
    const routes = [{ path: '/rooms' }];
    const result = getRouteMatchPath(routes, '/unknown');

    expect(result).toBeNull();
  });

  it('returns root path for "/"', () => {
    const routes = [{ path: '/' }];
    const result = getRouteMatchPath(routes, '/');

    expect(result).toBe('/');
  });
});

// ─── addOrRemoveUser ──────────────────────────────────────────────────────────

describe('addOrRemoveUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does nothing when idRoom is missing', async () => {
    await addOrRemoveUser({ idUser: 'user1' }, 'ADD');

    expect(httpRequest.getOne).not.toHaveBeenCalled();
    expect(httpRequest.getPut).not.toHaveBeenCalled();
  });

  it('does nothing when idUser is missing', async () => {
    await addOrRemoveUser({ idRoom: 'room1' }, 'ADD');

    expect(httpRequest.getOne).not.toHaveBeenCalled();
    expect(httpRequest.getPut).not.toHaveBeenCalled();
  });

  it('adds user when type is ADD and user not in list', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({ users: ['user2'] });
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'ADD');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user2', 'user1'],
    });
  });

  it('does not add user when already in list', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({ users: ['user1', 'user2'] });
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'ADD');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user1', 'user2'],
    });
  });

  it('removes user when type is REMOVE and user in list', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({ users: ['user1', 'user2'] });
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'REMOVE');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user2'],
    });
  });

  it('does not remove user when not in list', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({ users: ['user2'] });
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'REMOVE');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user2'],
    });
  });

  it('handles empty users list on ADD', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({ users: [] });
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'ADD');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user1'],
    });
  });

  it('handles missing users field on ADD', async () => {
    vi.mocked(httpRequest.getOne).mockResolvedValue({});
    vi.mocked(httpRequest.getPut).mockResolvedValue(undefined);

    await addOrRemoveUser({ idRoom: 'room1', idUser: 'user1' }, 'ADD');

    expect(httpRequest.getPut).toHaveBeenCalledWith('room/room1', {
      users: ['user1'],
    });
  });
});
