
import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LIST_EVENT, publish } from 'src/service/event';

import SnackbarProvider from './SnackbarProvider';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>,
  );
};

describe('SnackbarProvider', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = renderWithTheme(<SnackbarProvider />);
    expect(container).toBeInTheDocument();
  });

  it('shows snackbar when SNACKBAR event is published', async () => {
    renderWithTheme(<SnackbarProvider />);

    publish(LIST_EVENT.SNACKBAR, {
      display: true,
      severity: 'success',
      message: 'Welcome to Web Music!!',
    });

    await waitFor(() => {
      expect(screen.getByText('Welcome to Web Music!!')).toBeInTheDocument();
    });
  });

  it('renders with error severity', async () => {
    renderWithTheme(<SnackbarProvider />);

    publish(LIST_EVENT.SNACKBAR, {
      display: true,
      severity: 'error',
      message: 'Something went wrong',
    });

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
