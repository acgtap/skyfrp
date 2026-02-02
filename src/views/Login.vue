<template>
  <div class="min-h-screen bg-gradient-to-br from-[#f8f7fa] to-[#e8e7f0] flex items-center justify-center p-4">
    <!-- 登录页面 -->
    <div v-if="!showRegister" class="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
      <!-- 左侧图片 -->
      <div class="hidden lg:block lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1000&fit=crop" 
             alt="Login" 
             class="absolute inset-0 w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-br from-[#7367f0]/90 to-[#5f5bd8]/90 flex items-center justify-center">
          <div class="text-center text-white p-8">
            <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-white font-bold text-4xl">S</span>
            </div>
            <h2 class="text-4xl font-bold mb-4">欢迎回来</h2>
            <p class="text-xl text-white/90">专业的内网穿透服务</p>
            <div class="mt-8 space-y-3 text-left">
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>高速稳定的节点</span>
              </div>
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>简单易用的配置</span>
              </div>
              <div class="flex items-center space-x-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>7x24小时技术支持</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="w-full lg:w-1/2 p-12 flex flex-col justify-center">
        <div class="max-w-md mx-auto w-full">
          <!-- Logo (移动端显示) -->
          <div class="lg:hidden text-center mb-8">
            <div class="w-16 h-16 bg-[#7367f0] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">S</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">SkyFRP</h1>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-2">登录账号</h2>
          <p class="text-gray-600 mb-8">欢迎回来，请登录您的账号</p>

          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
              <input v-model="loginForm.email" 
                     type="email" 
                     placeholder="请输入邮箱地址"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <input v-model="loginForm.password" 
                     type="password" 
                     placeholder="请输入密码"
                     @keyup.enter="handleLogin"
                     class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
            </div>

            <button @click="handleLogin" 
                    :disabled="loginLoading"
                    class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition-all shadow-lg transform hover:scale-[1.02]">
              {{ loginLoading ? '登录中...' : '登录' }}
            </button>

            <!-- 分隔线 -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">或</span>
              </div>
            </div>

            <!-- QQ登录按钮 -->
            <button @click="handleQQLogin" 
                    class="w-full bg-white border-2 border-gray-300 hover:border-[#7367f0] hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.395 15.035a39.548 39.548 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39.548 39.548 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 1.514-2.114 1.514-2.114 0 .001-.03.318-.03.533 0 1.785.772 3.326 2.158 4.415-.75.168-1.354.394-1.354.655 0 .486 1.748.88 3.906.88 1.647 0 3.05-.258 3.655-.622.605.364 2.008.622 3.655.622 2.158 0 3.906-.394 3.906-.88 0-.261-.604-.487-1.354-.655 1.386-1.089 2.158-2.63 2.158-4.415 0-.215-.03-.532-.03-.533 0 0 .974 2.179 1.514 2.114.252-.03.583-1.39-.438-4.673z"/>
              </svg>
              <span>使用 QQ 登录</span>
            </button>

            <!-- 没有账号 -->
            <div class="text-center pt-4">
              <span class="text-gray-600">还没有账号？</span>
              <button @click="showRegister = true" class="text-[#7367f0] hover:text-[#5f5bd8] font-medium ml-2">
                立即注册
              </button>
            </div>

            <!-- 返回首页 -->
            <div class="text-center pt-2">
              <button @click="goBack" class="text-gray-500 hover:text-[#7367f0] text-sm transition-colors">
                ← 返回首页
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 注册页面 -->
    <div v-else class="w-full max-w-2xl max-h-[95vh] overflow-y-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
        <!-- Logo -->
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-[#7367f0] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">S</span>
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">创建账号</h2>
          <p class="text-gray-600">加入 SkyFRP，开启内网穿透之旅</p>
        </div>

        <div class="max-w-md mx-auto space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
            <input v-model="registerForm.email" 
                   type="email" 
                   placeholder="请输入邮箱地址"
                   :disabled="codeSent"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
            <p class="text-xs text-gray-500 mt-1">仅支持QQ邮箱或网易邮箱</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
            <input v-model="registerForm.username" 
                   type="text" 
                   placeholder="3-20个字符"
                   maxlength="20"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input v-model="registerForm.password" 
                   type="password" 
                   placeholder="至少6位"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
            <input v-model="registerForm.confirmPassword" 
                   type="password" 
                   placeholder="请再次输入密码"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">验证码</label>
            <div class="flex space-x-3">
              <input v-model="registerForm.verificationCode" 
                     type="text" 
                     placeholder="请输入6位验证码"
                     maxlength="6"
                     :disabled="!codeSent"
                     class="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
              <button @click="handleSendCode" 
                      :disabled="sendCodeLoading || !registerForm.email || codeSent"
                      class="px-5 py-2.5 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all whitespace-nowrap text-sm">
                {{ sendCodeLoading ? '发送中...' : codeSent ? '已发送' : '发送验证码' }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">邀请码（可选）</label>
            <input v-model="registerForm.invitationId" 
                   type="text" 
                   placeholder="如有邀请码请输入"
                   class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
          </div>

          <button @click="handleRegister" 
                  :disabled="registerLoading"
                  class="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-2.5 rounded-lg font-medium transition-all shadow-lg transform hover:scale-[1.02]">
            {{ registerLoading ? '注册中...' : '注册账号' }}
          </button>

          <!-- 已有账号 -->
          <div class="text-center pt-3">
            <span class="text-gray-600">已有账号？</span>
            <button @click="showRegister = false" class="text-[#7367f0] hover:text-[#5f5bd8] font-medium ml-2">
              立即登录
            </button>
          </div>

          <!-- 返回首页 -->
          <div class="text-center pt-1 pb-2">
            <button @click="goBack" class="text-gray-500 hover:text-[#7367f0] text-sm transition-colors">
              ← 返回首页
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { userAPI, authAPI } from '../api'
import { userStore } from '../stores/user'
import { showSuccess, showError, showWarning } from '../utils/modal'
import api from '../api'

const router = useRouter()
const route = useRoute()

// 显示注册页面
const showRegister = ref(false)

// 登录表单
const loginForm = ref({
  email: '',
  password: ''
})
const loginLoading = ref(false)

// 注册表单
const registerForm = ref({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  verificationCode: '',
  invitationId: ''
})
const registerLoading = ref(false)
const sendCodeLoading = ref(false)
const codeSent = ref(false)

// 处理QQ登录回调
const handleQQCallback = async (code, state) => {
  console.log('检测到QQ登录回调参数:', { code, state })
  
  try {
    if (code) {
      console.log('处理QQ授权码，调用后端回调接口...')
      
      const response = await api.get('/auth/qq-callback', {
        params: {
          code: code,
          state: state
        }
      })
      
      console.log('后端QQ回调接口响应:', response)
      
      if (response && response.data) {
        const { users_id, temp_key } = response.data
        
        if (users_id && temp_key) {
          console.log('获取到后端返回的用户凭证:', { users_id, temp_key })
          
          // 设置用户登录状态
          userStore.usersId = users_id.toString()
          userStore.tempKey = temp_key
          userStore.isAuthenticated = true
          
          localStorage.setItem('users_id', users_id.toString())
          localStorage.setItem('temp_key', temp_key)
          
          // 加载用户数据
          await userStore.loadUserData()
          
          console.log('QQ登录成功，获取到真实用户数据:', userStore.userInfo)
          
          showSuccess('QQ登录成功')
          router.push('/dashboard')
        } else {
          throw new Error('后端未返回有效的用户凭证')
        }
      } else {
        throw new Error('后端回调接口响应异常')
      }
    }
  } catch (error) {
    console.error('QQ登录回调处理失败:', error)
    
    if (error.response) {
      console.error('后端接口错误:', error.response.status, error.response.data)
      showError(`QQ登录失败: ${error.response.data?.msg || '后端接口错误'}`)
    } else {
      showError('QQ登录失败，请重试')
    }
  }
}

// 邮箱登录
const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    showWarning('请输入邮箱和密码')
    return
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(loginForm.value.email)) {
    showWarning('请输入有效的邮箱地址')
    return
  }

  loginLoading.value = true
  try {
    const response = await userAPI.emailLogin(loginForm.value.email, loginForm.value.password)
    
    if (response.code === 0 && response.data) {
      const { users_id, temp_key } = response.data
      
      // 保存登录信息
      userStore.usersId = users_id.toString()
      userStore.tempKey = temp_key
      userStore.isAuthenticated = true
      
      localStorage.setItem('users_id', users_id.toString())
      localStorage.setItem('temp_key', temp_key)
      
      // 加载用户数据
      await userStore.loadUserData()
      
      showSuccess('登录成功')
      router.push('/dashboard')
    } else {
      showError(response.msg || '登录失败')
    }
  } catch (error) {
    console.error('登录失败:', error)
    if (error.response && error.response.data) {
      showError(error.response.data.msg || '登录失败，请检查邮箱和密码')
    } else {
      showError('登录失败，请稍后重试')
    }
  } finally {
    loginLoading.value = false
  }
}

