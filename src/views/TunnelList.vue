<template>
  <div>
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
              <div class="flex items-center mt-2 space-x-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="(tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <span class="w-1.5 h-1.5 rounded-full mr-1"
                        :class="(tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true) ? 'bg-green-400' : 'bg-red-400'"></span>
                  {{ (tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true) ? '在线' : '离线' }}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                  </svg>
                  {{ getNodeName(tunnel.node_ip) }}
                </span>
              </div>
            </div>
            <div class="flex space-x-2">
              <div class="relative group">
                <button @click="showTunnelDetail(tunnel)"
                        class="text-gray-600 hover:text-gray-800 p-2 rounded hover:bg-gray-100 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </button>
                <!-- 提示框 -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  查看详情
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div class="relative group">
                <button @click="openEditTunnelModal(tunnel)"
                        :disabled="tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true"
                        class="text-purple-600 hover:text-purple-800 p-2 rounded hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <!-- 提示框 -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  {{ (tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true) ? '隧道运行中无法编辑' : '编辑隧道' }}
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div class="relative group">
                <button @click="getConfig(tunnel.Tunnel_name)"
                        class="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </button>
                <!-- 提示框 -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  获取配置文件
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
              <div class="relative group">
                <button @click="deleteTunnel(tunnel.Tunnel_name)"
                        class="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
                <!-- 提示框 -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
                  删除隧道
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex justify-between">
              <span>本地地址:</span>
              <span class="font-mono">{{ tunnel.Local_ip }}:{{ tunnel.Local_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>连接地址:</span>
              <span class="font-mono">{{ tunnel.node_ip }}:{{ tunnel.return_port }}</span>
            </div>
            <div class="flex justify-between">
              <span>协议:</span>
              <span class="uppercase">{{ tunnel.use_agreement }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建隧道模态框 -->
    <Transition name="modal-zoom">
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
              <!-- <option value="http">HTTP</option> -->
              <!-- <option value="https">HTTPS</option> -->
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
    </Transition>
    
    <!-- 编辑隧道模态框 -->
    <Transition name="modal-zoom">
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 class="text-xl font-bold text-gray-900 mb-6">编辑隧道</h2>
        
        <form @submit.prevent="updateTunnel" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">隧道名称</label>
            <input :value="editForm.tunnelName" 
                   type="text" 
                   disabled
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                   placeholder="隧道名称不可修改">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">本地IP</label>
            <input v-model="editForm.localIp" 
                   type="text" 
                   required
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="127.0.0.1">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">本地端口</label>
            <input v-model="editForm.localPort" 
                   type="number" 
                   required
                   min="1"
                   max="65535"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="8080">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">协议</label>
            <select v-model="editForm.protocol" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent">
              <option value="">请选择协议</option>
              <option value="tcp">TCP</option>
              <option value="udp">UDP</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">远程端口</label>
            <input v-model="editForm.remotePort" 
                   type="number" 
                   required
                   min="1"
                   max="65535"
                   class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                   placeholder="远程端口">
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button type="button" 
                    @click="showEditModal = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              取消
            </button>
            <button type="submit" 
                    :disabled="editLoading"
                    class="bg-[#7367f0] hover:bg-[#5f5bd8] disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              {{ editLoading ? '保存中...' : '保存修改' }}
            </button>
          </div>
        </form>
      </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/user'
import { tunnelAPI, nodeAPI } from '../api'
import { logUserAction, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'
import { showSuccess, showError, showConfirm } from '../utils/modal'

const router = useRouter()

// 数据
const tunnels = ref([])
const nodes = ref([])
const loading = ref(true)
const createLoading = ref(false)
const showCreateModal = ref(false)

// 编辑隧道
const showEditModal = ref(false)
const editLoading = ref(false)
const editForm = ref({
  tunnelName: '',
  localIp: '',
  localPort: '',
  protocol: '',
  remotePort: '',
  originalData: null
})

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
      
      // 移除成功弹窗，直接关闭模态框
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
          
          // 移除成功弹窗，直接重新加载列表
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

// 打开编辑隧道模态框
const openEditTunnelModal = (tunnel) => {
  editForm.value = {
    tunnelName: tunnel.Tunnel_name,
    localIp: tunnel.Local_ip,
    localPort: tunnel.Local_port,
    protocol: tunnel.use_agreement,
    remotePort: tunnel.return_port,
    originalData: { ...tunnel }
  }
  showEditModal.value = true
}

// 更新隧道
const updateTunnel = async () => {
  editLoading.value = true
  try {
    const updates = []
    
    // 检查哪些字段被修改了
    if (editForm.value.localIp !== editForm.value.originalData.Local_ip) {
      updates.push({ mode: 'localip', value: editForm.value.localIp })
    }
    if (editForm.value.localPort !== editForm.value.originalData.Local_port) {
      updates.push({ mode: 'port', value: editForm.value.localPort.toString() })
    }
    if (editForm.value.protocol !== editForm.value.originalData.use_agreement) {
      updates.push({ mode: 'agreement', value: editForm.value.protocol })
    }
    if (editForm.value.remotePort !== editForm.value.originalData.return_port) {
      updates.push({ mode: 'return_port', value: editForm.value.remotePort.toString() })
    }
    
    if (updates.length === 0) {
      showError('没有修改任何内容')
      editLoading.value = false
      return
    }
    
    // 依次执行所有更新
    for (const update of updates) {
      const response = await tunnelAPI.modifyTunnel(
        userStore.tempKey,
        editForm.value.tunnelName,
        update.mode,
        update.value
      )
      
      if (response.code !== 0) {
        showError(response.msg || `修改${update.mode}失败`)
        editLoading.value = false
        return
      }
    }
    
    showSuccess('隧道修改成功')
    showEditModal.value = false
    // 重新加载隧道列表
    await loadTunnels()
  } catch (error) {
    console.error('修改隧道失败:', error)
    showError('隧道修改失败，请稍后重试')
  } finally {
    editLoading.value = false
  }
}

// 获取配置 - 跳转到配置文件页面
const getConfig = (tunnelName) => {
  // 跳转到配置文件页面，并传递隧道名称参数
  router.push({
    name: 'ConfigFiles',
    query: { tunnel: tunnelName }
  })
}

// 获取节点名称（简约格式：海外/中国·地点）
const getNodeName = (nodeIp) => {
  const node = nodes.value.find(n => n.ip === nodeIp)
  if (!node) return '未知节点'
  
  // 判断是否为中国节点
  const isChinaNode = node.node_region && (
    node.node_region.includes('中国') || 
    node.node_region.includes('China') ||
    node.node_region.includes('CN') ||
    node.node_name.includes('中国') ||
    node.node_name.includes('国内')
  )
  
  // 提取地点信息（从node_name或node_region中提取）
  let location = node.node_region || node.node_name
  // 移除常见的前缀词
  location = location.replace(/中国|海外|国内|国际|节点|Node|Server/gi, '').trim()
  
  // 返回简约格式
  return isChinaNode ? `中国·${location}` : `海外·${location}`
}

// 查看隧道详情
const showTunnelDetail = async (tunnel) => {
  // 格式化创建时间
  const createTime = tunnel.creation_time || '未知'
  // 格式化最近使用时间
  const recentUseTime = tunnel.Recent_use_time || '未知'
  // 格式化隧道状态
  const isOnline = tunnel.tunnel_state === 'online' || tunnel.tunnel_state === 'true' || tunnel.tunnel_state === true
  const statusText = isOnline ? '在线' : '离线'
  const statusColor = isOnline ? 'bg-green-500' : 'bg-red-500'
  // 格式化流量
  const formatTraffic = (traffic) => {
    if (!traffic || traffic === 0) return '0 MB'
    const mb = traffic
    if (mb < 1024) {
      return `${mb} MB`
    } else {
      return `${(mb / 1024).toFixed(2)} GB`
    }
  }
  
  // 查找节点名称
  const node = nodes.value.find(n => n.ip === tunnel.node_ip)
  const nodeName = node ? `${node.node_name} (${node.node_region})` : '未知节点'
  
  // 查询隧道流量（今日和最近7天）
  let todayTraffic = { in_mb: 0, out_mb: 0, total_mb: 0 }
  let weekTraffic = []
  try {
    // 查询今日流量
    const todayResponse = await tunnelAPI.queryTraffic(userStore.tempKey, {
      tunnel_name: tunnel.Tunnel_name,
      date_range: 'today'
    })
    console.log('隧道今日流量响应:', todayResponse)
    if (todayResponse.code === 0 && todayResponse.data) {
      const summary = todayResponse.data.traffic_summary || {}
      todayTraffic = {
        in_mb: summary.total_traffic_in_mb || 0,
        out_mb: summary.total_traffic_out_mb || 0,
        total_mb: summary.total_traffic_mb || 0
      }
    }
    
    // 查询最近7天流量
    const weekResponse = await tunnelAPI.queryTraffic(userStore.tempKey, {
      tunnel_name: tunnel.Tunnel_name,
      date_range: '7days'
    })
    console.log('隧道最近7天流量响应:', weekResponse)
    if (weekResponse.code === 0 && weekResponse.data) {
      const dailyStats = weekResponse.data.daily_statistics || []
      weekTraffic = dailyStats.map(day => ({
        date: day.date,
        in_mb: day.total_in_mb || 0,
        out_mb: day.total_out_mb || 0,
        total_mb: day.total_traffic_mb || 0
      }))
    }
  } catch (error) {
    console.error('查询隧道流量失败:', error)
  }
  
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
  modal.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
      <!-- 标题栏 -->
      <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <h3 class="text-xl font-bold text-gray-900">隧道详情</h3>
        <span class="px-3 py-1 text-xs rounded-full ${statusColor} text-white">
          ${statusText}
        </span>
      </div>
      
      <!-- 内容区 -->
      <div class="p-6">
        <div class="space-y-4">
          <!-- 基本信息 -->
          <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              基本信息
            </h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">隧道名称:</span>
                <p class="font-mono text-gray-900 mt-1">${tunnel.Tunnel_name}</p>
              </div>
              <div>
                <span class="text-gray-500">协议类型:</span>
                <p class="font-mono text-gray-900 mt-1 uppercase">${tunnel.use_agreement}</p>
              </div>
              <div>
                <span class="text-gray-500">创建时间:</span>
                <p class="text-gray-900 mt-1">${createTime}</p>
              </div>
              <div>
                <span class="text-gray-500">最近使用:</span>
                <p class="text-gray-900 mt-1">${recentUseTime}</p>
              </div>
              <div>
                <span class="text-gray-500">隧道状态:</span>
                <p class="text-gray-900 mt-1">${isOnline ? '在线运行' : '离线'}</p>
              </div>
              <div>
                <span class="text-gray-500">速度限制:</span>
                <p class="text-gray-900 mt-1">${tunnel.node_speed >= 1024 ? '不限速' : tunnel.node_speed + ' Mbps'}</p>
              </div>
            </div>
          </div>
          
          <!-- 连接信息 -->
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="text-sm font-semibold text-blue-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              连接信息
            </h4>
            <div class="space-y-3 text-sm">
              <div>
                <span class="text-blue-700">本地地址:</span>
                <p class="font-mono text-blue-900 mt-1 bg-white px-3 py-2 rounded-lg">${tunnel.Local_ip}:${tunnel.Local_port}</p>
              </div>
              <div>
                <span class="text-blue-700">连接地址:</span>
                <p class="font-mono text-blue-900 mt-1 bg-white px-3 py-2 rounded-lg">${tunnel.node_ip}:${tunnel.return_port}</p>
              </div>
              ${tunnel.domain_name ? `
              <div>
                <span class="text-blue-700">域名地址:</span>
                <p class="font-mono text-blue-900 mt-1 bg-white px-3 py-2 rounded-lg">${tunnel.domain_name}</p>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- 节点信息 -->
          <div class="bg-purple-50 rounded-xl p-4 border border-purple-200">
            <h4 class="text-sm font-semibold text-purple-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
              节点信息
            </h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="col-span-2">
                <span class="text-purple-700">节点名称:</span>
                <p class="text-purple-900 mt-1">${nodeName}</p>
              </div>
              <div>
                <span class="text-purple-700">节点IP:</span>
                <p class="font-mono text-purple-900 mt-1">${tunnel.node_ip}</p>
              </div>
              <div>
                <span class="text-purple-700">远程端口:</span>
                <p class="font-mono text-purple-900 mt-1">${tunnel.return_port}</p>
              </div>
              ${tunnel.port_range ? `
              <div class="col-span-2">
                <span class="text-purple-700">端口范围:</span>
                <p class="font-mono text-purple-900 mt-1">${tunnel.port_range}</p>
              </div>
              ` : ''}
            </div>
          </div>
          
          <!-- 今日流量信息 -->
          <div class="bg-green-50 rounded-xl p-4 border border-green-200">
            <h4 class="text-sm font-semibold text-green-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              今日流量
            </h4>
            <div class="grid grid-cols-3 gap-3 text-sm">
              <div>
                <span class="text-green-700">上传:</span>
                <p class="text-green-900 mt-1 font-semibold">${formatTraffic(todayTraffic.in_mb)}</p>
              </div>
              <div>
                <span class="text-green-700">下载:</span>
                <p class="text-green-900 mt-1 font-semibold">${formatTraffic(todayTraffic.out_mb)}</p>
              </div>
              <div>
                <span class="text-green-700">总计:</span>
                <p class="text-green-900 mt-1 font-semibold">${formatTraffic(todayTraffic.total_mb)}</p>
              </div>
            </div>
          </div>
          
          <!-- 最近7天流量趋势 -->
          ${weekTraffic.length > 0 ? `
          <div class="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <h4 class="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
              </svg>
              最近7天流量
            </h4>
            <div class="space-y-2 text-xs">
              ${weekTraffic.map(day => `
                <div class="flex justify-between items-center">
                  <span class="text-indigo-700">${day.date}</span>
                  <div class="flex space-x-3">
                    <span class="text-indigo-600">↑${formatTraffic(day.in_mb)}</span>
                    <span class="text-indigo-600">↓${formatTraffic(day.out_mb)}</span>
                    <span class="text-indigo-900 font-semibold">${formatTraffic(day.total_mb)}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
        </div>
      </div>
      
      <!-- 按钮区 -->
      <div class="px-6 pb-6">
        <button data-action="close" 
                class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
          关闭
        </button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  
  // 关闭按钮
  modal.querySelector('[data-action="close"]').addEventListener('click', () => {
    modal.remove()
  })
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })
  
  // ESC键关闭
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      modal.remove()
      document.removeEventListener('keydown', handleEsc)
    }
  }
  document.addEventListener('keydown', handleEsc)
}

onMounted(() => {
  loadTunnels()
  loadNodes()
})
</script>