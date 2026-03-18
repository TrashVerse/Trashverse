import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Disable fast refresh for better stability during development
      fastRefresh: false,
      // Use SWC for better performance
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3001,
    open: true,
    hmr: {
      // Reduce HMR sensitivity to prevent unnecessary reloads
      overlay: false,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Optimize dependencies to prevent re-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
  },
})
