import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';


import httpRequest from 'src/service/httpRequest';

import useRoomMutation from './useRoomMutation';

vi.mock('src/service/httpRequest', () => ({
  default: {
    getData: vi.fn(),
  },
}));

describe('useRoomMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial roomsData as empty array', () => {
    const { result } = renderHook(() => useRoomMutation());

    expect(result.current.roomsData).toEqual([]);
  });

  it('searchRooms calls httpRequest.getData with correct args', async () => {
    const mockData = [{ _id: '1', name: 'Room 1' }];
    vi.mocked(httpRequest.getData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRoomMutation());

    await result.current.searchRooms('rooms', 'query1');

    expect(httpRequest.getData).toHaveBeenCalledWith('rooms', 'query1');
  });

  it('searchRooms updates roomsData after fetch', async () => {
    const mockData = [
      { _id: '1', name: 'Room 1' },
      { _id: '2', name: 'Room 2' },
    ];
    vi.mocked(httpRequest.getData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useRoomMutation());

    await result.current.searchRooms('rooms');

    await waitFor(() => {
      expect(result.current.roomsData).toEqual(mockData);
    });
  });
});
