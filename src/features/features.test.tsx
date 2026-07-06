
import { ThemeProvider, createTheme } from '@mui/material';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { TYPE_REDUCER } from 'src/store/configureStore';
import songReducer from 'src/store/SongSlice';
import userReducer from 'src/store/UserSlice';

import ChangePassword from './RoomDetail/Components/ChangePassword';

vi.mock('src/service/httpRequest', () => ({
  default: {
    getData: vi.fn(),
    getOne: vi.fn(),
    getPut: vi.fn(),
  },
}));

const mockStore = configureStore({
  reducer: combineReducers({
    [TYPE_REDUCER.SONG]: songReducer,
    [TYPE_REDUCER.USER]: userReducer,
  }),
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );
};

describe('RoomDetail feature', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ChangePassword renders without crashing', () => {
    renderWithProviders(
      <ChangePassword idRoom="room1" callBack={vi.fn()} />,
    );

    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });
});
