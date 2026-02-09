<template>
  <div>
    <div class="space-y-8">
      <!-- 页面标题 -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">配置文件</h1>
        <p class="text-gray-600 mt-1">获取和下载FRP配置文件</p>
      </div>

      <!-- 隧道配置列表 -->
      <div v-if="tunnels.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">暂无隧道</h3>
        <p class="text-gray-600 mb-4">您还没有创建任何隧道，请先创建隧道</p>
        <router-link to="/tunnels" 
                     class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-6 py-3 rounded-lg font-medium transition-colors">
          创建隧道
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="tunnel in tunnels" :key="tunnel.Tunnel_name" 
             class="bg-white rounded-lg border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">隧道名称：{{ tunnel.Tunnel_name }}</h3>
            <span class="px-2 py-1 text-xs rounded-full"
                  :class="tunnel.tunnel_state === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
              {{ tunnel.tunnel_state === 'online' ? '在线' : '离线' }}
            </span>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex justify-between">
              <span>本地地址:</span>
              <span>{{ tunnel.Local_ip }}:{{ tunnel.Local_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>连接地址:</span>
              <span>{{ tunnel.node_ip }}:{{ tunnel.return_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>协议:</span>
              <span>{{ tunnel.use_agreement }}</span>
            </div>
          </div>
          
          <button @click="getConfig(tunnel.Tunnel_name)"
                  :disabled="configLoading === tunnel.Tunnel_name || configSuccess === tunnel.Tunnel_name"
                  class="w-full text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  :class="{
                    'bg-[#7367f0] hover:bg-[#5f5bd8]': configLoading !== tunnel.Tunnel_name && configSuccess !== tunnel.Tunnel_name,
                    'bg-gray-400 cursor-not-allowed': configLoading === tunnel.Tunnel_name,
                    'bg-green-500': configSuccess === tunnel.Tunnel_name
                  }">
            <!-- 加载中图标 -->
            <svg v-if="configLoading === tunnel.Tunnel_name" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <!-- 成功图标 -->
            <svg v-else-if="configSuccess === tunnel.Tunnel_name" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <!-- 默认图标 -->
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>
              {{ configLoading === tunnel.Tunnel_name ? '获取中...' : 
                 configSuccess === tunnel.Tunnel_name ? '获取成功' : 
                 '获取配置文件' }}
            </span>
          </button>
        </div>
      </div>

      <!-- 配置文件显示 -->
      <div v-if="currentConfig" class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">配置文件 - {{ currentConfigName }}</h3>
          <div class="space-x-2">
            <button @click="copyConfig" 
                    class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              复制配置
            </button>
            <button @click="downloadConfig" 
                    class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              下载配置
            </button>
          </div>
        </div>
        
        <pre class="bg-gray-50 rounded-lg p-4 text-sm overflow-x-auto border">{{ currentConfig }}</pre>
      </div>

      <!-- 使用说明 -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 class="text-lg font-semibold text-blue-900 mb-4">使用说明</h4>
        <div class="space-y-3 text-sm text-blue-800">
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">1.</span>
            <span>点击"获取配置文件"按钮获取对应隧道的FRP配置</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">2.</span>
            <span>将配置文件保存为 frpc.ini 文件</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">3.</span>
            <span>使用FRP客户端加载配置文件启动隧道</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">4.</span>
            <span>如需帮助请访问帮助文档或联系客服QQ群：572658815</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '../stores/user'
import { tunnelAPI } from '../api'
import { showSuccess, showError } from '../utils/modal'

const router = useRouter()
const route = useRoute()

// 状态管理
const loading = ref(true)
const tunnels = ref([])
const configLoading = ref(null)
const configSuccess = ref(null) // 新增：成功状态
const currentConfig = ref('')
const currentConfigName = ref('')

// 加载隧道列表
const loadTunnels = async () => {
  try {
    const response = await tunnelAPI.getTunnelList(userStore.tempKey)
    console.log('配置文件页面-隧道列表API响应:', response)
    if (response.code === 0) {
      // 检查data是数组还是对象
      if (Array.isArray(response.data)) {
        // 如果data直接是数组
        tunnels.value = response.data
      } else if (response.data && response.data.tunnels) {
        // 如果data是对象，包含tunnels属性
        tunnels.value = response.data.tunnels
      } else {
        tunnels.value = []
      }
      console.log('配置文件页面-隧道列表:', tunnels.value)
    }
  } catch (error) {
    console.error('加载隧道列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取配置文件
const getConfig = async (tunnelName) => {
  configLoading.value = tunnelName
  
  try {
    console.log('获取配置文件，隧道名称:', tunnelName)
    console.log('用户tempKey:', userStore.tempKey)
    
    const response = await tunnelAPI.getNodeConfig(userStore.tempKey, tunnelName)
    console.log('获取配置文件API响应:', response)
    
    if (response.code === 0) {
      // 后端返回的config直接在根级别，不在data里面
      if (response.config) {
        currentConfig.value = response.config
        currentConfigName.value = tunnelName
        console.log('配置文件获取成功')
        
        // 显示成功状态
        configLoading.value = null
        configSuccess.value = tunnelName
        
        // 1.5秒后恢复按钮状态
        setTimeout(() => {
          configSuccess.value = null
        }, 1500)
      } else if (response.data && response.data.config) {
        // 兼容API文档中的格式
        currentConfig.value = response.data.config
        currentConfigName.value = tunnelName
        console.log('配置文件获取成功（data格式）')
        
        // 显示成功状态
        configLoading.value = null
        configSuccess.value = tunnelName
        
        // 1.5秒后恢复按钮状态
        setTimeout(() => {
          configSuccess.value = null
        }, 1500)
      } else {
        console.error('API响应中没有配置数据:', response)
        configLoading.value = null
        showError('获取配置文件失败：后端返回数据格式错误', '获取失败')
      }
    } else {
      console.error('获取配置文件失败:', response.msg)
      configLoading.value = null
      showError(response.msg || '获取配置文件失败', '获取失败')
    }
  } catch (error) {
    console.error('获取配置文件异常:', error)
    configLoading.value = null
    showError('获取配置失败，请稍后重试', '获取失败')
  }
}

// 复制配置
const copyConfig = async () => {
  try {
    await navigator.clipboard.writeText(currentConfig.value)
    showSuccess('配置文件已复制到剪贴板', '复制成功')
  } catch (error) {
    console.error('复制失败:', error)
    showError('复制失败，请手动复制', '复制失败')
  }
}

// 下载配置
const downloadConfig = () => {
  const blob = new Blob([currentConfig.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${currentConfigName.value}_frpc.ini`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

onMounted(async () => {
  await loadTunnels()
  
  // 检查是否有路由参数指定的隧道
  const tunnelName = route.query.tunnel
  if (tunnelName) {
    console.log('检测到路由参数，自动获取隧道配置:', tunnelName)
    // 等待隧道列表加载完成后，自动获取配置
    const tunnel = tunnels.value.find(t => t.Tunnel_name === tunnelName)
    if (tunnel) {
      // 延迟一下，确保页面渲染完成
      setTimeout(() => {
        getConfig(tunnelName)
      }, 300)
    } else {
      console.warn('未找到指定的隧道:', tunnelName)
      showError('未找到指定的隧道', '错误')
    }
  }
})
</script>