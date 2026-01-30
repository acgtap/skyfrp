<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <DashboardLayout>
      <div class="space-y-6">
        <!-- 页面标题 -->
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-black">余额充值</h1>
            <p class="text-black mt-1">为您的账户充值，享受更多服务</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-black">当前余额</p>
            <p class="text-xl font-bold text-[#7367f0]">¥{{ userStore.userInfo.user_money }}</p>
          </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-fit">
          <!-- 左侧：余额充值 -->
          <div class="space-y-6">
            <!-- 充值金额选择 -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 h-fit">
              <h3 class="text-lg font-bold text-black mb-4">选择充值金额</h3>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                <button v-for="amount in presetAmounts" :key="amount"
                        @click="selectedAmount = amount"
                        class="p-3 border-2 rounded-lg text-center transition-all duration-200 hover:shadow-md"
                        :class="selectedAmount === amount ? 'border-[#7367f0] bg-[#7367f0]/5 text-[#7367f0]' : 'border-gray-200 hover:border-[#7367f0]/50'">
                  <div class="text-lg font-bold">¥{{ amount }}</div>
                </button>
              </div>
              
              <!-- 自定义金额 -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-black mb-2">自定义金额</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                  <input v-model.number="customAmount" 
                         type="number" 
                         min="1"
                         step="0.01"
                         placeholder="输入充值金额"
                         class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent"
                         @input="selectedAmount = customAmount">
                </div>
              </div>
              
              <!-- 支付方式 -->
              <div class="mb-6">
                <h4 class="text-sm font-medium text-black mb-3">选择支付方式</h4>
                <div class="grid grid-cols-1 gap-3">
                  <button @click="paymentMethod = 'wxpay'"
                          class="flex items-center p-3 border-2 rounded-lg transition-all duration-200"
                          :class="paymentMethod === 'wxpay' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'">
                    <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.5 12.5c0 .5-.4.9-.9.9s-.9-.4-.9-.9.4-.9.9-.9.9.4.9.9zm8.9-.9c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zm-4.5-6.5c-5.5 0-10 3.6-10 8s4.5 8 10 8c1.3 0 2.5-.2 3.6-.6l3.4 1.6v-3.2c1.2-1.4 2-3.1 2-5.8 0-4.4-4.5-8-10-8z"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="font-medium text-black">微信支付</div>
                      <div class="text-xs text-gray-600">安全便捷的移动支付</div>
                    </div>
                  </button>
                  
                  <button @click="paymentMethod = 'alipay'"
                          class="flex items-center p-3 border-2 rounded-lg transition-all duration-200"
                          :class="paymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'">
                    <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                      <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div class="text-left">
                      <div class="font-medium text-black">支付宝</div>
                      <div class="text-xs text-gray-600">快速安全的在线支付</div>
                    </div>
                  </button>
                </div>
              </div>
              
              <!-- 充值按钮 -->
              <div class="relative group">
                <button @click="handleRecharge"
                        :disabled="rechargeLoading"
                        class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {{ rechargeLoading ? '处理中...' : `充值 ¥${selectedAmount || 0}` }}
                </button>
                <!-- 未输入金额提示 -->
                <div v-if="!selectedAmount" 
                     class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-10">
                  <div class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span>请输入充值金额</span>
                  </div>
                  <!-- 小箭头 -->
                  <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div class="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧：卡密兑换和充值说明 -->
          <div class="space-y-6">
            <!-- 卡密兑换 -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 h-fit">
              <h3 class="text-lg font-bold text-black mb-4">卡密兑换</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-black mb-2">卡密</label>
                  <input v-model="kamiData" 
                         type="text" 
                         placeholder="请输入卡密"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent">
                </div>
                
                <div class="relative group">
                  <button @click="handleRedeemCard"
                          :disabled="redeemLoading"
                          class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {{ redeemLoading ? '兑换中...' : '兑换卡密' }}
                  </button>
                  <!-- 未输入卡密提示 -->
                  <div v-if="!kamiData" 
                       class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-10">
                    <div class="flex items-center space-x-2">
                      <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                      </svg>
                      <span>请输入兑换卡密</span>
                    </div>
                    <!-- 小箭头 -->
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div class="border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 充值说明 -->
            <div class="bg-white rounded-lg border border-gray-200 p-6 h-fit">
              <h4 class="text-xl font-bold text-black mb-5">充值说明</h4>
              <div class="space-y-4 text-base text-black">
                <div class="flex items-start space-x-3">
                  <span class="text-[#7367f0] font-bold text-lg">•</span>
                  <span class="leading-relaxed">充值金额将实时到账，可用于购买会员、流量包等服务</span>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-[#7367f0] font-bold text-lg">•</span>
                  <span class="leading-relaxed">支持微信支付和支付宝，安全可靠</span>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-[#7367f0] font-bold text-lg">•</span>
                  <span class="leading-relaxed">支持会员卡密、余额卡密、流量卡密兑换</span>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-[#7367f0] font-bold text-lg">•</span>
                  <span class="leading-relaxed">充值过程中如遇问题，请联系客服</span>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="text-[#7367f0] font-bold text-lg">•</span>
                  <span class="leading-relaxed">客服QQ群：572658815</span>
                </div>
              </div>
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
import DashboardLayout from '../components/DashboardLayout.vue'
import { showWarning, showSuccess, showError, showInfo } from '../utils/modal'
import { logUserAction, updateLogStatus, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'

// 预设充值金额
const presetAmounts = [10, 20, 50, 100, 200, 500]

// 表单数据
const selectedAmount = ref(null)
const customAmount = ref(null)
const paymentMethod = ref('')
const rechargeLoading = ref(false)
const kamiData = ref('')
const redeemLoading = ref(false)

// 处理充值
const handleRecharge = async () => {
  if (!selectedAmount.value) {
    return
  }
  
  // 如果没有选择支付方式，默认使用微信支付
  if (!paymentMethod.value) {
    paymentMethod.value = 'wxpay'
  }
  
  if (selectedAmount.value < 1) {
    showWarning('充值金额不能少于1元')
    
    // 记录充值失败日志（金额不足）
    await logUserAction(LOG_TYPES.PAYMENT, LOG_ACTIONS.RECHARGE, 'failed', {
      amount: selectedAmount.value,
      paymentMethod: paymentMethod.value,
      reason: '充值金额不能少于1元'
    })
    
    return
  }
  
  rechargeLoading.value = true
  
  try {
    // 生成订单号
    const outTradeNo = Date.now().toString()
    
    // 记录当前余额
    const currentBalance = userStore.userInfo.user_money
    
    // 记录充值操作日志（充值中）
    const logId = await logUserAction(LOG_TYPES.PAYMENT, LOG_ACTIONS.RECHARGE, 'pending', {
      amount: selectedAmount.value,
      paymentMethod: paymentMethod.value === 'wxpay' ? '微信支付' : '支付宝',
      orderNo: outTradeNo,
      currentBalance
    })
    
    // 生成支付链接
    const paymentUrl = `http://msk.cnwbhw.com/service/pay/mfzz/epayapi.php?type=${paymentMethod.value}&money=${selectedAmount.value}&name=${userStore.usersId}&out_trade_no=${outTradeNo}`
    
    // 跳转到支付页面
    window.open(paymentUrl, '_blank')
    
    // 提示用户
    showInfo('已打开支付页面，请完成支付。\n支付成功后余额将自动到账。', '支付提示')
    
    // 启动余额检查任务（每10秒检查一次，持续10分钟）
    let checkCount = 0
    const maxChecks = 60 // 10分钟 = 600秒 / 10秒
    
    const checkInterval = setInterval(async () => {
      checkCount++
      
      try {
        // 重新加载用户数据
        await userStore.loadUserData()
        
        // 检查余额是否增加
        if (userStore.userInfo.user_money > currentBalance) {
          // 充值成功
          clearInterval(checkInterval)
          updateLogStatus(logId, 'success', {
            newBalance: userStore.userInfo.user_money,
            actualAmount: userStore.userInfo.user_money - currentBalance
          })
          console.log('充值成功，余额已到账')
        } else if (checkCount >= maxChecks) {
          // 超时，标记为失败
          clearInterval(checkInterval)
          updateLogStatus(logId, 'failed', {
            reason: '支付超时（10分钟内未到账）'
          })
          console.log('充值超时，可能未完成支付')
        }
      } catch (error) {
        console.error('检查余额失败:', error)
      }
    }, 10000) // 每10秒检查一次
    
  } catch (error) {
    console.error('充值失败:', error)
    
    // 记录充值失败日志
    await logUserAction(LOG_TYPES.PAYMENT, LOG_ACTIONS.RECHARGE, 'failed', {
      amount: selectedAmount.value,
      paymentMethod: paymentMethod.value === 'wxpay' ? '微信支付' : '支付宝',
      error: error.message
    })
    
    showError('充值失败，请稍后重试')
  } finally {
    rechargeLoading.value = false
  }
}

// 处理卡密兑换
const handleRedeemCard = async () => {
  if (!kamiData.value || !kamiData.value.trim()) {
    return
  }
  
  redeemLoading.value = true
  
  try {
    const response = await userStore.redeemCard(kamiData.value.trim())
    
    if (response.code === 0) {
      showSuccess('卡密兑换成功！')
      kamiData.value = ''
    } else {
      showError(response.msg || '卡密兑换失败')
    }
  } catch (error) {
    console.error('卡密兑换失败:', error)
    showError('卡密兑换失败，请稍后重试')
  } finally {
    redeemLoading.value = false
  }
}
</script>