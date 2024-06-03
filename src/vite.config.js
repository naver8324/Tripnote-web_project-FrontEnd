import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api/v1': {
    //     target: 'http://34.64.39.102:8080',
    //     changeOrigin: true,
    //   },
    // },
  },
});
