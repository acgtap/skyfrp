<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <DashboardLayout>
      <div class="space-y-6">
        <!-- 页面标题 -->
        <div>
          <h1 class="text-2xl font-bold text-black">个人资料</h1>
          <p class="text-black mt-1">管理您的账户信息和设置</p>
        </div>

        <!-- 用户基本信息卡片 -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center space-x-6">
            <img :src="userStore.userInfo.users_faceimg || '/default-avatar.png'" 
                 :alt="userStore.userInfo.users_name"
                 class="w-20 h-20 rounded-full ring-4 ring-[#7367f0]/20 shadow-lg">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-black">{{ userStore.userInfo.users_name || '未设置昵称' }}</h3>
              <div class="flex items-center space-x-4 mt-2">
                <span class="px-3 py-1 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] text-white text-sm rounded-full font-medium">
                  {{ userStore.userInfo.user_group_name || '普通用户' }}
                </span>
                <span class="text-sm text-gray-500">ID: {{ userStore.userInfo.id }}</span>
              </div>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">账户余额</p>
              <p class="text-3xl font-bold text-[#7367f0]">¥{{ userStore.userInfo.user_money }}</p>
            </div>
          </div>
        </div>

        <!-- 账户统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">剩余流量</p>
                <p class="text-2xl font-bold text-black">{{ formatTraffic(userStore.userInfo.users_traffic) }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">节点速度</p>
                <p class="text-2xl font-bold text-black">{{ userStore.userInfo.node_speed }} Mbps</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">流量包数量</p>
                <p class="text-2xl font-bold text-black">{{ userStore.userInfo.traffic_packages?.length || 0 }} 个</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- 两列布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 左列：账户信息 -->
          <div class="space-y-6">
            <!-- 基本信息 -->
            <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 class="text-lg font-bold text-black mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                基本信息
              </h2>
              <div class="space-y-3">
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm text-gray-600">用户UID</span>
                  <span class="text-sm font-mono text-gray-900 break-all text-right ml-2">{{ userStore.userInfo.users_uid }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm text-gray-600">邮箱地址</span>
                  <span class="text-sm text-gray-900">{{ userStore.userInfo.users_email || '未绑定' }}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="text-sm text-gray-600">用户组</span>
                  <span class="text-sm text-gray-900">{{ userStore.userInfo.user_group_name || '普通用户' }}</span>
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

            <!-- 邮箱绑定 -->
            <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 class="text-lg font-bold text-black mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                邮箱绑定
              </h2>
              
              <div v-if="userStore.userInfo.users_email" class="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">已绑定邮箱</p>
                    <p class="font-medium text-gray-900">{{ userStore.userInfo.users_email }}</p>
                  </div>
                </div>
              </div>
              
              <div v-else class="space-y-3">
                <div>
                  <input v-model="email" 
                         type="email" 
                         placeholder="请输入邮箱地址（仅支持QQ邮箱或网易邮箱）"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
                </div>
                <div class="relative group">
                  <button @click="handleBindEmail" 
                          :disabled="bindLoading"
                          class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {{ bindLoading ? '绑定中...' : '绑定邮箱' }}
                  </button>
                  <!-- 未输入邮箱提示 -->
                  <div v-if="!email" 
                       class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-10">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                      <span>请输入邮箱地址</span>
                    </div>
                    <!-- 小箭头 -->
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div class="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-500 flex items-start space-x-1">
                  <svg class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>仅支持QQ邮箱（@qq.com）或网易邮箱（@163.net、@126.net、@yeah.net）</span>
                </p>
              </div>
            </div>
          </div>

          <!-- 右列：流量包详情 -->
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h2 class="text-lg font-bold text-black mb-4 flex items-center">
              <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
              流量包详情
            </h2>
            
            <div v-if="userStore.userInfo.traffic_packages && userStore.userInfo.traffic_packages.length > 0" 
                 class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <div v-for="pkg in userStore.userInfo.traffic_packages" :key="pkg.id" 
                   class="border border-gray-200 rounded-xl p-4 hover:border-[#7367f0] transition-colors">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <h3 class="font-semibold text-black">{{ pkg.traffic_name }}</h3>
                  </div>
                  <span class="px-2 py-1 bg-[#7367f0]/10 text-[#7367f0] text-xs rounded-full font-medium">
                    {{ ((pkg.traffic_remaining / pkg.traffic) * 100).toFixed(0) }}%
                  </span>
                </div>
                
                <div class="grid grid-cols-3 gap-3 mb-3">
                  <div class="text-center p-2 bg-gray-50 rounded-lg">
                    <p class="text-xs text-gray-500">总流量</p>
                    <p class="text-sm font-semibold text-gray-900">{{ formatTraffic(pkg.traffic) }}</p>
                  </div>
                  <div class="text-center p-2 bg-gray-50 rounded-lg">
                    <p class="text-xs text-gray-500">已使用</p>
                    <p class="text-sm font-semibold text-gray-900">{{ formatTraffic(pkg.traffic_used) }}</p>
                  </div>
                  <div class="text-center p-2 bg-[#7367f0]/10 rounded-lg">
                    <p class="text-xs text-gray-500">剩余</p>
                    <p class="text-sm font-semibold text-[#7367f0]">{{ formatTraffic(pkg.traffic_remaining) }}</p>
                  </div>
                </div>
                
                <div class="mb-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] h-2 rounded-full transition-all duration-300" 
                         :style="{ width: `${(pkg.traffic_used / pkg.traffic) * 100}%` }"></div>
                  </div>
                </div>
                
                <div class="text-xs text-gray-500 space-y-1">
                  <p>开通: {{ pkg.opening_time }}</p>
                  <p>到期: {{ pkg.end_time }}</p>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
              </div>
              <p class="text-gray-500">暂无流量包信息</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '../stores/user'
import { userAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'
import { showSuccess, showError, showWarning } from '../utils/modal'

// 邮箱绑定
const email = ref('')
const bindLoading = ref(false)

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

// 绑定邮箱
const handleBindEmail = async () => {
  if (!email.value || !email.value.trim()) {
    return
  }
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    showWarning('请输入有效的邮箱地址')
    return
  }
  
  // 验证是否为QQ邮箱或网易邮箱
  const qqEmailRegex = /@qq\.com$/
  const neteaseEmailRegex = /@(163|126|yeah)\.net$/
  if (!qqEmailRegex.test(email.value) && !neteaseEmailRegex.test(email.value)) {
    showWarning('仅支持QQ邮箱或网易邮箱')
    return
  }
  
  bindLoading.value = true
  try {
    const response = await userAPI.bindEmail(userStore.tempKey, email.value.trim())
    if (response.code === 0) {
      showSuccess('验证码已发送到邮箱，请查收', '绑定成功')
      email.value = ''
      // 重新加载用户数据
      await userStore.loadUserData()
    } else {
      showError(response.msg || '邮箱绑定失败')
    }
  } catch (error) {
    console.error('邮箱绑定失败:', error)
    showError('邮箱绑定失败，请稍后重试')
  } finally {
    bindLoading.value = false
  }
}
</script>
