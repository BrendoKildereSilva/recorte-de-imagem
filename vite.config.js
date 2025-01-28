import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './src',
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, '.src/styles'), // Alias para facilitar o uso de SCSS
    },
  },
});
