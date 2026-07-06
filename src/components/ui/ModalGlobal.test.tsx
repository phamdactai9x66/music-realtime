
import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { LIST_EVENT, publish } from 'src/service/event';

import ModalGlobal from './ModalGlobal';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>,
  );
};

describe('ModalGlobal', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = renderWithTheme(<ModalGlobal />);
    expect(container).toBeInTheDocument();
  });

  it('opens modal when MODAL_GLOBAL event is published', async () => {
    renderWithTheme(<ModalGlobal />);

    publish(LIST_EVENT.MODAL_GLOBAL, {
      Component: () => <div>Test Modal Content</div>,
      ComponentProps: {},
    });

    await waitFor(() => {
      expect(screen.getByText('Test Modal Content')).toBeInTheDocument();
    });
  });
});
