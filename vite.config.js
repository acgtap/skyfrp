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
      },
      '/notice': {
        target: 'https://msk.cnwbhw.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/notice/, '/service/Notice'),
        headers: {
          'Origin': 'https://msk.cnwbhw.com'
        }
      }
    }
  }
})
