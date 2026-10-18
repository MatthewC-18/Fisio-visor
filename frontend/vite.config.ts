/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    // La lógica pura no necesita DOM: así las pruebas corren igual que el benchmark en Node.
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
