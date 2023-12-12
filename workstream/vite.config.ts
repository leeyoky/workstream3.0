import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [
    react(),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.3.29:8888/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});
