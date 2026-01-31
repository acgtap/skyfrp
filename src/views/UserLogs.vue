<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <DashboardLayout>
      <div class="space-y-6">
        <!-- 页面标题 -->
        <div>
          <h1 class="text-2xl font-bold text-black">用户日志</h1>
        </div>

        <!-- 提示信息 -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div class="flex-1">
            <p class="text-sm text-blue-800">
              不会记录您的任何密钥信息，此处记录的是您的操作行为。日志数据保存在本地浏览器中。
            </p>
          </div>
        </div>

        <!-- 筛选和搜索 -->
        <div class="bg-white rounded-lg border border-gray-200 p-4">
          <div class="flex flex-wrap items-center gap-3">
            <input v-model="searchKeyword" 
                   type="text" 
                   placeholder="请输入搜索内容"
                   class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:border-transparent text-sm">
            
            <select v-model="selectedLogType" 
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:border-transparent text-sm">
              <option value="">全部</option>
              <option value="login">登录</option>
              <option value="tunnel">隧道操作</option>
              <option value="payment">充值</option>
              <option value="purchase">购买</option>
              <option value="signin">签到</option>
            </select>
            
            <input v-model="startDate" 
                   type="date" 
                   :max="today"
                   class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:border-transparent text-sm">
            
            <input v-model="endDate" 
                   type="date" 
                   :max="today"
                   class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:border-transparent text-sm">
            
            <button @click="applyFilters" 
                    class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              查询
            </button>
            
            <button @click="resetFilters" 
                    class="bg-white hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium border border-gray-300 transition-colors">
              重置
            </button>
            
            <button @click="deleteAllLogs" 
                    class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors ml-auto">
              删除所有日志
            </button>
          </div>
        </div>

        <!-- 日志表格 -->
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7367f0]"></div>
          </div>
          
          <div v-else-if="paginatedLogs.length === 0" class="text-center py-12">
            <p class="text-gray-500">暂无日志记录</p>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">操作类型</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">操作名称</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">IP地址</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User Agent</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">状态</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">时间</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="getTypeClass(log.type)">
                      {{ getTypeName(log.type) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.action }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ log.ip }}</td>
                  <td class="px-6 py-4 text-sm text-gray-600 max-w-xs truncate" :title="log.userAgent">{{ log.userAgent }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          :class="getStatusClass(log.status)">
                      {{ getStatusText(log.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ formatDateTime(log.timestamp) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button @click="deleteLog(log.id)" 
                            class="text-red-600 hover:text-red-800 font-medium transition-colors">
                      删除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div v-if="filteredLogs.length > 0" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-600">
              共 {{ totalRecords }} 条记录
            </div>
            <div class="flex items-center space-x-2">
              <button @click="currentPage = 1" 
                      :disabled="currentPage === 1"
                      class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                1
              </button>
              <button @click="currentPage--" 
                      :disabled="currentPage === 1"
                      class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                ...
              </button>
              <span class="px-3 py-1 text-sm">{{ currentPage }} / {{ totalPages }}</span>
              <button @click="currentPage++" 
                      :disabled="currentPage >= totalPages"
                      class="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                ...
              </button>
              <span class="text-sm text-gray-600 ml-2">跳至</span>
              <input v-model.number="jumpPage" 
                     type="number" 
                     min="1" 
                     :max="totalPages"
                     @keyup.enter="goToPage"
                     class="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center">
              <span class="text-sm text-gray-600">页</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '../components/DashboardLayout.vue'

// 状态管理
const loading = ref(false)
const logs = ref([])
const searchKeyword = ref('')
const selectedLogType = ref('')
const startDate = ref('')
const endDate = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const jumpPage = ref(1)

// 获取今天的日期（YYYY-MM-DD格式）
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

// 过滤日志
const filteredLogs = computed(() => {
  let filtered = logs.value

  // 搜索关键词
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(log => 
      log.action.toLowerCase().includes(keyword) ||
      log.ip.toLowerCase().includes(keyword) ||
      log.userAgent.toLowerCase().includes(keyword)
    )
  }
  
  // 按类型筛选
  if (selectedLogType.value) {
    filtered = filtered.filter(log => log.type === selectedLogType.value)
  }
  
  // 按日期范围筛选
  if (startDate.value) {
    const start = new Date(startDate.value)
    start.setHours(0, 0, 0, 0)
    filtered = filtered.filter(log => new Date(log.timestamp) >= start)
  }
  
  if (endDate.value) {
    const end = new Date(endDate.value)
    end.setHours(23, 59, 59, 999)
    filtered = filtered.filter(log => new Date(log.timestamp) <= end)
  }
  
  return filtered
})

// 分页后的日志
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredLogs.value.slice(start, end)
})

// 总记录数
const totalRecords = computed(() => filteredLogs.value.length)

// 总页数
const totalPages = computed(() => Math.ceil(filteredLogs.value.length / pageSize.value))

// 获取类型样式
const getTypeClass = (type) => {
  const classes = {
    login: 'bg-blue-100 text-blue-800',
    tunnel: 'bg-purple-100 text-purple-800',
    payment: 'bg-yellow-100 text-yellow-800',
    purchase: 'bg-pink-100 text-pink-800',
    signin: 'bg-green-100 text-green-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

// 获取类型名称
const getTypeName = (type) => {
  const names = {
    login: '登录',
    tunnel: '隧道',
    payment: '充值',
    purchase: '购买',
    signin: '签到'
  }
  return names[type] || '其他'
}

// 获取状态样式
const getStatusClass = (status) => {
  const classes = {
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// 获取状态文本
const getStatusText = (status) => {
  const texts = {
    success: '成功',
    failed: '失败',
    pending: '进行中'
  }
  return texts[status] || '未知'
}

// 格式化日期时间
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-')
}

// 跳转到指定页
const goToPage = () => {
  if (jumpPage.value >= 1 && jumpPage.value <= totalPages.value) {
    currentPage.value = jumpPage.value
  }
}

// 应用筛选
const applyFilters = () => {
  currentPage.value = 1
  loadLogs()
}

// 重置筛选
const resetFilters = () => {
  searchKeyword.value = ''
  selectedLogType.value = ''
  startDate.value = today.value
  endDate.value = today.value
  currentPage.value = 1
  loadLogs()
}

// 加载日志
const loadLogs = () => {
  loading.value = true
  
  try {
    // 从localStorage读取日志
    const storedLogs = localStorage.getItem('userLogs')
    if (storedLogs) {
      logs.value = JSON.parse(storedLogs)
      // 按时间倒序排列
      logs.value.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    } else {
      logs.value = []
    }
  } catch (error) {
    console.error('加载日志失败:', error)
    logs.value = []
  } finally {
    loading.value = false
  }
}

// 删除日志
const deleteLog = (logId) => {
  // 创建确认弹窗
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
  modal.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- 内容区 -->
      <div class="p-6">
        <!-- 图标 -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
        </div>
        
        <!-- 标题 -->
        <h3 class="text-xl font-bold text-gray-900 text-center mb-3">确认删除</h3>
        
        <!-- 消息 -->
        <p class="text-gray-600 text-center leading-relaxed mb-6">确定要删除这条日志记录吗？此操作无法撤销。</p>
      </div>
      
      <!-- 按钮区 -->
      <div class="px-6 pb-6 flex space-x-3">
        <button data-action="cancel" 
                class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-gray-200 transition-all duration-200">
          取消
        </button>
        <button data-action="confirm" 
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-500/30">
          确定删除
        </button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  
  // 确认按钮
  modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    modal.remove()
    
    try {
      // 从localStorage读取日志
      const storedLogs = localStorage.getItem('userLogs')
      if (storedLogs) {
        let allLogs = JSON.parse(storedLogs)
        // 删除指定ID的日志
        allLogs = allLogs.filter(log => log.id !== logId)
        // 保存回localStorage
        localStorage.setItem('userLogs', JSON.stringify(allLogs))
        // 重新加载日志
        loadLogs()
      }
    } catch (error) {
      console.error('删除日志失败:', error)
    }
  })
  
  // 取消按钮
  modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
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

// 删除所有日志
const deleteAllLogs = () => {
  // 创建确认弹窗
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
  modal.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- 内容区 -->
      <div class="p-6">
        <!-- 图标 -->
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </div>
        </div>
        
        <!-- 标题 -->
        <h3 class="text-xl font-bold text-gray-900 text-center mb-3">确认删除所有日志</h3>
        
        <!-- 消息 -->
        <p class="text-gray-600 text-center leading-relaxed mb-6">确定要删除所有日志记录吗？此操作将清空所有历史记录且无法撤销。</p>
      </div>
      
      <!-- 按钮区 -->
      <div class="px-6 pb-6 flex space-x-3">
        <button data-action="cancel" 
                class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-gray-200 transition-all duration-200">
          取消
        </button>
        <button data-action="confirm" 
                class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-red-500/30">
          确定删除
        </button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  
  // 确认按钮
  modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    modal.remove()
    
    try {
      // 清空localStorage中的日志
      localStorage.removeItem('userLogs')
      // 重新加载日志
      loadLogs()
      
      // 显示成功提示
      const successModal = document.createElement('div')
      successModal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
      successModal.innerHTML = `
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
          <div class="p-6">
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 text-center mb-3">删除成功</h3>
            <p class="text-gray-600 text-center leading-relaxed mb-6">所有日志记录已清空</p>
          </div>
          <div class="px-6 pb-6">
            <button data-action="close" 
                    class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg">
              确定
            </button>
          </div>
        </div>
      `
      document.body.appendChild(successModal)
      
      successModal.querySelector('[data-action="close"]').addEventListener('click', () => {
        successModal.remove()
      })
      
      successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
          successModal.remove()
        }
      })
      
      setTimeout(() => {
        successModal.remove()
      }, 2000)
    } catch (error) {
      console.error('删除所有日志失败:', error)
    }
  })
  
  // 取消按钮
  modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
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

// 初始化
onMounted(() => {
  // 设置默认日期为今天
  startDate.value = today.value
  endDate.value = today.value
  loadLogs()
})
</script>
