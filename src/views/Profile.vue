<template>
  <div class="min-h-screen bg-[#f8f7fa]">
    <DashboardLayout>
      <div class="space-y-6">
        <!-- 用户基本信息卡片 -->
        <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center space-x-6">
            <img :src="userStore.userInfo.users_faceimg || '/default-avatar.png'" 
                 :alt="userStore.userInfo.users_name"
                 class="w-20 h-20 rounded-full ring-4 ring-[#7367f0]/20 shadow-lg">
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-black">{{ userStore.userInfo.users_name || '未设置昵称' }}</h3>
              <div class="flex items-center flex-wrap gap-2 mt-2">
                <span class="px-3 py-1 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] text-white text-sm rounded-full font-medium">
                  {{ userStore.userInfo.user_group_name || '普通用户' }}
                </span>
                <span v-if="certificationStatus === 'verified'" 
                      class="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full font-medium flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  已实名
                </span>
                <span v-else 
                      class="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-full font-medium">
                  未实名
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
            <p class="text-sm text-gray-500 mb-3">剩余流量</p>
            <div class="flex items-center justify-between">
              <p class="text-2xl text-black">{{ formatTraffic(userStore.userInfo.users_traffic) }}</p>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <p class="text-sm text-gray-500 mb-3">节点速度</p>
            <div class="flex items-center justify-between">
              <p class="text-2xl text-black">{{ userStore.userInfo.node_speed >= 1024 ? '不限速' : userStore.userInfo.node_speed + ' Mbps' }}</p>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <p class="text-sm text-gray-500 mb-3">流量包数量</p>
            <div class="flex items-center justify-between">
              <p class="text-2xl text-black">{{ userStore.userInfo.traffic_packages?.length || 0 }} 个</p>
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
          <!-- 左列：账户信息和邮箱绑定 -->
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

            <!-- 邮箱绑定 -->
            <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 class="text-lg font-bold text-black mb-5 flex items-center">
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
              
              <div v-else class="space-y-4">
                <!-- 验证码已发送提示 -->
                <div v-if="emailCodeSent" class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div class="flex items-start space-x-3">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    <div class="flex-1">
                      <p class="text-sm text-blue-800 font-medium">验证码已发送</p>
                      <p class="text-xs text-blue-600 mt-1">验证码已发送到 {{ email }}，请查收邮件</p>
                    </div>
                  </div>
                </div>
                
                <!-- 邮箱输入框 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">邮箱地址</label>
                  <input v-model="email" 
                         type="email" 
                         placeholder="请输入邮箱地址（仅支持QQ邮箱或网易邮箱）"
                         :disabled="emailCodeSent"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
                </div>
                
                <!-- 验证码输入框 - 始终显示 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">验证码</label>
                  <div class="flex space-x-3">
                    <input v-model="verificationCode" 
                           type="text" 
                           placeholder="请输入6位验证码"
                           maxlength="6"
                           :disabled="!emailCodeSent"
                           class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <button @click="handleBindEmail" 
                            :disabled="bindLoading || !email || !email.trim() || emailCodeSent"
                            class="px-6 py-3 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all whitespace-nowrap">
                      {{ bindLoading ? '发送中...' : emailCodeSent ? '已发送' : '发送验证码' }}
                    </button>
                  </div>
                </div>
                
                <!-- 操作按钮 -->
                <div class="flex space-x-3 pt-2">
                  <button @click="handleVerifyCode" 
                          :disabled="verifyLoading || !verificationCode || verificationCode.length !== 6"
                          class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md">
                    {{ verifyLoading ? '验证中...' : '验证并绑定' }}
                  </button>
                  <button v-if="emailCodeSent" 
                          @click="cancelEmailBinding" 
                          class="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all">
                    重置
                  </button>
                </div>
                
                <!-- 提示信息 -->
                <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p class="text-xs text-gray-600 flex items-start space-x-2">
                    <svg class="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>仅支持QQ邮箱（@qq.com）或网易邮箱（@163.net、@126.net、@yeah.net）。同一用户10分钟内只能发送一次验证码</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- 实名认证 -->
            <div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 class="text-lg font-bold text-black mb-4 flex items-center">
                <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                实名认证
              </h2>

              <!-- 已认证状态 -->
              <div v-if="certificationStatus === 'verified'" class="space-y-4">
                <div class="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <div class="flex items-center justify-center mb-4">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="text-center">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">{{ certForm.certType === 'person' ? '个人实名认证' : '企业实名认证' }}</h3>
                    <p class="text-green-600 font-medium mb-3">已完成实名认证</p>
                    <div class="inline-flex items-center px-4 py-2 bg-white rounded-full border border-green-200">
                      <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-sm text-gray-700">认证时间: {{ certificationData.create_time || '未知' }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 认证中状态 -->
              <div v-else-if="certificationStatus === 'processing'" class="space-y-4">
                <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ certForm.certType === 'person' ? '个人认证' : '企业认证' }}进行中</p>
                      <p class="text-sm text-gray-600">{{ certificationMessage }}</p>
                    </div>
                  </div>
                  <!-- 二维码 -->
                  <div v-if="certificationData.scan_url" class="text-center p-4 bg-white rounded-lg">
                    <p class="text-sm text-gray-600 mb-3">请使用支付宝扫描二维码完成认证</p>
                    <img :src="generateQRCode(certificationData.scan_url)" alt="认证二维码" class="w-48 h-48 mx-auto">
                  </div>
                </div>
              </div>

              <!-- 未认证状态 - 显示表单 -->
              <div v-else class="space-y-3">
                <!-- 认证类型选择 -->
                <div>
                  <label class="block text-sm text-gray-600 mb-2">认证类型</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button 
                      @click="certForm.certType = 'person'"
                      :class="[
                        'px-4 py-3 rounded-lg font-medium transition-all',
                        certForm.certType === 'person' 
                          ? 'bg-[#7367f0] text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]">
                      个人认证
                    </button>
                    <button 
                      @click="certForm.certType = 'company'"
                      :class="[
                        'px-4 py-3 rounded-lg font-medium transition-all',
                        certForm.certType === 'company' 
                          ? 'bg-[#7367f0] text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]">
                      企业认证
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-sm text-gray-600 mb-2">
                    {{ certForm.certType === 'person' ? '真实姓名' : '企业名称' }}
                  </label>
                  <input v-model="certForm.realname" 
                         type="text" 
                         :placeholder="certForm.certType === 'person' ? '请输入真实姓名（中文）' : '请输入企业名称'"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-2">
                    {{ certForm.certType === 'person' ? '身份证号码' : '统一社会信用代码' }}
                  </label>
                  <input v-model="certForm.idcard" 
                         type="text" 
                         :placeholder="certForm.certType === 'person' ? '请输入身份证号码（15或18位）' : '请输入统一社会信用代码（18位）'"
                         :maxlength="certForm.certType === 'person' ? 18 : 18"
                         class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
                </div>
                <button @click="handleInitCertification" 
                        :disabled="certLoading"
                        class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {{ certLoading ? '提交中...' : '开始认证' }}
                </button>
                <div class="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p class="text-xs text-amber-800 flex items-start space-x-1">
                    <svg class="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <span>实名认证需要扣除1元认证费用，请确保账户余额充足</span>
                  </p>
                </div>
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
                 class="space-y-4">
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
import { ref, onMounted, onUnmounted } from 'vue'
import { userStore } from '../stores/user'
import { userAPI, certificationAPI } from '../api'
import DashboardLayout from '../components/DashboardLayout.vue'
import { showSuccess, showError, showWarning } from '../utils/modal'

