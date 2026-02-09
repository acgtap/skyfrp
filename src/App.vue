<template>
  <div id="app-container">
    <router-view v-slot="{ Component, route }">
      <transition 
        :name="route.meta.requiresAuth ? '' : 'page-fade'" 
        mode="out-in"
        @after-enter="onAfterEnter"
      >
        <component :is="Component" :key="route.matched[0]?.path || route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { userStore } from './stores/user'
import NProgress from 'nprogress'

NProgress.configure({ 
  showSpinner: false,
  speed: 200,
  minimum: 0.08,
  trickleSpeed: 100
})

const onAfterEnter = () => {
  NProgress.done()
}

onMounted(() => {
  userStore.init()
})
</script>
