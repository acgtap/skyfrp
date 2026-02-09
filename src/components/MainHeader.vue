<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center cursor-pointer">
          <div class="flex-shrink-0 flex items-center">
            <div class="w-8 h-8 bg-[#7367f0] rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">S</span>
            </div>
            <span class="ml-2 text-xl font-bold text-black">SkyFRP</span>
          </div>
        </router-link>
        
        <!-- 导航菜单 -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a href="#home" @click.prevent="scrollToSection('home')" 
               class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
              首页
            </a>
            <a href="#features" @click.prevent="scrollToSection('features')" 
               class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
              介绍
            </a>
            <a href="#pricing" @click.prevent="scrollToSection('pricing')" 
               class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
              定价
            </a>
            <a href="#about" @click.prevent="scrollToSection('about')" 
               class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
              关于
            </a>
            <a href="#help" @click.prevent="scrollToSection('help')" 
               class="text-black hover:text-[#7367f0] px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer">
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
          <a href="#home" @click.prevent="scrollToSection('home')" 
             class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
            首页
          </a>
          <a href="#features" @click.prevent="scrollToSection('features')" 
             class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
            介绍
          </a>
          <a href="#pricing" @click.prevent="scrollToSection('pricing')" 
             class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
            定价
          </a>
          <a href="#about" @click.prevent="scrollToSection('about')" 
             class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
            关于
          </a>
          <a href="#help" @click.prevent="scrollToSection('help')" 
             class="text-black hover:text-[#7367f0] block px-3 py-2 rounded-md text-base font-medium">
            帮助文档
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const scrollToSection = async (sectionId) => {
  if (route.path !== '/') {
    await router.push('/')
    // 等待路由跳转完成
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  } else {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  mobileMenuOpen.value = false
}
</script>
