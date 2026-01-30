<template>
  <div class="min-h-screen bg-[#f8f7fa] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="w-16 h-16 bg-[#7367f0] rounded-full flex items-center justify-center mx-auto">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">正在处理QQ登录...</h2>
          <p class="text-gray-600">请稍候，我们正在验证您的身份</p>
        </div>
        
        <div v-else-if="error" class="space-y-4">
          <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">登录失败</h2>
          <p class="text-gray-600">{{ errorMessage }}</p>
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
          <h2 class="text-xl font-semibold text-gray-900">登录成功</h2>
          <p class="text-gray-600">欢迎使用 SkyFRP，正在跳转到管理面板...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userStore } from '../stores/user'
import api from '../api'

const router = useRouter()
const route = useRoute()

const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

const goHome = () => {
  router.push('/')
}

// 处理QQ登录回调
const handleQQCallback = async () => {
  try {
    // 从URL参数中获取code和state
    const code = route.query.code
    const state = route.query.state
    
    console.log('QQ登录回调参数:', { code, state })
    
    if (!code) {
      throw new Error('缺少授权码')
    }
    
    // 调用后端的QQ登录回调接口
    const response = await api.get('/auth/qq-callback', {
      params: { code, state }
    })
    
    console.log('QQ登录回调响应:', response)
    
    if (response.code === 0) {
      // 登录成功，保存用户信息
      const { users_id, temp_key } = response.data
      userStore.login(users_id, temp_key)
      
      // 延迟跳转到管理面板
      setTimeout(() => {
        loading.value = false
        router.push('/dashboard')
      }, 1500)
    } else {
      throw new Error(response.msg || 'QQ登录失败')
    }
  } catch (err) {
    console.error('QQ登录回调处理失败:', err)
    error.value = true
    errorMessage.value = err.message || '登录处理失败，请重试'
    loading.value = false
  }
}

onMounted(() => {
  // 检查是否有必要的参数
  if (route.query.type === 'qq' && route.query.code) {
    handleQQCallback()
  } else {
    error.value = true
    errorMessage.value = '无效的登录回调参数'
    loading.value = false
  }
})
</script>