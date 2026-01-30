<template>
  <DashboardLayout>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl text-black">总览</h1>
      <p class="text-gray-600 mt-1">查看您的隧道统计和系统通知</p>
    </div>

    <!-- 统计卡片 - 简约淡紫色背景 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-[#e8e6f5] rounded-xl p-6 hover:shadow-md transition-all">
        <p class="text-gray-600 text-base mb-3">隧道数量</p>
        <div class="flex items-center justify-between">
          <div class="relative group">
            <p class="text-3xl text-gray-900 cursor-help">{{ tunnelStats.onlineCount }}/{{ tunnelStats.count }}</p>
            <!-- Tooltip -->
            <div class="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              在线隧道 / 总隧道
              <div class="absolute top-full left-4 -mt-1">
                <div class="border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
          <div class="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-[#e8e6f5] rounded-xl p-6 hover:shadow-md transition-all">
        <p class="text-gray-600 text-base mb-3">今日上传</p>
        <div class="flex items-center justify-between">
          <p class="text-3xl text-gray-900">{{ formatTraffic(todayStats.upload) }}</p>
          <div class="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-[#e8e6f5] rounded-xl p-6 hover:shadow-md transition-all">
        <p class="text-gray-600 text-base mb-3">今日下载</p>
        <div class="flex items-center justify-between">
          <p class="text-3xl text-gray-900">{{ formatTraffic(todayStats.download) }}</p>
          <div class="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-[#e8e6f5] rounded-xl p-6 hover:shadow-md transition-all">
        <p class="text-gray-600 text-base mb-3">实时速度</p>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-lg text-gray-900">↑ {{ tunnelStats.uploadSpeed }}</p>
            <p class="text-lg text-gray-900">↓ {{ tunnelStats.downloadSpeed }}</p>
          </div>
          <div class="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 下方内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- 左侧：系统通知 -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl border border-gray-200 p-6 h-full">
          <h3 class="text-lg text-black mb-4 flex items-center">
            <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
            系统通知
          </h3>
          <div v-if="notifications.length > 0" class="space-y-3 max-h-[400px] overflow-y-auto">
            <div v-for="(notification, index) in notifications" :key="index" 
                 @click="showNotificationDetail(notification)"
                 class="pb-3 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <p class="text-sm text-black mb-1">{{ notification.title }}</p>
              <p class="text-xs text-gray-600 mb-1 line-clamp-2">{{ notification.content }}</p>
              <span class="text-xs text-gray-400">{{ notification.time }}</span>
            </div>
          </div>
          <div v-else class="text-sm text-gray-500 text-center py-8">
            暂无新通知
          </div>
        </div>
      </div>

      <!-- 右侧：交流群和介绍 -->
      <div class="lg:col-span-3 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="text-lg text-black mb-4">交流群</h3>
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div class="w-12 h-12 bg-[#7367f0] rounded-xl flex items-center justify-center">
                <span class="text-white text-sm">QQ</span>
              </div>
              <div class="flex-1">
                <p class="text-black">官方QQ群</p>
                <p class="text-sm text-gray-600">572658815</p>
              </div>
              <button class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                加入
              </button>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <h3 class="text-lg text-black mb-4">关于SkyFRP</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              SkyFRP是一个专业的内网穿透服务，为用户提供稳定、高速的网络连接。
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div class="text-2xl text-black">99.9%</div>
                <div class="text-sm text-gray-600">服务可用性</div>
              </div>
              <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div class="text-2xl text-black">24/7</div>
                <div class="text-sm text-gray-600">技术支持</div>
              </div>
            </div>
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

// 通知数据（模拟数据，后续从后端获取）
const notifications = ref([
  {
    title: '欢迎使用SkyFRP',
    content: '感谢您选择SkyFRP内网穿透服务，如有问题请联系客服。我们提供7x24小时技术支持，确保您的服务稳定运行。',
    time: '2小时前'
  },
  {
    title: '系统维护通知',
    content: '系统将于本周六凌晨2:00-4:00进行例行维护，请提前做好准备。维护期间部分功能可能暂时无法使用，给您带来不便敬请谅解。',
    time: '1天前'
  },
  {
    title: '新功能上线',
    content: '我们新增了流量统计功能，您可以实时查看隧道的上传下载速度。同时优化了节点选择界面，让您更方便地选择合适的节点。',
    time: '3天前'
  }
])

// 隧道统计数据
const tunnelStats = ref({
  count: 0,
  uploadSpeed: '0 KB/s',
  downloadSpeed: '0 KB/s',
  onlineCount: 0
})

// 今日流量统计（模拟数据，后续从后端获取）
const todayStats = ref({
  upload: 0,
  download: 0
})

// 显示通知详情
const showNotificationDetail = (notification) => {
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
  modal.innerHTML = `
    <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- 标题栏 -->
      <div class="bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] px-6 py-4 flex items-center justify-between">
        <h3 class="text-xl font-bold text-white">${notification.title}</h3>
        <span class="text-white/80 text-sm">${notification.time}</span>
      </div>
      
      <!-- 内容区 -->
      <div class="p-6">
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">${notification.content}</p>
      </div>
      
      <!-- 按钮区 -->
      <div class="px-6 pb-6">
        <button data-action="close" 
                class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
          我知道了
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

// 格式化流量显示
const formatTraffic = (traffic) => {
  if (!traffic) return '0 MB'
  
  const mb = traffic
  if (mb < 1024) {
    return `${mb} MB`
  } else {
    return `${(mb / 1024).toFixed(2)} GB`
  }
}

// 加载隧道统计
const loadTunnelStats = async () => {
  try {
    const response = await tunnelAPI.getTunnelList(userStore.tempKey)
    if (response.code === 0 && response.data.tunnels) {
      const tunnels = response.data.tunnels
      tunnelStats.value.count = tunnels.length
      
      // 统计在线隧道数量
      tunnelStats.value.onlineCount = tunnels.filter(t => t.tunnel_state === 'online').length
      
      // 模拟速度数据（后续从后端获取实时数据）
      tunnelStats.value.uploadSpeed = '0 KB/s'
      tunnelStats.value.downloadSpeed = '0 KB/s'
    }
  } catch (error) {
    console.error('加载隧道统计失败:', error)
  }
}

// 加载今日流量统计（模拟数据，后续从后端获取）
const loadTodayStats = () => {
  // 这里暂时使用模拟数据
  // 后续需要后端提供今日流量统计API
  todayStats.value = {
    upload: 0,
    download: 0
  }
}

onMounted(() => {
  // 加载数据
  loadTunnelStats()
  loadTodayStats()
  
  // 定时刷新统计数据（每30秒）
  setInterval(() => {
    loadTunnelStats()
  }, 30000)
})
</script>
