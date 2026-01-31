<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <DashboardLayout>
      <div class="space-y-6">
        <!-- 页面标题 -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <h1 class="text-2xl font-bold text-black">余额商城</h1>
            <p class="text-black mt-1">使用余额购买会员和流量包</p>
          </div>
          <div class="text-left">
            <p class="text-sm text-black">当前余额</p>
            <p class="text-2xl font-bold text-[#7367f0]">¥{{ userStore.userInfo.user_money }}</p>
          </div>
        </div>

        <!-- 商品列表 -->
        <!-- 骨架屏加载 -->
        <div v-if="loading" class="space-y-6">
          <!-- 会员商品骨架屏 -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="'skeleton-member-' + i" 
                 class="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div class="mb-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="h-6 bg-gray-200 rounded w-32"></div>
                  <div class="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div class="space-y-3">
                  <div class="h-12 bg-gray-100 rounded-lg"></div>
                  <div class="h-12 bg-gray-100 rounded-lg"></div>
                  <div class="h-12 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
              <div class="space-y-4">
                <div class="h-16 bg-gray-100 rounded-lg"></div>
                <div class="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-6">
          <!-- 会员服务商品 -->
          <div v-if="memberProducts.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="(product, index) in memberProducts" :key="product.id" 
                   class="bg-white rounded-xl border border-gray-200 p-6 h-fit shadow-sm hover:shadow-lg transition-all duration-300 relative animate-fade-in"
                   :style="{ animationDelay: `${index * 30}ms` }">
                
                <!-- 推荐标签 - 贴纸样式 -->
                <div v-if="product.display_name.includes('永久会员')" 
                     class="absolute -top-2 -right-2 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] text-white px-4 py-2 text-xs font-bold transform rotate-12 shadow-lg z-10 rounded-lg">
                  推荐
                </div>
                
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl text-black">{{ product.display_name }}</h3>
                    <span class="px-3 py-1 text-xs rounded-full font-medium"
                          :class="product.is_available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'">
                      {{ product.is_available ? '有库存' : '缺货' }}
                    </span>
                  </div>
                  
                  <!-- 会员商品详情 -->
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span class="text-gray-600">有效期:</span>
                      <span class="font-semibold text-gray-900">{{ product.days }} 天</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-[#7367f0]/10 rounded-lg">
                      <span class="text-gray-600">速度限制:</span>
                      <span class="font-semibold text-[#7367f0]">{{ product.speed >= 1024 ? '不限速' : product.speed + ' Mbps' }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span class="text-gray-600">赠送流量:</span>
                      <span class="font-semibold text-purple-600">{{ formatTraffic(product.traffic) }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div class="text-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span class="text-3xl font-bold text-[#7367f0]">¥{{ product.price }}</span>
                  </div>
                  <div class="relative group">
                    <button @click="purchaseProduct(product)" 
                            :disabled="!product.is_available || purchasing === product.id"
                            class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {{ purchasing === product.id ? '购买中...' : 
                         product.is_available ? '立即购买' : '缺货' }}
                    </button>
                    <!-- 余额不足提示 -->
                    <div v-if="userStore.userInfo.user_money < product.price && product.is_available" 
                         class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-10">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <span>余额不足 · 还需 ¥{{ (product.price - userStore.userInfo.user_money).toFixed(2) }}</span>
                      </div>
                      <!-- 小箭头 -->
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div class="border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 流量包商品 -->
          <div v-if="trafficProducts.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="(product, index) in trafficProducts" :key="product.id" 
                   class="bg-white rounded-xl border border-gray-200 p-6 h-fit shadow-sm hover:shadow-lg transition-all duration-300 relative animate-fade-in"
                   :style="{ animationDelay: `${index * 30}ms` }">
                
                <!-- 推荐标签 - 贴纸样式 -->
                <div v-if="product.display_name.includes('20G') || product.display_name.includes('20g')" 
                     class="absolute -top-2 -right-2 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] text-white px-4 py-2 text-xs font-bold transform rotate-12 shadow-lg z-10 rounded-lg">
                  推荐
                </div>
                
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl text-black">{{ product.display_name }}</h3>
                    <span class="px-3 py-1 text-xs rounded-full font-medium"
                          :class="product.is_available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'">
                      {{ product.is_available ? '有库存' : '缺货' }}
                    </span>
                  </div>
                  
                  <!-- 流量包详情 -->
                  <div class="space-y-3 text-sm">
                    <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span class="text-gray-600">流量大小:</span>
                      <span class="font-semibold text-green-600">{{ formatTraffic(product.traffic) }}</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span class="text-gray-600">有效期:</span>
                      <span class="font-semibold text-purple-600">永久有效</span>
                    </div>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div class="text-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <span class="text-3xl font-bold text-[#7367f0]">¥{{ product.price }}</span>
                  </div>
                  <div class="relative group">
                    <button @click="purchaseProduct(product)" 
                            :disabled="!product.is_available || purchasing === product.id"
                            class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {{ purchasing === product.id ? '购买中...' : 
                         product.is_available ? '立即购买' : '缺货' }}
                    </button>
                    <!-- 余额不足提示 -->
                    <div v-if="userStore.userInfo.user_money < product.price && product.is_available" 
                         class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-10">
                      <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                        </svg>
                        <span>余额不足 · 还需 ¥{{ (product.price - userStore.userInfo.user_money).toFixed(2) }}</span>
                      </div>
                      <!-- 小箭头 -->
                      <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div class="border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 无商品提示 -->
          <div v-if="memberProducts.length === 0 && trafficProducts.length === 0" class="text-center py-8">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-black mb-2">暂无商品</h3>
            <p class="text-black">商城暂时没有可购买的商品</p>
          </div>
        </div>

        <!-- 购买说明 -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-lg font-semibold text-black mb-4">购买说明</h2>
          <div class="space-y-3 text-sm text-black">
            <div class="flex items-start space-x-2">
              <span class="text-[#7367f0] font-bold">•</span>
              <span>会员套餐包含指定天数的会员权限、速度提升和赠送流量</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-[#7367f0] font-bold">•</span>
              <span>流量包购买后立即生效，永久有效</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-[#7367f0] font-bold">•</span>
              <span>会员权限到期后将自动降级为普通用户</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-[#7367f0] font-bold">•</span>
              <span>购买前请确保余额充足，购买后不可退款</span>
            </div>
            <div class="flex items-start space-x-2">
              <span class="text-[#7367f0] font-bold">•</span>
              <span>如有问题请联系客服：QQ群 572658815</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/user'
import { shopAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'
import { showSuccess, showError, showConfirm } from '../utils/modal'
import { logUserAction, updateLogStatus, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'

const router = useRouter()

// 状态管理
const loading = ref(true)
const products = ref([])
const purchasing = ref(null)

// 检查是否有缓存的商品数据
const cachedProducts = sessionStorage.getItem('shop_products')
if (cachedProducts) {
  try {
    products.value = JSON.parse(cachedProducts)
    loading.value = false
  } catch (e) {
    console.error('解析缓存商品数据失败:', e)
  }
}

// 分离会员商品和流量商品
const memberProducts = computed(() => {
  return products.value.filter(product => product.product_type === 'member')
})

const trafficProducts = computed(() => {
  return products.value.filter(product => product.product_type === 'traffic')
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

// 加载商品列表
const loadProducts = async () => {
  try {
    const response = await shopAPI.getShopList()
    if (response.code === 0) {
      products.value = response.data.products || []
      // 缓存商品数据到 sessionStorage，5分钟有效
      sessionStorage.setItem('shop_products', JSON.stringify(products.value))
      sessionStorage.setItem('shop_products_time', Date.now().toString())
    }
  } catch (error) {
    console.error('加载商品列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 购买商品
const purchaseProduct = async (product) => {
  // 检查余额是否充足
  if (userStore.userInfo.user_money < product.price) {
    // 余额不足，不记录日志，直接显示提示
    // 创建自定义弹窗 - Shadcn-ui 风格
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
    modal.innerHTML = `
      <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <!-- 标题栏 -->
        <div class="bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] px-6 py-4">
          <h3 class="text-xl font-bold text-white">购买详情</h3>
        </div>
        
        <!-- 内容区 -->
        <div class="p-6">
          <!-- 商品信息 -->
          <div class="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-10 h-10 bg-[#7367f0]/10 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">商品名称</p>
                <p class="font-semibold text-gray-900">${product.display_name}</p>
              </div>
            </div>
          </div>
          
          <!-- 余额详情 -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200">
              <span class="text-gray-600 font-medium">商品价格</span>
              <span class="text-xl font-bold text-[#7367f0]">¥${product.price}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200">
              <span class="text-gray-600 font-medium">当前余额</span>
              <span class="text-xl font-bold text-[#7367f0]">¥${userStore.userInfo.user_money}</span>
            </div>
            <div class="flex justify-between items-center p-4 bg-red-50 rounded-xl border-2 border-red-200">
              <span class="text-red-700">还需充值</span>
              <span class="text-xl text-red-600">¥${(product.price - userStore.userInfo.user_money).toFixed(2)}</span>
            </div>
          </div>
          
          <!-- 提示信息 -->
          <div class="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
            <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-amber-900">余额不足</p>
              <p class="text-sm text-amber-700 mt-1">请先充值后再购买商品</p>
            </div>
          </div>
          
          <!-- 按钮组 -->
          <div class="flex space-x-3">
            <button onclick="this.closest('.fixed').remove()" 
                    class="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium border-2 border-gray-200 transition-all duration-200">
              取消
            </button>
            <button data-action="recharge" 
                    class="flex-1 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30">
              去充值
            </button>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(modal)
    
    // 点击背景关闭弹窗
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
    
    // 去充值按钮点击事件
    modal.querySelector('[data-action="recharge"]').addEventListener('click', () => {
      modal.remove()
      router.push('/recharge')
    })
    
    // ESC键关闭弹窗
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        modal.remove()
        document.removeEventListener('keydown', handleEsc)
      }
    }
    document.addEventListener('keydown', handleEsc)
    
    return
  }
  
  // 使用确认弹窗
  showConfirm(
    `商品：${product.display_name}\n价格：¥${product.price}`,
    '确认购买',
    async () => {
      // 确认购买
      purchasing.value = product.id
      
      // 记录当前余额和用户组信息
      const currentBalance = userStore.userInfo.user_money
      const currentGroup = userStore.userInfo.user_group
      const currentTraffic = userStore.userInfo.users_traffic
      
      // 记录购买操作日志（购买中）
      const logId = await logUserAction(LOG_TYPES.PURCHASE, LOG_ACTIONS.PURCHASE_PRODUCT, 'pending', {
        productName: product.display_name,
        price: product.price,
        currentBalance,
        currentGroup,
        currentTraffic
      })
      
      try {
        const response = await shopAPI.purchaseProduct(userStore.tempKey, product.id)
        if (response.code === 0) {
          // 重新加载用户数据
          await userStore.loadUserData()
          
          // 更新日志为成功状态
          updateLogStatus(logId, 'success', {
            productName: response.data.product_name,
            remainingBalance: response.data.remaining_balance,
            newGroup: userStore.userInfo.user_group,
            newTraffic: userStore.userInfo.users_traffic
          })
          
          showSuccess(`购买成功！\n商品：${response.data.product_name}\n剩余余额：¥${response.data.remaining_balance}`, '购买成功')
          
          // 重新加载商品列表
          await loadProducts()
        } else {
          // 更新日志为失败状态
          updateLogStatus(logId, 'failed', {
            error: response.msg
          })
          
          showError(response.msg || '购买失败')
        }
      } catch (error) {
        // 更新日志为失败状态
        updateLogStatus(logId, 'failed', {
          error: error.message
        })
        
        showError('购买失败，请稍后重试')
      } finally {
        purchasing.value = null
      }
    }
  )
}

onMounted(() => {
  // 检查缓存是否过期（5分钟）
  const cacheTime = sessionStorage.getItem('shop_products_time')
  const now = Date.now()
  const cacheExpired = !cacheTime || (now - parseInt(cacheTime)) > 5 * 60 * 1000
  
  // 如果缓存过期或没有缓存，重新加载
  if (cacheExpired || products.value.length === 0) {
    loadProducts()
  }
})
</script>
