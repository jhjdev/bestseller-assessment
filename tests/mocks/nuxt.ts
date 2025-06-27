import { vi } from 'vitest';

// Mock $fetch function
export const $fetch = vi.fn();

// Mock other Nuxt composables as needed
export const useRuntimeConfig = vi.fn(() => ({}));
export const navigateTo = vi.fn();
export const useRoute = vi.fn(() => ({
  params: {},
  query: {},
  path: '/',
}));
export const useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
}));
