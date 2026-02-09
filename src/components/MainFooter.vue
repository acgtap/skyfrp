<template>
  <footer class="bg-white border-t border-gray-200 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <!-- Logo & Slogan -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-[#7367f0] rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="ml-2 text-xl font-bold text-black">SkyFRP</span>
          </div>
          <p class="text-gray-500 mb-6 max-w-sm">免费、高速、稳定的内网穿透服务</p>
          <div class="flex space-x-4">
            <!-- Github Icon -->
            <a href="#" class="text-gray-400 hover:text-[#7367f0] transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <!-- QQ Icon -->
             <a href="#" class="text-gray-400 hover:text-[#7367f0] transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.003 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18.333c-4.603 0-8.333-3.73-8.333-8.333S7.4 3.667 12.003 3.667c4.603 0 8.333 3.73 8.333 8.333s-3.73 8.333-8.333 8.333zm-1.667-5.833h3.334c.46 0 .833.373.833.833v.834c0 .46-.373.833-.833.833h-3.334c-.46 0-.833-.373-.833-.833v-.834c0-.46.373-.833.833-.833zm0-5h3.334c.46 0 .833.373.833.833v2.5c0 .46-.373.833-.833.833h-3.334c-.46 0-.833-.373-.833-.833v-2.5c0-.46.373-.833.833-.833z"/></svg>
            </a>
          </div>
        </div>
        
        <!-- 法律 -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">法律</h3>
          <ul class="space-y-3 text-sm text-gray-500">
             <li><router-link to="/privacy" class="hover:text-[#7367f0] transition-colors">隐私政策</router-link></li>
             <li><router-link to="/terms" class="hover:text-[#7367f0] transition-colors">服务条款</router-link></li>
             <li><router-link to="/disclaimer" class="hover:text-[#7367f0] transition-colors">免责声明</router-link></li>
          </ul>
        </div>

        <!-- 联系我们 -->
        <div>
          <h3 class="font-bold text-gray-900 mb-4">联系我们</h3>
          <ul class="space-y-3 text-sm text-gray-500">
             <li><a href="/#help" class="hover:text-[#7367f0] transition-colors">帮助中心</a></li>
             <li><a href="mailto:support@skyfrp.com" class="hover:text-[#7367f0] transition-colors">邮件帮助</a></li>
             <li><a href="#" class="hover:text-[#7367f0] transition-colors">违规举报</a></li>
          </ul>
        </div>
      </div>
      
      <!-- Copyright -->
      <div class="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <div class="flex flex-col md:flex-row md:items-center gap-2 mb-4 md:mb-0 text-center md:text-left">
           <span>&copy; 2025 Kato团队. All rights reserved.</span>
           <span class="hidden md:inline">|</span>
           <span>杜绝违法内容，请遵循法律法规和政府要求合规使用SkyFRP。</span>
        </div>
        <div class="flex items-center space-x-4">
           <span class="flex items-center">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
              ICP备xxxxxxxx号
           </span>
           <span class="flex items-center">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></span>
              公安网备xxxxxxxx号
           </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component logic if needed
</script>
