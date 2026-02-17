import { defineConfig } from 'vite'

// Proxy API routes to backend running on localhost:8000
export default defineConfig({
  server: {
    proxy: {
      '/group': 'http://localhost:8000',
      '/member': 'http://localhost:8000',
      '/event': 'http://localhost:8000',
      '/expense': 'http://localhost:8000',
      '/balance': 'http://localhost:8000',
      '/settlement': 'http://localhost:8000'
    }
  }
})
