<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { userStore } from './stores/user'

onMounted(() => {
  // 初始化用户状态
  userStore.init()
})
</script>
