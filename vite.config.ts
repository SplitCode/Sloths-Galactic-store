import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/* eslint import/no-default-export: 0 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch'
    }
  },
  server: {
    open: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true
  }
});
