<template>
  <DashboardLayout>
    <div>
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
        <p class="text-gray-600 text-base mb-3">剩余流量</p>
        <div class="flex items-center justify-between">
          <p class="text-3xl text-gray-900">{{ formatTraffic(userStore.userInfo.users_traffic) }}</p>
          <div class="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
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
            系统公告
          </h3>
          <div v-if="notificationHtml" class="max-h-[400px] overflow-y-auto">
            <div v-html="notificationHtml" class="prose prose-sm max-w-none"></div>
          </div>
          <div v-else class="text-sm text-gray-500 text-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7367f0] mx-auto mb-2"></div>
            加载中...
          </div>
        </div>
      </div>

        <!-- 右侧：交流群、介绍和时间信息 -->
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
              <button @click="joinQQGroup" class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-4 py-2 rounded-lg text-sm transition-colors">
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

        <!-- 时间信息 -->
        <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h2 class="text-lg font-bold text-black mb-4 flex items-center">
            <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            时间信息
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-sm text-gray-600">注册时间</span>
              <span class="text-sm text-gray-900">{{ userStore.userInfo.register_time || '未知' }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-sm text-gray-600">最近登录</span>
              <span class="text-sm text-gray-900">{{ userStore.userInfo.recent_login || '暂无记录' }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-sm text-gray-600">会员到期</span>
              <span class="text-sm text-gray-900">{{ userStore.userInfo.end_time || '未开通' }}</span>
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

// 通知数据（从API获取）
const notifications = ref([])
const notificationHtml = ref('')

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

// 显示通知详情（已移除，改为直接显示HTML公告）

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

// 加载系统公告
const loadNotifications = async () => {
  try {
    // 开发环境使用代理，生产环境直接请求
    const url = import.meta.env.DEV 
      ? '/notice/Notice.php?json=1'
      : 'https://msk.cnwbhw.com/service/Notice/Notice.php?json=1'
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data && data.html_announcement) {
      notificationHtml.value = data.html_announcement
    }
  } catch (error) {
    console.error('加载公告失败:', error)
    notificationHtml.value = '<p class="text-sm text-gray-500 text-center py-4">加载公告失败</p>'
  }
}

// 加入QQ群
const joinQQGroup = () => {
  window.open('https://qun.qq.com/universal-share/share?ac=1&authKey=py0eEw6f35ao84w8aKMd0amlB46O7DNt8%2BUEg%2Fzbl1i%2FYp7CrG9jgDbpgCAnzmmk&busi_data=eyJncm91cENvZGUiOiI1NzI2NTg4MTUiLCJ0b2tlbiI6ImJsVFlEMFpLMUdRM2JMUnl4NXloamxPYmRGVENYeTIrc1dqWUJxTFFKWjJjUGJ3VzZ0d01YeDNzYlBxVWhJZmwiLCJ1aW4iOiIxMzM3MjEyMzMxIn0%3D&data=e8-IKxOIHbmTkm5FlIk0bTBaGetMO0rbz7rftAdAPLAbhQOOg7m7Y5Ao6tYMnuaMQj6Zedi7beHi_BQPQ-bhgQ&svctype=4&tempid=h5_group_info', '_blank')
}

onMounted(() => {
  // 并行加载所有数据
  Promise.all([
    loadTunnelStats(),
    loadNotifications()
  ])
  loadTodayStats()
  
  // 定时刷新统计数据（每30秒）
  setInterval(() => {
    loadTunnelStats()
  }, 30000)
})
</script>
