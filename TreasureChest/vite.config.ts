import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('sonner') || id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            if (id.includes('crypto-js') || id.includes('qrcode')) {
              return 'utils-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
          // Route-based code splitting
          if (id.includes('/src/pages/tool/')) {
            return 'tool-pages';
          }
          if (id.includes('/src/pages/reference/')) {
            return 'reference-pages';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
