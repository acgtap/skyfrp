<template>
  <button 
    class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 shadow-md hover:shadow-lg"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineEmits(['click'])
</script>
