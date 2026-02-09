<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <!-- 侧边栏 -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-100 transform transition-transform duration-300 ease-in-out"
         :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }">
      <div class="flex items-center justify-between h-16 px-6 border-b border-gray-100">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gradient-to-br from-[#7367f0] to-[#5f5bd8] rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white font-bold text-lg">S</span>
          </div>
          <span class="ml-3 text-lg font-bold text-gray-900">SkyFRP</span>
        </div>
        <button @click="toggleSidebar" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <nav class="mt-6 px-3">
        <div class="space-y-2">
          <router-link to="/dashboard" 
                       class="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group"
                       :class="$route.name === 'Dashboard' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            总览
          </router-link>
          
          <router-link to="/profile" 
                       class="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group"
                       :class="$route.name === 'Profile' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            个人资料
          </router-link>
          
          <!-- 隧道管理下拉菜单 -->
          <div class="space-y-1">
            <button @click="toggleTunnelMenu" 
                    class="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0] rounded-xl transition-all duration-200 group">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                隧道管理
              </div>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': tunnelMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="tunnelMenuOpen" class="ml-8 space-y-1">
              <router-link to="/tunnels" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'TunnelList' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                隧道列表
              </router-link>
              <router-link to="/nodes" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'NodeList' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                节点列表
              </router-link>
              <router-link to="/config" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'ConfigFiles' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                配置文件
              </router-link>
              <router-link to="/downloads" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'Downloads' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                软件下载
              </router-link>
            </div>
          </div>
          
          <!-- 增值服务下拉菜单 -->
          <div class="space-y-1">
            <button @click="toggleServiceMenu" 
                    class="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0] rounded-xl transition-all duration-200 group">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                增值服务
              </div>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': serviceMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="serviceMenuOpen" class="ml-8 space-y-1">
              <router-link to="/recharge" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'Recharge' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                余额充值
              </router-link>
              <router-link to="/shop" 
                           class="block px-4 py-2 text-base rounded-lg transition-all duration-200"
                           :class="$route.name === 'Shop' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-600 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
                余额商城
              </router-link>
            </div>
          </div>
          
          <router-link to="/logs" 
                       class="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group"
                       :class="$route.name === 'UserLogs' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            用户日志
          </router-link>
          
          <router-link to="/help" 
                       class="flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 group"
                       :class="$route.name === 'Help' ? 'bg-white text-gray-900 border-r-4 border-[#7367f0] shadow-md' : 'text-gray-700 hover:bg-[#7367f0]/5 hover:text-[#7367f0]'">
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            帮助文档
          </router-link>
        </div>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="md:ml-64">
      <!-- 顶部导航栏 -->
      <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div class="flex items-center justify-between h-16 px-6">
          <button @click="toggleSidebar" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <div class="flex items-center space-x-4 ml-auto">
            <!-- 签到按钮 -->
            <button @click="handleSignIn" 
                    :disabled="signInLoading || hasSignedToday"
                    :class="hasSignedToday ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8]'"
                    class="text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg disabled:shadow-none">
              {{ hasSignedToday ? '已签到' : (signInLoading ? '签到中...' : '每日签到') }}
            </button>
            
            <!-- 用户信息下拉菜单 -->
            <div class="relative group">
              <button class="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-100 hover:bg-white transition-colors">
                <img :src="userStore.userInfo.users_faceimg || '/default-avatar.png'" 
                     :alt="userStore.userInfo.users_name || '用户'"
                     class="w-8 h-8 rounded-full ring-2 ring-[#7367f0]/20"
                     @error="handleImageError">
                <span class="text-gray-900 font-medium">{{ userStore.userInfo.users_name || '用户' }}</span>
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- 下拉菜单 - hover显示 -->
              <div class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="px-4 py-3 border-b border-gray-100">
                  <div class="flex items-center space-x-3 mb-2">
                    <img :src="userStore.userInfo.users_faceimg || '/default-avatar.png'" 
                         :alt="userStore.userInfo.users_name || '用户'"
                         class="w-12 h-12 rounded-full ring-2 ring-[#7367f0]/20"
                         @error="handleImageError">
                    <div class="flex-1 min-w-0">
                      <p class="font-semibold text-gray-900 truncate">{{ userStore.userInfo.users_name || '用户' }}</p>
                      <p class="text-xs text-gray-500">ID: {{ userStore.userInfo.id }}</p>
                    </div>
                  </div>
                  <!-- 标签 -->
                  <div class="flex flex-wrap gap-2 mt-2">
                    <span class="px-2 py-1 text-white text-xs rounded-full font-medium"
                          :class="userStore.userInfo.user_group !== 'default' ? 'bg-amber-500' : 'bg-gradient-to-r from-[#7367f0] to-[#5f5bd8]'">
                      {{ userStore.userInfo.user_group_name || '普通用户' }}
                    </span>
                    <span v-if="isCertified" 
                          class="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-medium flex items-center">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      已实名
                    </span>
                    <span v-else 
                          class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                      未实名
                    </span>
                  </div>
                </div>
                <button @click="goToProfile" 
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2 border-t border-gray-100">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  <span>编辑资料</span>
                </button>
                <button @click="handleLogout" 
                        class="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  <span>退出登录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="p-6">
        <transition name="content-fade" mode="out-in">
          <div :key="$route.path">
            <slot />
          </div>
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/user'
import { certificationAPI } from '../api'

const router = useRouter()

// 侧边栏状态 - 使用localStorage保持状态
const sidebarOpen = ref(true)
const tunnelMenuOpen = ref(localStorage.getItem('tunnelMenuOpen') === 'true')
const serviceMenuOpen = ref(localStorage.getItem('serviceMenuOpen') === 'true')

// 签到状态
const signInLoading = ref(false)
const hasSignedToday = ref(false)

// 实名认证状态
const isCertified = ref(false)

// 检查今日是否已签到
const checkSignInStatus = () => {
  const lastSignInDate = localStorage.getItem('lastSignInDate')
  const today = new Date().toDateString()
  hasSignedToday.value = lastSignInDate === today
}

// 检查实名认证状态
const checkCertificationStatus = async () => {
  try {
    const response = await certificationAPI.getCertificationInfo(userStore.tempKey)
    if (response.code === 0 && response.data) {
      isCertified.value = response.data.is_certified && response.data.real_name_status === 'true'
    }
  } catch (error) {
    console.error('获取认证状态失败:', error)
    // 如果接口失败，从用户信息判断
    isCertified.value = userStore.userInfo.real_name === 'true' || userStore.userInfo.real_name === true
  }
}

// 切换侧边栏
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// 切换隧道菜单
const toggleTunnelMenu = () => {
  tunnelMenuOpen.value = !tunnelMenuOpen.value
  // 保存状态到localStorage
  localStorage.setItem('tunnelMenuOpen', tunnelMenuOpen.value.toString())
}

// 切换服务菜单
const toggleServiceMenu = () => {
  serviceMenuOpen.value = !serviceMenuOpen.value
  // 保存状态到localStorage
  localStorage.setItem('serviceMenuOpen', serviceMenuOpen.value.toString())
}

// 处理签到
const handleSignIn = async () => {
  if (hasSignedToday.value) {
    return
  }
  
  signInLoading.value = true
  try {
    const response = await userStore.signIn()
    if (response.code === 0) {
      // 保存签到日期
      const today = new Date().toDateString()
      localStorage.setItem('lastSignInDate', today)
      hasSignedToday.value = true
      
      // 使用美观的成功弹窗，带动画效果
      const modal = document.createElement('div')
      modal.className = 'fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4'
      modal.style.animation = 'fadeIn 0.3s ease-out'
      modal.innerHTML = `
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden" style="animation: modalContentIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)">
          <!-- 内容区 -->
          <div class="p-6">
            <!-- 成功图标 - 带动画 -->
            <div class="flex justify-center mb-4">
              <div class="relative">
                <svg class="w-20 h-20" viewBox="0 0 52 52">
                  <circle class="success-circle" cx="26" cy="26" r="25" fill="none" stroke="#10b981" stroke-width="2"/>
                  <path class="success-checkmark" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" d="M14 27l7 7 16-16"/>
                </svg>
                <!-- 脉冲效果 -->
                <div class="absolute inset-0 bg-green-400 rounded-full opacity-20" style="animation: pulse 1.5s ease-out infinite"></div>
              </div>
            </div>
            
            <!-- 标题 - 带淡入动画 -->
            <h3 class="text-2xl font-bold text-gray-900 text-center mb-3" style="animation: fadeIn 0.5s ease-out 0.3s both">签到成功</h3>
            
            <!-- 奖励信息 - 带弹跳动画 -->
            <div class="bg-gradient-to-r from-[#7367f0]/10 to-[#5f5bd8]/10 rounded-xl p-5 mb-4 border border-[#7367f0]/20" style="animation: bounce 0.6s ease-out 0.5s both">
              <div class="text-center">
                <p class="text-sm text-gray-600 mb-2">🎉 获得流量奖励</p>
                <p class="text-4xl font-bold text-[#7367f0] mb-1">${response.data.add_traffic || 0} MB</p>
                <p class="text-xs text-gray-500">已自动添加到您的账户</p>
              </div>
            </div>
            
            <!-- 连续签到天数 -->
            ${response.data.continuous_days ? `
              <div class="text-center text-sm text-gray-600 mb-2" style="animation: fadeIn 0.5s ease-out 0.7s both">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  已连续签到 <span class="font-bold mx-1">${response.data.continuous_days}</span> 天
                </span>
              </div>
            ` : ''}
          </div>
          
          <!-- 按钮区 -->
          <div class="px-6 pb-6">
            <button data-action="confirm" 
                    class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30 hover:scale-105 transform"
                    style="animation: fadeIn 0.5s ease-out 0.8s both">
              太好了 🎊
            </button>
          </div>
        </div>
      `
      document.body.appendChild(modal)
      
      // 确认按钮
      modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
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
      
    } else {
      // 使用美观的错误弹窗
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            
            <!-- 标题 -->
            <h3 class="text-xl font-bold text-gray-900 text-center mb-3">签到失败</h3>
            
            <!-- 消息 -->
            <p class="text-gray-600 text-center leading-relaxed mb-6">${response.msg || '签到失败，请稍后重试'}</p>
          </div>
          
          <!-- 按钮区 -->
          <div class="px-6 pb-6">
            <button data-action="confirm" 
                    class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
              确定
            </button>
          </div>
        </div>
      `
      document.body.appendChild(modal)
      
      // 确认按钮
      modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
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
  } catch (error) {
    // 使用美观的错误弹窗
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>
          
          <!-- 标题 -->
          <h3 class="text-xl font-bold text-gray-900 text-center mb-3">签到失败</h3>
          
          <!-- 消息 -->
          <p class="text-gray-600 text-center leading-relaxed mb-6">签到失败，请稍后重试</p>
        </div>
        
        <!-- 按钮区 -->
        <div class="px-6 pb-6">
          <button data-action="confirm" 
                  class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
            确定
          </button>
        </div>
      </div>
    `
    document.body.appendChild(modal)
    
    // 确认按钮
    modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
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
  } finally {
    signInLoading.value = false
  }
}

// 跳转到个人资料页面并打开编辑弹窗
const goToProfile = () => {
  router.push({ path: '/profile', query: { edit: 'true' } })
}

// 处理登出
const handleLogout = () => {
  // 使用美观的确认弹窗
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
        <h3 class="text-xl font-bold text-gray-900 text-center mb-3">退出登录</h3>
        
        <!-- 消息 -->
        <p class="text-gray-600 text-center leading-relaxed mb-6">确定要退出登录吗？</p>
      </div>
      
      <!-- 按钮区 -->
      <div class="px-6 pb-6 flex space-x-3">
        <button data-action="cancel" 
                class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-gray-200 transition-all duration-200">
          取消
        </button>
        <button data-action="confirm" 
                class="flex-1 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
          确定
        </button>
      </div>
    </div>
  `
  document.body.appendChild(modal)
  
  // 确认按钮
  modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    modal.remove()
    userStore.logout()
    router.push('/')
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

// 处理头像加载错误
const handleImageError = (event) => {
  event.target.src = '/default-avatar.png'
}

onMounted(() => {
  // 在大屏幕上默认展开侧边栏
  if (window.innerWidth >= 768) {
    sidebarOpen.value = true
  } else {
    sidebarOpen.value = false
  }
  
  // 检查签到状态
  checkSignInStatus()
  
  // 检查实名认证状态
  checkCertificationStatus()
})
</script>


<style scoped>
/* 内容区域切换动画 */
.content-fade-enter-active,
.content-fade-leave-active {
  transition: all 0.25s ease;
}

.content-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
