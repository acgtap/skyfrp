<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- 页面标题和创建按钮 -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">隧道管理</h1>
          <p class="text-gray-600 mt-1">管理您的内网穿透隧道</p>
        </div>
        <button v-if="tunnels.length > 0" 
                @click="showCreateModal = true"
                class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>创建隧道</span>
        </button>
      </div>

      <!-- 隧道列表 -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7367f0]"></div>
      </div>

      <!-- 空状态 -->
      <div v-else-if="tunnels.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">创建您的第一个隧道</h3>
        <p class="text-gray-600 mb-6">开始使用内网穿透服务，让您的本地服务可以被外网访问</p>
        <button @click="showCreateModal = true"
                class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-8 py-3 rounded-lg font-medium transition-colors">
          立即创建
        </button>
      </div>

      <!-- 隧道卡片列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="tunnel in tunnels" :key="tunnel.Tunnel_name" 
             class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">隧道名称：{{ tunnel.Tunnel_name }}</h3>
              <div class="flex items-center mt-1">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="tunnel.tunnel_state === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <span class="w-1.5 h-1.5 rounded-full mr-1"
                        :class="tunnel.tunnel_state === 'online' ? 'bg-green-400' : 'bg-red-400'"></span>
                  {{ tunnel.tunnel_state === 'online' ? '在线' : '离线' }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="getConfig(tunnel.Tunnel_name)"
                      class="text-blue-600 hover:text-blue-800 p-1 rounded">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </button>
              <button @click="deleteTunnel(tunnel.Tunnel_name)"
                      class="text-red-600 hover:text-red-800 p-1 rounded">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>本地地址:</span>
              <span class="font-mono">{{ tunnel.Local_ip }}:{{ tunnel.Local_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>远程端口:</span>
              <span class="font-mono">{{ tunnel.return_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>协议:</span>
              <span class="uppercase">{{ tunnel.use_agreement }}</span>
            </div>
            <div class="flex justify-between">
              <span>节点:</span>
              <span>{{ tunnel.node_ip }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建隧道模态框 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-6">创建隧道</h2>
        
        <form @submit.prevent="createTunnel" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">隧道名称</label>
            <input v-model="createForm.tunnelName" 
                   type="text" 
                   required
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="请输入隧道名称">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">本地IP</label>
            <input v-model="createForm.localIp" 
                   type="text" 
                   required
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="127.0.0.1">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">本地端口</label>
            <input v-model="createForm.localPort" 
                   type="number" 
                   required
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="8080">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">节点</label>
            <select v-model="createForm.nodeIp" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent">
              <option value="">请选择节点</option>
              <option v-for="node in nodes" :key="node.ip" :value="node.ip">
                {{ node.node_name }} ({{ node.node_region }})
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">协议</label>
            <select v-model="createForm.protocol" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent">
              <option value="">请选择协议</option>
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">远程端口</label>
            <input v-model="createForm.remotePort" 
                   type="number" 
                   required
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="自动分配或指定端口">
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button type="button" 
                    @click="showCreateModal = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              取消
            </button>
            <button type="submit" 
                    :disabled="createLoading"
                    class="bg-[#7367f0] hover:bg-[#5f5bd8] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              {{ createLoading ? '创建中...' : '创建隧道' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user'
import { tunnelAPI, nodeAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'
import { logUserAction, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'
import { showSuccess, showError, showConfirm } from '../utils/modal'

// 数据
const tunnels = ref([])
const nodes = ref([])
const loading = ref(true)
const createLoading = ref(false)
const showCreateModal = ref(false)

// 创建表单
const createForm = ref({
  tunnelName: '',
  localIp: '127.0.0.1',
  localPort: '',
  nodeIp: '',
  protocol: '',
  remotePort: ''
})

// 加载隧道列表
const loadTunnels = async () => {
  try {
    console.log('开始加载隧道列表，tempKey:', userStore.tempKey)
    const response = await tunnelAPI.getTunnelList(userStore.tempKey)
    console.log('隧道列表API响应:', response)
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
      console.log('隧道列表:', tunnels.value)
    } else {
      console.error('获取隧道列表失败:', response.msg)
    }
  } catch (error) {
    console.error('加载隧道列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载节点列表
const loadNodes = async () => {
  try {
    const response = await nodeAPI.getNodeList(userStore.usersId)
    if (response.code === 0) {
      nodes.value = response.data.nodes || []
    }
  } catch (error) {
    console.error('加载节点列表失败:', error)
  }
}

// 创建隧道
const createTunnel = async () => {
  createLoading.value = true
  try {
    const tunnelData = {
      Tunnel_name: createForm.value.tunnelName,
      Local_ip: createForm.value.localIp,
      Local_port: createForm.value.localPort,
      node_ip: createForm.value.nodeIp,
      use_agreement: createForm.value.protocol,
      return_port: createForm.value.remotePort
    }
    
    console.log('创建隧道请求数据:', tunnelData)
    console.log('用户tempKey:', userStore.tempKey)
    
    const response = await tunnelAPI.createTunnel(userStore.tempKey, tunnelData)
    console.log('创建隧道API响应:', response)
    
    if (response.code === 0) {
      // 记录创建隧道日志
      await logUserAction(LOG_TYPES.TUNNEL, LOG_ACTIONS.CREATE_TUNNEL, 'success', {
        tunnelName: createForm.value.tunnelName,
        protocol: createForm.value.protocol,
        nodeIp: createForm.value.nodeIp
      })
      
      showSuccess('隧道创建成功！', '创建成功')
      showCreateModal.value = false
      // 重置表单
      createForm.value = {
        tunnelName: '',
        localIp: '127.0.0.1',
        localPort: '',
        nodeIp: '',
        protocol: '',
        remotePort: ''
      }
      // 重新加载隧道列表
      console.log('重新加载隧道列表...')
      await loadTunnels()
    } else {
      // 记录创建失败日志
      await logUserAction(LOG_TYPES.TUNNEL, LOG_ACTIONS.CREATE_TUNNEL, 'failed', {
        tunnelName: createForm.value.tunnelName,
        error: response.msg
      })
      
      showError(response.msg || '隧道创建失败', '创建失败')
    }
  } catch (error) {
    console.error('创建隧道异常:', error)
    // 记录创建失败日志
    await logUserAction(LOG_TYPES.TUNNEL, LOG_ACTIONS.CREATE_TUNNEL, 'failed', {
      tunnelName: createForm.value.tunnelName,
      error: error.message
    })
    
    showError('隧道创建失败，请稍后重试', '创建失败')
  } finally {
    createLoading.value = false
  }
}

// 删除隧道
const deleteTunnel = async (tunnelName) => {
  showConfirm(
    `确定要删除隧道 "${tunnelName}" 吗？\n删除后将无法恢复。`,
    '删除隧道',
    async () => {
      try {
        const response = await tunnelAPI.deleteTunnel(userStore.tempKey, tunnelName)
        if (response.code === 0) {
          // 记录删除隧道日志
          await logUserAction(LOG_TYPES.TUNNEL, LOG_ACTIONS.DELETE_TUNNEL, 'success', {
            tunnelName
          })
          
          showSuccess('隧道删除成功！', '删除成功')
          loadTunnels()
        } else {
          // 记录删除失败日志
          await logUserAction(LOG_TYPES.TUNNEL, LOG_ACTIONS.DELETE_TUNNEL, 'failed', {
            tunnelName,
            error: response.msg
          })
          
          showError(response.msg || '隧道删除失败', '删除失败')
        }
      } catch (error) {
        showError('隧道删除失败，请稍后重试', '删除失败')
      }
    }
  )
}

// 获取配置
const getConfig = async (tunnelName) => {
  try {
    const response = await tunnelAPI.getNodeConfig(userStore.tempKey, tunnelName)
    if (response.code === 0) {
      // 创建下载链接
      const blob = new Blob([response.data.config], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${tunnelName}.ini`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      showSuccess('配置文件下载成功！', '下载成功')
    } else {
      showError(response.msg || '获取配置失败', '获取失败')
    }
  } catch (error) {
    showError('获取配置失败，请稍后重试', '获取失败')
  }
}

onMounted(() => {
  loadTunnels()
  loadNodes()
})
</script>