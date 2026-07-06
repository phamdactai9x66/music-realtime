import '@testing-library/jest-dom';
import 'vitest-canvas-mock';

vi.mock('firebase/database', () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(() => ({})),
  get: vi.fn(),
  onValue: vi.fn(),
  query: vi.fn(),
  orderByChild: vi.fn(),
  startAfter: vi.fn(),
  push: vi.fn(),
  set: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
}));

vi.mock('src/service/firebase', () => ({}));
