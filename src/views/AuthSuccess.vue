<template>
  <div class="min-h-screen bg-[#f8f7fa] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="w-16 h-16 bg-[#7367f0] rounded-full flex items-center justify-center mx-auto">
            <svg class="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-black">登录中...</h2>
          <p class="text-black">正在处理您的登录信息</p>
        </div>
        
        <div v-else-if="error" class="space-y-4">
          <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-black">登录失败</h2>
          <p class="text-black">{{ errorMessage }}</p>
          <button @click="goHome" 
                  class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white font-bold py-2 px-6 rounded-lg transition-colors">
            返回首页
          </button>
        </div>
        
        <div v-else class="space-y-4">
          <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-black">登录成功</h2>
          <p class="text-black">正在跳转到管理面板...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '../stores/user'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

const errorMessages = {
  missing_code: '缺少授权码参数',
  token_failed: '获取access_token失败',
  auth_failed: '授权失败',
  invalid_response: '响应数据不完整',
  network_error: '网络连接错误',
  user_info_failed: '获取用户信息失败',
  user_info_error: '用户信息错误',
  database_error: '数据库连接失败',
  user_banned: '用户已被封禁',
  create_failed: '用户创建失败',
  server_error: '服务器内部错误',
  system_error: '系统错误'
}

const goHome = () => {
  router.push('/')
}

onMounted(async () => {
  // 检查URL参数
  const usersId = route.query.users_id
  const tempKey = route.query.temp_key
  const errorType = route.query.error
  const code = route.query.code
  const state = route.query.state

  if (errorType) {
    // 登录失败
    loading.value = false
    error.value = true
    errorMessage.value = errorMessages[errorType] || '未知错误'
  } else if (usersId && tempKey) {
    // 登录成功，已有用户信息
    try {
      console.log('QQ登录成功，获取到用户凭证:', { usersId, tempKey })
      
      // 设置用户登录状态
      userStore.usersId = usersId
      userStore.tempKey = tempKey
      userStore.isAuthenticated = true
      
      localStorage.setItem('users_id', usersId)
      localStorage.setItem('temp_key', tempKey)
      
      // 调用API获取真实用户数据
      await userStore.loadUserData()
      
      console.log('用户数据加载成功:', userStore.userInfo)
      loading.value = false
      
      // 延迟跳转到管理面板
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (error) {
      console.error('加载用户数据失败:', error)
      loading.value = false
      error.value = true
      errorMessage.value = '加载用户数据失败，请重试'
    }
  } else if (code) {
    // QQ登录回调，收到code参数，说明后端还没有处理完成
    // 这种情况下我们应该等待后端处理并重定向
    console.log('收到QQ登录code，等待后端处理:', code)
    
    // 显示等待信息
    loading.value = true
    
    // 等待一段时间后检查是否有重定向
    setTimeout(() => {
      // 如果5秒后还没有重定向，显示错误
      if (loading.value) {
        loading.value = false
        error.value = true
        errorMessage.value = '登录处理超时，请重新登录'
      }
    }, 5000)
  } else {
    // 参数不完整
    loading.value = false
    error.value = true
    errorMessage.value = '登录参数不完整'
  }
})
</script>