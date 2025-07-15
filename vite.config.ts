/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/_variables.scss" as *;
          @use "@/scss/_colors.scss" as *;
          @use "@/scss/_mixins.scss" as *;
          @use "@/scss/_sizes.scss" as *;
        `,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    minify: 'terser',
    sourcemap: process.env.NODE_ENV === 'development',
  },
  server: {
    port: 3000,
  },
});