// QQ登录
const handleQQLogin = async () => {
  try {
    const redirectUri = import.meta.env.DEV 
      ? 'http://127.0.0.1:5173/login' 
      : 'https://skyfrp.katomegumi.net/login'
    
    const response = await authAPI.getQQLoginUrl(redirectUri)
    
    if (response.code === 0 && response.data && response.data.login_url) {
      window.location.href = response.data.login_url
    } else {
      showError('获取登录URL失败: ' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('QQ登录失败:', error)
    showError('QQ登录失败，请稍后重试')
  }
}

// 发送注册验证码
const handleSendCode = async () => {
  if (!registerForm.value.email || !registerForm.value.email.trim()) {
    showWarning('请输入邮箱地址')
    return
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(registerForm.value.email)) {
    showWarning('请输入有效的邮箱地址')
    return
  }

  // 验证是否为QQ邮箱或网易邮箱
  const qqEmailRegex = /@qq\.com$/
  const neteaseEmailRegex = /@(163|126|yeah)\.net$/
  if (!qqEmailRegex.test(registerForm.value.email) && !neteaseEmailRegex.test(registerForm.value.email)) {
    showWarning('仅支持QQ邮箱或网易邮箱')
    return
  }

  sendCodeLoading.value = true
  try {
    const response = await userAPI.sendEmailRegisterCode(registerForm.value.email)
    
    if (response.code === 0) {
      codeSent.value = true
      showSuccess('验证码已发送到邮箱，请查收（有效期10分钟）')
    } else {
      showError(response.msg || '发送验证码失败')
    }
  } catch (error) {
    console.error('发送验证码失败:', error)
    if (error.response && error.response.data) {
      showError(error.response.data.msg || '发送验证码失败')
    } else {
      showError('发送验证码失败，请稍后重试')
    }
  } finally {
    sendCodeLoading.value = false
  }
}

// 注册账号
const handleRegister = async () => {
  // 验证表单
  if (!registerForm.value.email || !registerForm.value.username || 
      !registerForm.value.password || !registerForm.value.verificationCode) {
    showWarning('请填写完整的注册信息')
    return
  }

  // 验证用户名长度
  if (registerForm.value.username.length < 3 || registerForm.value.username.length > 20) {
    showWarning('用户名长度应为3-20个字符')
    return
  }

  // 验证密码长度
  if (registerForm.value.password.length < 6) {
    showWarning('密码至少需要6位')
    return
  }

  // 验证密码一致性
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    showWarning('两次输入的密码不一致')
    return
  }

  // 验证验证码
  if (registerForm.value.verificationCode.length !== 6) {
    showWarning('请输入6位验证码')
    return
  }

  registerLoading.value = true
  try {
    // 生成头像URL
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(registerForm.value.username)}&background=6366f1&color=fff&size=100`
    
    const response = await userAPI.emailRegister(
      registerForm.value.email,
      registerForm.value.username,
      registerForm.value.password,
      registerForm.value.verificationCode,
      registerForm.value.invitationId || null,
      avatarUrl
    )

    if (response.code === 0) {
      showSuccess('注册成功，请登录')
      // 切换到登录页面
      showRegister.value = false
      // 将注册的邮箱填入登录表单
      loginForm.value.email = registerForm.value.email
      // 清空注册表单
      registerForm.value = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        verificationCode: '',
        invitationId: ''
      }
      codeSent.value = false
    } else {
      showError(response.msg || '注册失败')
    }
  } catch (error) {
    console.error('注册失败:', error)
    if (error.response && error.response.data) {
      showError(error.response.data.msg || '注册失败')
    } else {
      showError('注册失败，请稍后重试')
    }
  } finally {
    registerLoading.value = false
  }
}

// 返回首页
const goBack = () => {
  router.push('/')
}

// 页面加载时检查是否有QQ登录回调
onMounted(() => {
  const code = route.query.code
  const state = route.query.state
  
  if (code) {
    console.log('检测到QQ登录回调')
    handleQQCallback(code, state)
  }
})
</script>