// 邮箱绑定
const email = ref('')
const bindLoading = ref(false)
const emailCodeSent = ref(false)
const verificationCode = ref('')
const verifyLoading = ref(false)

// 实名认证
const certForm = ref({
  realname: '',
  idcard: '',
  certType: 'person' // person 或 company
})
const certLoading = ref(false)
const certificationStatus = ref('none') // none, processing, verified
const certificationData = ref({})
const certificationMessage = ref('')
let statusCheckInterval = null

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

// 绑定邮箱（发送验证码）
const handleBindEmail = async () => {
  // 检查邮箱是否为空
  if (!email.value || !email.value.trim()) {
    showWarning('请输入邮箱地址')
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
    const response = await userAPI.sendEmailCode(email.value.trim(), userStore.tempKey)
    if (response.code === 0) {
      emailCodeSent.value = true
      showSuccess('验证码已发送到邮箱，请查收（有效期10分钟）')
    } else {
      showError(response.msg || '发送验证码失败')
    }
  } catch (error) {
    console.error('发送验证码失败:', error)
    if (error.response && error.response.status === 404) {
      showError('邮箱验证接口暂未开放，请联系管理员')
    } else if (error.response && error.response.data && error.response.data.msg) {
      showError(error.response.data.msg)
    } else {
      showError('发送验证码失败，请稍后重试')
    }
  } finally {
    bindLoading.value = false
  }
}

