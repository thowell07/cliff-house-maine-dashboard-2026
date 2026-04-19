import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cliff-house-maine-dashboard/',
  plugins: [react()],
});
