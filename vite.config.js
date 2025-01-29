import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './src',
  resolve: {
    alias: {
      '@js': path.resolve(__dirname, './scripts'), 
    },
  },
});
