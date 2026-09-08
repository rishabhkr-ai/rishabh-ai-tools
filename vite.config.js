import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600, // firebase's SDK chunk is inherently large; already isolated from the app bundle
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) return 'firebase'
            if (id.includes('react-router') || id.includes('/react/') || id.includes('/react-dom/')) return 'vendor'
          }
        },
      },
    },
  },
})
