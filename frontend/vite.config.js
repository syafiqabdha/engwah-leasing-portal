import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Engwah Leasing App',
        short_name: 'Engwah',
        description: 'Engwah Property Management System',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    }),
  ],
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    allowedHosts: ['syafiq-nb.tail5e6f37.ts.net', 'ewpl-svr.tail5e6f37.ts.net', 'localhost', '127.0.0.1', '0.0.0.0'],
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