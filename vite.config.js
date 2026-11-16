import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works on GitHub Pages (/portfolio/) and locally.
export default defineConfig({
  base: './',
  plugins: [react()],
});
