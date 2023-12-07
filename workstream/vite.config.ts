import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const target = 'http://192.168.1.70:8889/';
const target = 'http://192.168.3.29:8888/';

export default defineConfig({
  plugins: [react(),],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        
      },
    },
  },
})
