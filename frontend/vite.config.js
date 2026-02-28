import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    allowedHosts: ['syafiq-nb.tail5e6f37.ts.net', 'localhost', '127.0.0.1', '0.0.0.0'],
    proxy: {
      '/api': {
        target: 'http://ew_api:5000', // Proxy to Backend Container
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
    }
  }
})