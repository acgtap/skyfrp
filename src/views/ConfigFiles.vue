<template>
  <DashboardLayout>
    <div class="space-y-8">
      <!-- 页面标题 -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">配置文件</h1>
        <p class="text-gray-600 mt-1">获取和下载FRP配置文件</p>
      </div>

      <!-- 隧道配置列表 -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7367f0]"></div>
      </div>

      <div v-else-if="tunnels.length === 0" class="text-center py-12">
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
            <h3 class="text-lg font-semibold text-gray-900">{{ tunnel.Tunnel_name }}</h3>
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
              <span>远程端口:</span>
              <span>{{ tunnel.return_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>协议:</span>
              <span>{{ tunnel.use_agreement }}</span>
            </div>
            <div class="flex justify-between">
              <span>节点:</span>
              <span>{{ tunnel.node_ip }}</span>
            </div>
          </div>
          
          <button @click="getConfig(tunnel.Tunnel_name)"
                  :disabled="configLoading === tunnel.Tunnel_name"
                  class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            {{ configLoading === tunnel.Tunnel_name ? '获取中...' : '获取配置文件' }}
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
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user'
import { tunnelAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'

// 状态管理
const loading = ref(true)
const tunnels = ref([])
const configLoading = ref(null)
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
      } else if (response.data && response.data.config) {
        // 兼容API文档中的格式
        currentConfig.value = response.data.config
        currentConfigName.value = tunnelName
        console.log('配置文件获取成功（data格式）')
      } else {
        console.error('API响应中没有配置数据:', response)
        alert('获取配置文件失败：后端返回数据格式错误')
      }
    } else {
      console.error('获取配置文件失败:', response.msg)
      alert(response.msg || '获取配置文件失败')
    }
  } catch (error) {
    console.error('获取配置文件异常:', error)
    alert('获取配置文件失败，请稍后重试')
  } finally {
    configLoading.value = null
  }
}

// 复制配置
const copyConfig = async () => {
  try {
    await navigator.clipboard.writeText(currentConfig.value)
    alert('配置文件已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    alert('复制失败，请手动复制')
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

onMounted(() => {
  loadTunnels()
})
</script>