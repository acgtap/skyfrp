<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <!-- 导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <div class="w-8 h-8 bg-[#7367f0] rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">S</span>
              </div>
              <span class="ml-2 text-xl font-bold text-black">SkyFRP</span>
            </div>
          </div>
          
          <!-- 导航菜单 -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#home" @click="scrollToSection('home')" 
                 class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                首页
              </a>
              <a href="#features" @click="scrollToSection('features')" 
                 class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                介绍
              </a>
              <a href="#pricing" @click="scrollToSection('pricing')" 
                 class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                定价
              </a>
              <a href="#about" @click="scrollToSection('about')" 
                 class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                关于
              </a>
              <a href="#help" @click="scrollToSection('help')" 
                 class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                帮助文档
              </a>
            </div>
          </div>

          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <button @click="mobileMenuOpen = !mobileMenuOpen" 
                    class="text-black hover:text-[#7367f0] focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 移动端菜单 -->
        <div v-show="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <a href="#home" @click="scrollToSection('home')" 
               class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
              首页
            </a>
            <a href="#features" @click="scrollToSection('features')" 
               class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
              介绍
            </a>
            <a href="#pricing" @click="scrollToSection('pricing')" 
               class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
              定价
            </a>
            <a href="#about" @click="scrollToSection('about')" 
               class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
              关于
            </a>
            <a href="#help" @click="scrollToSection('help')" 
               class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
              帮助文档
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- 首页部分 -->
    <section id="home" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-black mb-6">
            SkyFRP
          </h1>
          <p class="text-xl text-black mb-8 max-w-3xl mx-auto">
            专业的内网穿透服务，让您的本地服务轻松访问互联网
          </p>
          <button @click="startLogin" 
                  class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
            开始使用
          </button>
        </div>
      </div>
    </section>

    <!-- 功能介绍部分 -->
    <section id="features" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">功能特色</h2>
          <p class="text-lg text-black">为您提供全方位的内网穿透解决方案</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center p-6 rounded-lg border border-gray-200">
            <div class="w-12 h-12 bg-[#7367f0] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-2">个人建站</h3>
            <p class="text-black">快速搭建个人网站，让世界看到您的作品</p>
          </div>
          
          <div class="text-center p-6 rounded-lg border border-gray-200">
            <div class="w-12 h-12 bg-[#7367f0] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-2">游戏联机</h3>
            <p class="text-black">与朋友畅玩局域网游戏，无需复杂配置</p>
          </div>
          
          <div class="text-center p-6 rounded-lg border border-gray-200">
            <div class="w-12 h-12 bg-[#7367f0] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-2">NAS访问</h3>
            <p class="text-black">随时随地访问您的网络存储设备</p>
          </div>
          
          <div class="text-center p-6 rounded-lg border border-gray-200">
            <div class="w-12 h-12 bg-[#7367f0] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-black mb-2">远程桌面</h3>
            <p class="text-black">安全便捷的远程桌面连接服务</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于部分 -->
    <section id="about" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">关于我们</h2>
          <p class="text-lg text-black">专业可靠的内网穿透服务提供商</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-[#7367f0] mb-2">{{ stats.serverNodes }}</div>
            <div class="text-black">服务器节点数</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#7367f0] mb-2">{{ stats.tunnelCount }}</div>
            <div class="text-black">创建隧道数量</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#7367f0] mb-2">{{ stats.userCount }}</div>
            <div class="text-black">注册用户数量</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 定价部分 -->
    <section id="pricing" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">定价方案</h2>
          <p class="text-lg text-black">选择适合您的服务方案</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h3 class="text-xl font-bold text-black mb-4">免费版</h3>
            <div class="text-3xl font-bold text-[#7367f0] mb-4">¥0<span class="text-sm text-black">/月</span></div>
            <ul class="text-black space-y-2 mb-6">
              <li>5GB 流量</li>
              <li>1个隧道</li>
              <li>基础节点</li>
            </ul>
            <button class="w-full bg-gray-200 text-black py-2 px-4 rounded-lg">
              当前方案
            </button>
          </div>
          
          <div class="bg-white border-2 border-[#7367f0] rounded-lg p-8 text-center relative">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#7367f0] text-white px-4 py-1 rounded-full text-sm">
              推荐
            </div>
            <h3 class="text-xl font-bold text-black mb-4">标准版</h3>
            <div class="text-3xl font-bold text-[#7367f0] mb-4">¥19<span class="text-sm text-black">/月</span></div>
            <ul class="text-black space-y-2 mb-6">
              <li>50GB 流量</li>
              <li>5个隧道</li>
              <li>高速节点</li>
              <li>技术支持</li>
            </ul>
            <button class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg transition-colors">
              立即购买
            </button>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <h3 class="text-xl font-bold text-black mb-4">专业版</h3>
            <div class="text-3xl font-bold text-[#7367f0] mb-4">¥49<span class="text-sm text-black">/月</span></div>
            <ul class="text-black space-y-2 mb-6">
              <li>200GB 流量</li>
              <li>无限隧道</li>
              <li>BGP节点</li>
              <li>优先支持</li>
            </ul>
            <button class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg transition-colors">
              立即购买
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 帮助文档部分 -->
    <section id="help" class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4">帮助文档</h2>
          <p class="text-lg text-black">常见问题解答</p>
        </div>
        
        <div class="max-w-3xl mx-auto space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-black mb-2">如何创建隧道？</h3>
            <p class="text-black">登录管理面板后，在隧道管理中点击"创建隧道"，填写相关信息即可。</p>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-black mb-2">支持哪些协议？</h3>
            <p class="text-black">支持HTTP、HTTPS、TCP、UDP等多种协议。</p>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-black mb-2">如何充值？</h3>
            <p class="text-black">在管理面板的增值服务中选择充值金额，支持微信和支付宝支付。</p>
          </div>
          
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-black mb-2">流量如何计算？</h3>
            <p class="text-black">流量按照实际使用量计算，包括上传和下载流量。</p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <button @click="openHelpDocs" 
                  class="bg-[#7367f0] hover:bg-[#5f5bd8] text-white font-bold py-3 px-8 rounded-lg transition-colors">
            查看完整帮助文档
          </button>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="flex items-center justify-center mb-4">
            <div class="w-8 h-8 bg-[#7367f0] rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="ml-2 text-xl font-bold text-black">SkyFRP</span>
          </div>
          <p class="text-black mb-4">专业的内网穿透服务</p>
          <p class="text-black">QQ交流群：572658815</p>
        </div>
      </div>
    </footer>

    <!-- 登录加载界面 -->
    <div v-if="showLoginProgress" class="fixed inset-0 z-50">
      <!-- 灰色模糊背景 -->
      <div class="absolute inset-0 bg-gray-400 backdrop-blur-md"></div>
      
      <!-- 登录进度内容 -->
      <div class="relative flex items-center justify-center min-h-screen">
        <div class="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div class="text-center">
            <!-- 加载图标 -->
            <div class="w-16 h-16 bg-[#7367f0] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <!-- 标题 -->
            <h2 class="text-2xl font-bold text-black mb-2">正在登录管理面板</h2>
            <p class="text-gray-600 mb-6">{{ loginProgressText }}</p>
            
            <!-- 进度条 -->
            <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div class="bg-[#7367f0] h-3 rounded-full transition-all duration-500 ease-out" 
                   :style="{ width: loginProgress + '%' }"></div>
            </div>
            
            <!-- 百分比 -->
            <div class="text-2xl font-bold text-[#7367f0] mb-2">{{ loginProgress }}%</div>
            
            <!-- 当前步骤 -->
            <div class="text-sm text-gray-500">{{ currentStep }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '../api'
import { userStore } from '../stores/user'
import api from '../api'
import { logUserAction, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'

const router = useRouter()

// 移动端菜单状态
const mobileMenuOpen = ref(false)

// 登录进度相关
const showLoginProgress = ref(false)
const loginProgress = ref(0)
const loginProgressText = ref('正在验证QQ登录信息...')
const currentStep = ref('步骤 1/4')

// 统计数据
const stats = ref({
  serverNodes: 15,
  tunnelCount: 12580,
  userCount: 8960
})

// 滚动到指定部分
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  // 关闭移动端菜单
  mobileMenuOpen.value = false
}

// 显示登录进度
const showLoginProgressModal = () => {
  showLoginProgress.value = true
  loginProgress.value = 0
  
  // 模拟登录进度
  const steps = [
    { progress: 25, text: '正在验证QQ登录信息...', step: '步骤 1/4' },
    { progress: 50, text: '正在获取用户数据...', step: '步骤 2/4' },
    { progress: 75, text: '正在加载管理面板...', step: '步骤 3/4' },
    { progress: 100, text: '登录成功，即将跳转...', step: '步骤 4/4' }
  ]
  
  let currentStepIndex = 0
  
  const updateProgress = () => {
    if (currentStepIndex < steps.length) {
      const step = steps[currentStepIndex]
      loginProgress.value = step.progress
      loginProgressText.value = step.text
      currentStep.value = step.step
      
      currentStepIndex++
      
      if (currentStepIndex < steps.length) {
        setTimeout(updateProgress, 800) // 每步间隔800ms
      }
    }
  }
  
  // 开始进度更新
  setTimeout(updateProgress, 300)
}

// 隐藏登录进度
const hideLoginProgress = () => {
  showLoginProgress.value = false
  loginProgress.value = 0
}

// 处理QQ登录回调
const handleQQCallback = async (code, state) => {
  console.log('检测到QQ登录回调参数:', { code, state })
  
  try {
    if (code) {
      console.log('处理QQ授权码，调用后端回调接口...')
      
      // 显示登录进度
      showLoginProgressModal()
      
      // 严格按照流程图：调用后端的QQ回调接口
      const response = await api.get('/auth/qq-callback', {
        params: {
          code: code,
          state: state
        }
      })
      
      console.log('后端QQ回调接口响应:', response)
      
      // 检查后端是否返回了用户凭证
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
          
          // 使用真实的temp_key调用用户数据API
          await userStore.loadUserData()
          
          console.log('QQ登录成功，获取到真实用户数据:', userStore.userInfo)
          
          // 记录登录日志
          await logUserAction(LOG_TYPES.LOGIN, LOG_ACTIONS.LOGIN_SUCCESS, 'success', {
            usersId: users_id,
            userName: userStore.userInfo.users_name
          })
          
          // 等待进度条完成后跳转
          setTimeout(() => {
            hideLoginProgress()
            router.push('/dashboard')
          }, 3500) // 等待进度条动画完成
        } else {
          hideLoginProgress()
          throw new Error('后端未返回有效的用户凭证')
        }
      } else {
        hideLoginProgress()
        throw new Error('后端回调接口响应异常')
      }
    } else {
      console.error('未获取到QQ授权码')
      alert('QQ登录失败：未获取到授权码')
    }
  } catch (error) {
    hideLoginProgress()
    console.error('QQ登录回调处理失败:', error)
    
    if (error.response) {
      console.error('后端接口错误:', error.response.status, error.response.data)
      alert(`QQ登录失败: ${error.response.status} - ${error.response.data?.msg || '后端接口错误'}`)
    } else {
      alert('QQ登录失败，请重试')
    }
  }
}

