/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  root: '.',
  publicDir: 'public',
  plugins: [react(), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/_variables.scss" as *;
          @use "@/styles/_colors.scss" as *;
          @use "@/styles/_mixins.scss" as *;
          @use "@/styles/_sizes.scss" as *;
        `,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      // https://chatgpt.com/c/68bfae54-d8c0-8326-a237-27b806e81b99 참고
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    minify: 'esbuild',
    sourcemap: process.env.NODE_ENV === 'development',
  },
  server: {
    port: Number(process.env.VITE_PORT) || 3000,
    open: true, // 자동으로 브라우저 열기
  },
});
