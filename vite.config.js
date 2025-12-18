import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel'

export default defineConfig({
  plugins: [react(), vercel()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Dummy – we'll handle below
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})