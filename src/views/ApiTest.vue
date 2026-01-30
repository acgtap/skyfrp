<template>
  <div class="min-h-screen bg-[#f8f7fa] p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">API测试页面</h1>
      
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">测试获取用户数据API</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">临时密钥 (temp_key):</label>
            <input v-model="tempKey" 
                   type="text" 
                   placeholder="请输入临时密钥"
                   class="w-full px-3 py-2 border border-gray-300 rounded-md">
          </div>
          
          <button @click="testGetUserData" 
                  :disabled="!tempKey || loading"
                  class="bg-[#7367f0] hover:bg-[#5f5bd8] disabled:bg-gray-400 text-white px-4 py-2 rounded-md">
            {{ loading ? '请求中...' : '测试获取用户数据' }}
          </button>
        </div>
      </div>
      
      <div v-if="result" class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold mb-4">API响应结果:</h3>
        <pre class="bg-gray-100 p-4 rounded-md overflow-auto text-sm">{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
      
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
        <h3 class="text-red-800 font-semibold mb-2">错误信息:</h3>
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userAPI } from '../api'

const tempKey = ref('zHFIDoPTUoLlsnAswqe6QDEetPl')
const loading = ref(false)
const result = ref(null)
const error = ref('')

const testGetUserData = async () => {
  if (!tempKey.value.trim()) {
    error.value = '请输入临时密钥'
    return
  }
  
  loading.value = true
  result.value = null
  error.value = ''
  
  try {
    console.log('测试API调用，tempKey:', tempKey.value)
    const response = await userAPI.getUserAllData(tempKey.value.trim())
    console.log('API响应:', response)
    result.value = response
  } catch (err) {
    console.error('API调用失败:', err)
    error.value = err.message || '请求失败'
    if (err.response) {
      error.value += ` (状态码: ${err.response.status})`
    }
  } finally {
    loading.value = false
  }
}
</script>