// 验证邮箱验证码
const handleVerifyCode = async () => {
  if (!verificationCode.value || verificationCode.value.length !== 6) {
    showWarning('请输入6位验证码')
    return
  }
  
  verifyLoading.value = true
  try {
    const response = await userAPI.verifyEmailCode(
      verificationCode.value,
      userStore.userInfo.id,
      userStore.userInfo.users_uid
    )
    
    if (response.code === 0) {
      showSuccess('邮箱绑定成功')
      // 重置状态
      email.value = ''
      verificationCode.value = ''
      emailCodeSent.value = false
      // 重新加载用户数据
      await userStore.loadUserData()
    } else {
      showError(response.msg || '验证码错误')
    }
  } catch (error) {
    console.error('验证失败:', error)
    showError('验证失败，请检查验证码是否正确')
  } finally {
    verifyLoading.value = false
  }
}

// 取消邮箱绑定
const cancelEmailBinding = () => {
  email.value = ''
  verificationCode.value = ''
  emailCodeSent.value = false
}

// 生成二维码（使用第三方API）
const generateQRCode = (url) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
}

// 初始化实名认证
const handleInitCertification = async () => {
  if (!certForm.value.realname || !certForm.value.idcard) {
    showWarning('请填写完整的认证信息')
    return
  }
  
  // 验证格式
  if (certForm.value.certType === 'person') {
    // 验证身份证格式
    const idcardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$|^[1-9]\d{7}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/
    if (!idcardRegex.test(certForm.value.idcard)) {
      showWarning('请输入正确的身份证号码')
      return
    }
  } else {
    // 验证统一社会信用代码格式（18位）
    const creditCodeRegex = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
    if (!creditCodeRegex.test(certForm.value.idcard)) {
      showWarning('请输入正确的统一社会信用代码')
      return
    }
  }
  
  certLoading.value = true
  try {
    const response = await certificationAPI.initCertification(
      userStore.tempKey,
      certForm.value.realname,
      certForm.value.idcard,
      certForm.value.certType
    )
    
    if (response.code === 0) {
      // 检查是否已经认证过
      if (response.msg && response.msg.includes('已通过实名认证')) {
        certificationStatus.value = 'verified'
        certificationData.value = {
          real_name: certForm.value.realname,
          id_card_no_masked: certForm.value.idcard.replace(/^(.{6})(?:\d+)(.{4})$/, '$1********$2')
        }
        showSuccess('您已完成实名认证')
        // 重新加载用户数据
        await userStore.loadUserData()
      } else if (response.data && response.data.certify_id) {
        // 新的认证流程
        certificationData.value = response.data
        certificationStatus.value = 'processing'
        certificationMessage.value = '请扫描二维码完成认证'
        
        // 开始轮询认证状态
        startStatusCheck(response.data.certify_id)
        
        showSuccess('认证初始化成功，请扫描二维码完成认证')
      }
    } else if (response.code === -7) {
      showError('账户余额不足，认证需要1元费用')
    } else if (response.code === -4) {
      showError(certForm.value.certType === 'person' ? '身份证格式错误，请检查后重试' : '统一社会信用代码格式错误，请检查后重试')
    } else {
      showError(response.msg || '认证初始化失败')
    }
  } catch (error) {
    console.error('认证初始化失败:', error)
    showError('认证初始化失败，请稍后重试')
  } finally {
    certLoading.value = false
  }
}

