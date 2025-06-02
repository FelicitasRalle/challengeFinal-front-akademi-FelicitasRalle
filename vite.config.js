import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/enrollments': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
      '/courses': 'http://localhost:5000',
      '/grades': 'http://localhost:5000',
      '/users': 'http://localhost:5000',
    }
  }
});
