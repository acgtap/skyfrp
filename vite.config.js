import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mskapi.cnwbhw.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Origin': 'https://mskapi.cnwbhw.com'
        }
      },
      '/auth': {
        target: 'https://mskapi.cnwbhw.com',
        changeOrigin: true,
        secure: true,
        headers: {
          'Origin': 'https://mskapi.cnwbhw.com'
        }
      }
    }
  }
})