// 开始轮询认证状态
const startStatusCheck = (certifyId) => {
  // 清除之前的轮询
  if (statusCheckInterval) {
    clearInterval(statusCheckInterval)
  }
  
  // 每5秒查询一次
  statusCheckInterval = setInterval(async () => {
    try {
      const response = await certificationAPI.queryCertificationStatus(
        userStore.tempKey,
        certifyId
      )
      
      if (response.code === 0) {
        // 认证成功
        certificationStatus.value = 'verified'
        certificationData.value = response.data
        clearInterval(statusCheckInterval)
        showSuccess('实名认证成功')
        // 重新加载用户数据
        await userStore.loadUserData()
      } else if (response.code === 1) {
        // 处理中
        certificationMessage.value = response.msg || '认证进行中，请耐心等待'
      } else if (response.code === -5) {
        // 认证失败
        certificationStatus.value = 'none'
        clearInterval(statusCheckInterval)
        showError(response.msg || '认证失败')
      }
    } catch (error) {
      console.error('查询认证状态失败:', error)
    }
  }, 5000)
}

// 检查用户是否已认证
const checkCertificationStatus = async () => {
  try {
    // 调用获取认证信息接口
    const response = await certificationAPI.getCertificationInfo(userStore.tempKey)
    
    console.log('获取认证信息响应:', response)
    
    if (response.code === 0 && response.data) {
      const certInfo = response.data
      
      console.log('认证信息:', certInfo)
      console.log('认证信息的所有字段:', Object.keys(certInfo))
      console.log('real_name 值:', certInfo.real_name)
      console.log('id_card_no_masked 值:', certInfo.id_card_no_masked)
      console.log('is_certified:', certInfo.is_certified)
      console.log('real_name_status:', certInfo.real_name_status)
      
      // 检查是否已认证
      if (certInfo.is_certified && certInfo.real_name_status === 'true') {
        certificationStatus.value = 'verified'
        certForm.value.certType = certInfo.cert_type || 'person'
        // API 没有返回 real_name 和 id_card_no_masked，使用 username 和通用信息
        certificationData.value = {
          real_name: certInfo.username || userStore.userInfo.users_name || '已认证用户',
          id_card_no_masked: '已通过实名认证',
          certify_id: certInfo.certify_id,
          create_time: certInfo.create_time
        }
        console.log('已认证，保存的数据:', {
          real_name: certificationData.value.real_name,
          id_card_no_masked: certificationData.value.id_card_no_masked,
          certType: certForm.value.certType
        })
        console.log('脱敏后的姓名:', maskName(certificationData.value.real_name))
        console.log('脱敏后的身份证:', maskIdCard(certificationData.value.id_card_no_masked))
      } else if (certInfo.certify_id && certInfo.cert_status === 0) {
        // 有认证记录但还在处理中
        certificationStatus.value = 'processing'
        certForm.value.certType = certInfo.cert_type || 'person'
        certificationData.value = {
          certify_id: certInfo.certify_id
        }
        certificationMessage.value = '认证进行中，请耐心等待'
        // 开始轮询认证状态
        startStatusCheck(certInfo.certify_id)
      } else {
        // 未认证
        certificationStatus.value = 'none'
        console.log('未认证')
      }
    }
  } catch (error) {
    console.error('获取认证信息失败:', error)
    // 如果接口失败，尝试从用户信息判断
    if (userStore.userInfo.real_name === 'true' || userStore.userInfo.real_name === true) {
      certificationStatus.value = 'verified'
      certificationData.value = {
        real_name: userStore.userInfo.users_name || '未知',
        id_card_no_masked: '已认证'
      }
    }
  }
}

onMounted(() => {
  checkCertificationStatus()
})

onUnmounted(() => {
  // 清除轮询
  if (statusCheckInterval) {
    clearInterval(statusCheckInterval)
  }
})
</script>
