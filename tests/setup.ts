import { vi } from 'vitest';

// Mock global Nuxt functions
(global as any).$fetch = vi.fn();

// Set environment variable for tests
process.env.NODE_ENV = 'test';

// Mock window.location for tests
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
  },
  writable: true,
});
