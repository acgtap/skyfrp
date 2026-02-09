<template>
  <div>
    <div class="space-y-8">
      <!-- 页面标题 -->
      <div>
        <h1 class="text-2xl font-bold text-gray-900">软件下载</h1>
        <p class="text-gray-600 mt-1">下载FRP客户端和相关工具</p>
      </div>

      <!-- FRP客户端下载 -->
      <div class="bg-white rounded-lg border border-gray-200 p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">FRP客户端</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Windows -->
          <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Windows</h3>
            <p class="text-sm text-gray-600 mb-4">适用于 Windows 7/8/10/11</p>
            <a href="https://msk.cnwbhw.com/download.php?pc=win" 
               target="_blank"
               class="block w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              立即下载
            </a>
          </div>

          <!-- macOS -->
          <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">macOS</h3>
            <p class="text-sm text-gray-600 mb-4">适用于 macOS 10.12+</p>
            <button class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
              即将推出
            </button>
          </div>

          <!-- Linux -->
          <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 01-.088.094c-.188.159-.404.222-.618.138-.418-.16-.749-.622-.813-1.206-.07-.621.03-1.32.442-1.449.197-.06.396-.06.597-.06h.006zm2.966 7.28c-.203.245-.438.316-.719.316-.535 0-.840-.383-.840-.9 0-.743.699-1.148 1.109-.461.075.126.096.25.096.9 0-.06-.109-.316-.109-.316-.203-.245-.438-.316-.719-.316-.535 0-.840-.383-.840-.9 0-.743.699-1.148 1.109-.461.075.126.096.25.096.9 0-.06-.109-.316-.109-.316z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Linux</h3>
            <p class="text-sm text-gray-600 mb-4">适用于各种 Linux 发行版</p>
            <button class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
              即将推出
            </button>
          </div>
        </div>
      </div>

      <!-- 移动端应用 -->
      <div class="bg-white rounded-lg border border-gray-200 p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">移动端应用</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Android -->
          <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1518-.5972.416.416 0 00-.5972.1518l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1333 1.0989L4.8442 5.4467a.4161.4161 0 00-.5972-.1518.416.416 0 00-.1518.5972L6.0927 9.321C3.4180 10.7725 1.6667 13.2869 1.6667 16.1667 1.6667 16.1667 22.3333 16.1667 22.3333 16.1667 22.3333 13.2869 20.5820 10.7725 17.9073 9.321"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Android</h3>
            <p class="text-sm text-gray-600 mb-4">适用于 Android 5.0+</p>
            <button class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              下载 APK
            </button>
          </div>

          <!-- iOS -->
          <div class="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">iOS</h3>
            <p class="text-sm text-gray-600 mb-4">适用于 iOS 12.0+</p>
            <button class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg text-sm font-medium cursor-not-allowed">
              即将推出
            </button>
          </div>
        </div>
      </div>

      <!-- 使用教程 -->
      <div class="bg-white rounded-lg border border-gray-200 p-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">使用教程</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">快速入门</h3>
            <p class="text-sm text-gray-600 mb-4">从零开始学习如何使用SkyFRP</p>
            <button @click="goToHelp('quick-start')" class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              查看教程
            </button>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">配置指南</h3>
            <p class="text-sm text-gray-600 mb-4">详细的配置文件说明和示例</p>
            <button @click="goToHelp('tunnel-config')" class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              查看指南
            </button>
          </div>
          
          <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">常见问题</h3>
            <p class="text-sm text-gray-600 mb-4">解决使用过程中的常见问题</p>
            <button @click="goToHelp('faq')" class="w-full bg-[#7367f0] hover:bg-[#5f5bd8] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              查看FAQ
            </button>
          </div>
        </div>
      </div>

      <!-- 下载说明 -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 class="text-lg font-semibold text-blue-900 mb-4">下载说明</h4>
        <div class="space-y-3 text-sm text-blue-800">
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">•</span>
            <span>所有软件均为官方版本，安全可靠</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">•</span>
            <span>建议下载最新版本以获得最佳体验</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">•</span>
            <span>如遇下载问题，请联系客服QQ群：572658815</span>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-[#7367f0] font-bold">•</span>
            <span>使用前请先阅读相关教程和文档</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 跳转到帮助文档的指定章节
const goToHelp = (sectionId) => {
  router.push({
    path: '/help',
    hash: `#${sectionId}`
  })
}
</script>