// 开始登录
const startLogin = async () => {
  try {
    console.log('开始QQ登录流程...')
    
    // 根据环境设置回调地址
    const redirectUri = import.meta.env.DEV 
      ? 'http://127.0.0.1:5173/' 
      : 'https://skyfrp.katomegumi.net/'
    console.log('尝试设置回调地址:', redirectUri)
    
    const response = await authAPI.getQQLoginUrl(redirectUri)
    console.log('获取登录URL响应:', response)
    
    if (response.code === 0 && response.data && response.data.login_url) {
      console.log('跳转到QQ登录页面:', response.data.login_url)
      
      // 检查返回的URL中是否包含我们的回调地址
      if (response.data.login_url.includes('127.0.0.1')) {
        console.log('后端支持自定义回调地址')
      } else {
        console.log('后端使用默认回调地址，需要前端处理')
      }
      
      // 直接跳转到QQ登录页面
      window.location.href = response.data.login_url
    } else {
      console.error('获取登录URL失败:', response.msg || '未知错误')
      alert('获取登录URL失败: ' + (response.msg || '未知错误'))
    }
  } catch (error) {
    console.error('登录失败:', error)
    if (error.response) {
      console.error('错误响应:', error.response.data)
      alert('登录失败: ' + (error.response.data?.msg || error.message))
    } else if (error.request) {
      console.error('网络错误:', error.request)
      alert('网络连接失败，请检查网络连接')
    } else {
      alert('登录失败，请稍后重试')
    }
  }
}

// 打开帮助文档
const openHelpDocs = () => {
  window.open('https://docs.skyfrp.com', '_blank')
}

onMounted(() => {
  // 检查是否是QQ登录回调
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  const state = urlParams.get('state')
  
  if (code) {
    console.log('检测到QQ登录回调')
    handleQQCallback(code, state)
  }
})
</script>