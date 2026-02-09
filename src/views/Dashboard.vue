<template>
  <div>
      <div class="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl text-black">总览</h1>
          <p class="text-gray-600 mt-1">查看您的隧道统计和系统通知</p>
        </div>
        <div v-if="hitokoto" class="hidden md:block text-sm text-gray-500 italic opacity-80 transition-opacity duration-500 text-right max-w-md bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          {{ hitokoto }}
        </div>
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
        <!-- 左侧：流量趋势图 -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 class="text-lg text-black mb-4 flex items-center">
              <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              最近7天流量趋势
            </h3>
            <div class="space-y-4">
              <!-- 曲线图 -->
              <div class="relative h-48 bg-gray-50 rounded-xl p-4">
                <svg class="w-full h-full" viewBox="0 0 700 160" preserveAspectRatio="none">
                  <!-- 网格线 -->
                  <line v-for="i in 5" :key="'grid-' + i" 
                        :x1="0" :y1="i * 32" :x2="700" :y2="i * 32" 
                        stroke="#e5e7eb" stroke-width="1" />
                  
                  <!-- 上传曲线（蓝色） -->
                  <polyline 
                    :points="getChartPoints(filteredWeekTrafficData, 'in_mb')"
                    fill="none" 
                    stroke="#3b82f6" 
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  
                  <!-- 上传区域填充 -->
                  <polygon 
                    :points="getChartArea(filteredWeekTrafficData, 'in_mb')"
                    fill="url(#blueGradient)" 
                    opacity="0.2" />
                  
                  <!-- 下载曲线（绿色） -->
                  <polyline 
                    :points="getChartPoints(filteredWeekTrafficData, 'out_mb')"
                    fill="none" 
                    stroke="#10b981" 
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  
                  <!-- 下载区域填充 -->
                  <polygon 
                    :points="getChartArea(filteredWeekTrafficData, 'out_mb')"
                    fill="url(#greenGradient)" 
                    opacity="0.2" />
                  
                  <!-- 数据点 -->
                  <g v-for="(day, index) in filteredWeekTrafficData" :key="'point-' + index">
                    <circle 
                      :cx="getXPosition(index, filteredWeekTrafficData.length)" 
                      :cy="getYPosition(day.in_mb)"
                      r="4" 
                      fill="#3b82f6" 
                      class="cursor-pointer hover:r-6 transition-all" />
                    <circle 
                      :cx="getXPosition(index, filteredWeekTrafficData.length)" 
                      :cy="getYPosition(day.out_mb)"
                      r="4" 
                      fill="#10b981" 
                      class="cursor-pointer hover:r-6 transition-all" />
                  </g>
                  
                  <!-- 渐变定义 -->
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
                    </linearGradient>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <!-- X轴标签（日期） -->
                <div class="flex justify-between mt-2 px-4">
                  <div v-for="(day, index) in filteredWeekTrafficData" :key="'label-' + index" 
                       class="text-xs text-gray-500 text-center" 
                       :style="{ width: (100 / Math.max(filteredWeekTrafficData.length, 1)) + '%' }">
                    {{ formatDate(day.date) }}
                  </div>
                </div>
              </div>
              
              <!-- 数据列表 -->
              <div class="space-y-2">
                <div v-for="(day, index) in filteredWeekTrafficData" :key="'data-' + index" 
                     class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div class="flex items-center space-x-3">
                    <span class="text-sm text-gray-600 w-16">{{ formatDate(day.date) }}</span>
                    <div class="flex items-center space-x-2">
                      <span class="text-xs text-blue-600">↑{{ formatTraffic(day.in_mb) }}</span>
                      <span class="text-xs text-green-600">↓{{ formatTraffic(day.out_mb) }}</span>
                    </div>
                  </div>
                  <span class="text-sm text-gray-900 font-semibold">{{ formatTraffic(day.total_mb) }}</span>
                </div>
              </div>
              
              <!-- 图例 -->
              <div class="flex items-center justify-center space-x-6 pt-2 border-t border-gray-200">
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-blue-500 rounded"></div>
                  <span class="text-sm text-gray-600">上传</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-3 h-3 bg-green-500 rounded"></div>
                  <span class="text-sm text-gray-600">下载</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 交流群和介绍（合并卡片） -->
          <div class="bg-white rounded-xl border border-gray-200 p-6">
            <div class="space-y-8">
              <!-- 交流群 -->
              <div>
                <h3 class="text-lg text-black mb-4 flex items-center">
                  <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  交流群
                </h3>
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#7367f0]/30 transition-colors">
                  <div class="w-12 h-12 bg-[#7367f0] rounded-xl flex items-center justify-center shadow-lg shadow-[#7367f0]/20">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.003 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18.333c-4.603 0-8.333-3.73-8.333-8.333S7.4 3.667 12.003 3.667c4.603 0 8.333 3.73 8.333 8.333s-3.73 8.333-8.333 8.333zm-1.667-5.833h3.334c.46 0 .833.373.833.833v.834c0 .46-.373.833-.833.833h-3.334c-.46 0-.833-.373-.833-.833v-.834c0-.46.373-.833.833-.833zm0-5h3.334c.46 0 .833.373.833.833v2.5c0 .46-.373.833-.833.833h-3.334c-.46 0-.833-.373-.833-.833v-2.5c0-.46.373-.833.833-.833z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-black font-medium">官方QQ群</p>
                    <p class="text-sm text-gray-500">572658815</p>
                  </div>
                  <button @click="joinQQGroup" class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white px-4 py-2 rounded-lg text-sm transition-colors shadow-md shadow-[#7367f0]/20">
                    加入
                  </button>
                </div>
              </div>

              <!-- 关于 -->
              <div class="border-t border-gray-100 pt-8">
                <h3 class="text-lg text-black mb-4 flex items-center">
                  <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  关于SkyFRP
                </h3>
                <p class="text-gray-600 leading-relaxed mb-6 text-sm">
                  SkyFRP是一个专业的内网穿透服务，为用户提供稳定、高速的网络连接。支持多种协议，轻松穿透内网。
                </p>
                <div class="grid grid-cols-2 gap-4">
                  <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div class="text-xl font-bold text-[#7367f0]">99.9%</div>
                    <div class="text-xs text-gray-500 mt-1">服务可用性</div>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <div class="text-xl font-bold text-[#7367f0]">24/7</div>
                    <div class="text-xs text-gray-500 mt-1">技术支持</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：系统通知和时间信息 -->
        <div class="lg:col-span-1 space-y-6">
          <div class="bg-white rounded-xl border border-gray-200 p-6">
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
          
          <!-- 时间信息 -->
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 class="text-lg font-bold text-black mb-4 flex items-center">
              <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              时间信息
            </h2>
            <div class="space-y-3">
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { userStore } from '../stores/user'
import { tunnelAPI } from '../api'

// 通知数据（从API获取）
const notificationHtml = ref('')

// 隧道统计数据
const tunnelStats = ref({
  count: 0,
  uploadSpeed: '0 KB/s',
  downloadSpeed: '0 KB/s',
  onlineCount: 0
})

// 今日流量统计
const todayStats = ref({
  upload: 0,
  download: 0
})

// 最近7天流量数据（用于图表）
const weekTrafficData = ref([])

// 过滤后的流量数据（去除流量为空的日期）
const filteredWeekTrafficData = computed(() => {
  return weekTrafficData.value.filter(day => day.total_mb > 0)
})

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

// 格式化日期显示
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

// 计算流量百分比（用于进度条显示）
const getTrafficPercentage = (traffic) => {
  if (!traffic || weekTrafficData.value.length === 0) return 0
  
  // 找出最大流量值
  const maxTraffic = Math.max(
    ...filteredWeekTrafficData.value.map(day => Math.max(day.in_mb, day.out_mb))
  )
  
  if (maxTraffic === 0) return 0
  
  // 计算百分比，最小显示5%以便看到小流量
  const percentage = (traffic / maxTraffic) * 100
  return Math.max(percentage, traffic > 0 ? 5 : 0)
}

// 获取Y轴位置（用于曲线图）
const getYPosition = (traffic) => {
  const data = filteredWeekTrafficData.value
  if (data.length === 0) return 140
  
  // 找出最大流量值
  const maxTraffic = Math.max(
    ...data.map(day => Math.max(day.in_mb, day.out_mb)),
    1 // 至少为1，避免除以0
  )
  
  // 将流量值映射到0-140的范围（留20px上下边距）
  const ratio = traffic / maxTraffic
  return 140 - (ratio * 120) // 从底部往上
}

// 获取X轴位置
const getXPosition = (index, length) => {
  const width = 700
  const step = width / Math.max(length, 1)
  return index * step + (step / 2)
}

// 生成曲线图的点坐标
const getChartPoints = (data, field) => {
  if (!data || data.length === 0) return ''
  
  return data.map((day, index) => {
    const x = getXPosition(index, data.length)
    const y = getYPosition(day[field])
    return `${x},${y}`
  }).join(' ')
}

// 生成曲线图的区域填充坐标
const getChartArea = (data, field) => {
  if (!data || data.length === 0) return ''
  
  const points = getChartPoints(data, field)
  const length = data.length
  
  // 添加底部的点以形成闭合区域
  const lastX = getXPosition(length - 1, length)
  const firstX = getXPosition(0, length)
  
  return `${points} ${lastX},160 ${firstX},160`
}

// 加载隧道统计
const loadTunnelStats = async () => {
  try {
    const response = await tunnelAPI.getTunnelList(userStore.tempKey, { hideLoading: true })
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

// 加载今日流量统计
const loadTodayStats = async () => {
  try {
    console.log('开始查询今日流量, tempKey:', userStore.tempKey)
    // 查询今日所有隧道的流量
    const response = await tunnelAPI.queryTraffic(userStore.tempKey, {
      date_range: 'today'
    }, {
      hideLoading: true
    })
    
    console.log('今日流量API响应:', response)
    console.log('今日流量data类型:', typeof response.data, '是否为数组:', Array.isArray(response.data))
    console.log('今日流量完整data:', JSON.stringify(response.data, null, 2))
    
    if (response.code === 0 && response.data) {
      // 使用traffic_summary中的汇总数据
      const summary = response.data.traffic_summary || {}
      
      todayStats.value = {
        upload: summary.total_traffic_in_mb || 0,
        download: summary.total_traffic_out_mb || 0
      }
      console.log('今日流量统计:', todayStats.value)
    } else {
      console.log('今日流量数据为空或格式不正确')
      todayStats.value = {
        upload: 0,
        download: 0
      }
    }
  } catch (error) {
    console.error('加载今日流量统计失败:', error)
    todayStats.value = {
      upload: 0,
      download: 0
    }
  }
}

// 加载最近7天流量数据
const loadWeekTraffic = async () => {
  try {
    console.log('开始查询最近7天流量, tempKey:', userStore.tempKey)
    // 查询最近7天所有隧道的流量
    const response = await tunnelAPI.queryTraffic(userStore.tempKey, {
      date_range: '7days'
    })
    
    console.log('最近7天流量API响应:', response)
    console.log('最近7天流量data类型:', typeof response.data, '是否为数组:', Array.isArray(response.data))
    console.log('最近7天流量完整data:', JSON.stringify(response.data, null, 2))
    
    if (response.code === 0 && response.data) {
      // 使用daily_statistics中的每日统计数据
      const dailyStats = response.data.daily_statistics || []
      
      if (dailyStats.length > 0) {
        // 转换数据格式
        weekTrafficData.value = dailyStats.map(day => ({
          date: day.date,
          in_mb: day.total_in_mb || 0,
          out_mb: day.total_out_mb || 0,
          total_mb: day.total_traffic_mb || 0
        }))
        console.log('最近7天流量数据:', weekTrafficData.value)
      } else {
        // 如果没有数据，生成最近7天的日期，每天流量为0
        console.log('最近7天流量数据为空，生成默认数据')
        const today = new Date()
        weekTrafficData.value = []
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today)
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]
          weekTrafficData.value.push({
            date: dateStr,
            in_mb: 0,
            out_mb: 0,
            total_mb: 0
          })
        }
        console.log('生成的默认流量数据:', weekTrafficData.value)
      }
    } else {
      console.log('最近7天流量数据格式不正确，生成默认数据')
      // 生成最近7天的日期，每天流量为0
      const today = new Date()
      weekTrafficData.value = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        weekTrafficData.value.push({
          date: dateStr,
          in_mb: 0,
          out_mb: 0,
          total_mb: 0
        })
      }
    }
  } catch (error) {
    console.error('加载最近7天流量失败:', error)
    // 出错时也生成默认数据
    const today = new Date()
    weekTrafficData.value = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      weekTrafficData.value.push({
        date: dateStr,
        in_mb: 0,
        out_mb: 0,
        total_mb: 0
      })
    }
  }
}

// 一言数据
const hitokoto = ref('')

// 获取一言
const fetchHitokoto = async () => {
  try {
    const res = await fetch('https://v1.hitokoto.cn/?c=i')
    const data = await res.json()
    hitokoto.value = `${data.hitokoto} —— ${data.from}`
  } catch (e) {
    console.error('获取一言失败', e)
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
    loadNotifications(),
    loadTodayStats(),
    loadWeekTraffic(),
    fetchHitokoto()
  ])
  
  // 定时刷新统计数据（每30秒）
  setInterval(() => {
    loadTunnelStats()
    loadTodayStats()
  }, 30000)
})
</script>
