import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src'],
      exclude: ['src/App.tsx', 'src/**/*.d.ts'],
    },
  },
});
