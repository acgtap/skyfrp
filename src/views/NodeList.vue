<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- 页面标题 -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">节点列表</h1>
        <p class="text-gray-600 mt-1">查看可用的服务器节点</p>
      </div>

      <!-- 重要提示 -->
      <div v-if="notice && notice.length > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-medium text-blue-900 mb-2">重要提示</h3>
            <ul class="text-blue-700 text-sm space-y-1">
              <li v-for="item in notice" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 节点列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="node in nodes" :key="node.ip" 
             class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold" 
                  :class="node.user_group !== 'default' ? 'text-amber-500' : 'text-gray-900'">
                {{ node.node_name }}
              </h3>
              <div class="flex items-center gap-2 mt-1 flex-wrap">
                <p class="text-sm text-gray-600">{{ node.node_region }}</p>
                <!-- 节点描述作为标签 -->
                <span v-if="node.node_describe" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ node.node_describe }}
                </span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <!-- 国家标识 -->
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {{ node.country_id?.toUpperCase() || 'CN' }}
              </span>
              <!-- 在线状态 -->
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="node.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                <span class="w-1.5 h-1.5 rounded-full mr-1"
                      :class="node.online ? 'bg-green-400' : 'bg-red-400'"></span>
                {{ node.online ? '在线' : '离线' }}
              </span>
            </div>
          </div>
          
          <div class="space-y-3">
            
            <!-- 节点信息和负载 - 左右布局 -->
            <div class="flex gap-4 items-center">
              <!-- 左侧：负载圆圈 -->
              <div class="flex-shrink-0">
                <div class="relative w-24 h-24">
                  <!-- 背景圆 -->
                  <svg class="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="none" class="text-gray-200"></circle>
                    <!-- 进度圆 -->
                    <circle cx="48" cy="48" r="40" 
                            :stroke="getLoadPercentage(node) >= 80 ? '#ef4444' : getLoadPercentage(node) >= 50 ? '#eab308' : '#22c55e'" 
                            stroke-width="6" 
                            fill="none"
                            stroke-linecap="round"
                            :stroke-dasharray="251.2"
                            :stroke-dashoffset="251.2 - (251.2 * getLoadPercentage(node) / 100)"
                            class="transition-all duration-500"></circle>
                  </svg>
                  <!-- 中心文字 -->
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-xl font-bold" :class="getLoadColor(node)">{{ getLoadPercentage(node) }}%</span>
                    <span class="text-[10px] text-gray-500 mt-0.5">负载</span>
                  </div>
                </div>
              </div>
              
              <!-- 右侧：节点信息 -->
              <div class="flex-1 space-y-2 text-sm">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">IP地址:</span>
                  <span class="font-mono text-gray-900">{{ node.ip }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">端口:</span>
                  <span class="font-mono text-gray-900">{{ node.port }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">域名:</span>
                  <span class="font-mono text-gray-900">{{ node.node_domain || '无' }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">端口范围:</span>
                  <span class="font-mono text-gray-900">{{ node.port_range }}</span>
                </div>
              </div>
            </div>
            
            <!-- 节点特性 -->
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#7367f0]/10 text-[#7367f0]">
                {{ node.node_line }}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ node.node_speed >= 1024 ? '不限速' : node.node_speed + 'Mbps' }}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {{ node.tunnel_type }}
              </span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {{ node.use_people }}人在线
              </span>
            </div>
            
            <!-- 用户组限制 -->
            <div v-if="node.user_group !== 'default'" class="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span class="text-xs font-medium text-yellow-700">仅限 <span class="font-bold">{{ node.user_group }}</span> 用户组使用</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="nodes.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">暂无可用节点</h3>
          <p class="text-gray-600">请稍后再试或联系管理员</p>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user'
import { nodeAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'

// 数据
const nodes = ref([])
const notice = ref([])
const loading = ref(true)

// 加载节点列表
const loadNodes = async () => {
  try {
    const response = await nodeAPI.getNodeList(userStore.usersId)
    if (response.code === 0) {
      nodes.value = response.data.nodes || []
      notice.value = response.data.notice || []
    } else {
      console.error('加载节点列表失败:', response.msg)
    }
  } catch (error) {
    console.error('加载节点列表失败:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadNodes()
})

// 计算负载百分比（基于在线人数和节点速度）
const getLoadPercentage = (node) => {
  // 如果有直接的带宽数据，使用带宽数据
  if (node.node_bandwidth && node.used_bandwidth !== undefined) {
    return Math.round((node.used_bandwidth / node.node_bandwidth) * 100)
  }
  
  // 否则根据在线人数估算
  // 假设每个隧道占用5M带宽
  const bandwidthPerTunnel = 5
  const usedBandwidth = (node.use_people || 0) * bandwidthPerTunnel
  
  // 节点速度（Mbps）
  let totalBandwidth = node.node_speed || 100
  
  // 如果是不限速节点（>= 1024），假设总带宽为200M
  if (totalBandwidth >= 1024) {
    totalBandwidth = 200
  }
  
  const percentage = Math.round((usedBandwidth / totalBandwidth) * 100)
  return Math.min(percentage, 100) // 最大100%
}

// 获取负载颜色
const getLoadColor = (node) => {
  const percentage = getLoadPercentage(node)
  if (percentage >= 80) return 'text-red-600'
  if (percentage >= 50) return 'text-yellow-600'
  return 'text-green-600'
}
</script>