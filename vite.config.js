import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Mock plugin to handle /api/node_check_port
const mockNodeCheckPortPlugin = () => ({
  name: 'mock-node-check-port',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = new URL(req.url, `http://${req.headers.host}`)
      if (url.pathname === '/api/node_check_port') {
        const nodeIp = url.searchParams.get('node_ip')
        const returnPort = url.searchParams.get('return_port')

        res.setHeader('Content-Type', 'application/json')

        if (!nodeIp) {
          res.end(JSON.stringify({
            code: -1,
            msg: '错误：缺少必要参数 node_ip',
            timestamp: new Date().toISOString()
          }))
          return
        }

        if (returnPort) {
          // 模拟端口检查
          // 为了演示方便，假设所有端口都可用（或者您可以添加简单的逻辑，比如禁止特定端口）
          res.end(JSON.stringify({
            code: 0,
            msg: '端口可用',
            timestamp: new Date().toISOString()
          }))
        } else {
          // 模拟自动分配
          const randomPort = Math.floor(Math.random() * (65535 - 10000) + 10000)
          res.end(JSON.stringify({
            code: 0,
            msg: '端口分配成功',
            timestamp: new Date().toISOString(),
            data: {
              node_ip: nodeIp,
              node_port: randomPort
            }
          }))
        }
        return
      }
      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), mockNodeCheckPortPlugin()],
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
