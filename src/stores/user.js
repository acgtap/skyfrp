import { reactive } from 'vue'
import { userAPI } from '../api'
import { logUserAction, LOG_TYPES, LOG_ACTIONS } from '../utils/logger'

// 用户状态管理
export const userStore = reactive({
  // 用户基本信息
  isAuthenticated: false,
  usersId: null,
  tempKey: null,
  userInfo: {
    id: null,
    users_uid: '',
    users_name: '',
    users_email: '',
    users_faceimg: '',
    user_group: '',
    user_group_name: '',
    user_money: 0,
    users_traffic: 0,
    node_speed: 0,
    register_time: '',
    recent_login: '',
    temp_key_time: '',
    opening_time: '',
    end_time: '',
    traffic_packages: []
  },
  
  // 初始化用户状态
  init() {
    const tempKey = localStorage.getItem('temp_key')
    const usersId = localStorage.getItem('users_id')
    
    if (tempKey && usersId) {
      this.tempKey = tempKey
      this.usersId = usersId
      this.isAuthenticated = true
      this.loadUserData()
    }
  },
  
  // 登录（通过QQ登录回调获取用户信息）
  async login(usersId, tempKey) {
    this.usersId = usersId
    this.tempKey = tempKey
    this.isAuthenticated = true
    
    localStorage.setItem('users_id', usersId)
    localStorage.setItem('temp_key', tempKey)
    
    await this.loadUserData()
    
    // 记录登录日志
    await logUserAction(LOG_TYPES.LOGIN, LOG_ACTIONS.LOGIN_SUCCESS, 'success', {
      usersId,
      userName: this.userInfo.users_name
    })
  },
  
  // 登出
  async logout() {
    // 记录登出日志
    await logUserAction(LOG_TYPES.LOGIN, LOG_ACTIONS.LOGOUT, 'success', {
      usersId: this.usersId,
      userName: this.userInfo.users_name
    })
    
    this.isAuthenticated = false
    this.usersId = null
    this.tempKey = null
    this.userInfo = {
      id: null,
      users_uid: '',
      users_name: '',
      users_email: '',
      users_faceimg: '',
      user_group: '',
      user_group_name: '',
      user_money: 0,
      users_traffic: 0,
      node_speed: 0,
      register_time: '',
      recent_login: '',
      temp_key_time: '',
      opening_time: '',
      end_time: '',
      traffic_packages: []
    }
    
    localStorage.removeItem('users_id')
    localStorage.removeItem('temp_key')
  },
  
  // 加载用户数据
  async loadUserData() {
    if (!this.tempKey) {
      console.error('loadUserData: tempKey为空')
      return
    }
    
    console.log('开始加载用户数据, tempKey:', this.tempKey)
    
    try {
      const response = await userAPI.getUserAllData(this.tempKey)
      console.log('获取用户数据响应:', response)
      
      if (response.code === 0) {
        this.userInfo = { ...this.userInfo, ...response.data }
        console.log('用户数据更新成功:', this.userInfo)
      } else {
        console.error('获取用户数据失败:', response.msg)
        throw new Error(response.msg || '获取用户数据失败')
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
      throw error
    }
  },
  
  // 用户签到
  async signIn() {
    if (!this.tempKey) return
    
    try {
      const response = await userAPI.userSignIn(this.tempKey)
      if (response.code === 0) {
        // 签到成功后重新加载用户数据
        await this.loadUserData()
        
        // 记录签到日志
        await logUserAction(LOG_TYPES.SIGNIN, LOG_ACTIONS.SIGNIN, 'success', {
          reward: response.data?.reward,
          continuousDays: response.data?.continuous_days
        })
        
        return response
      }
      return response
    } catch (error) {
      console.error('签到失败:', error)
      
      // 记录签到失败日志
      await logUserAction(LOG_TYPES.SIGNIN, LOG_ACTIONS.SIGNIN, 'failed', {
        error: error.message
      })
      
      throw error
    }
  },
  
  // 卡密兑换
  async redeemCard(kamiData) {
    if (!this.usersId) return
    
    try {
      const response = await userAPI.redeemCard(this.usersId, kamiData)
      if (response.code === 0) {
        // 兑换成功后重新加载用户数据
        await this.loadUserData()
        
        // 记录卡密兑换日志
        await logUserAction(LOG_TYPES.PAYMENT, LOG_ACTIONS.REDEEM_CARD, 'success', {
          kamiData: kamiData.substring(0, 8) + '***' // 只记录部分卡密
        })
      }
      return response
    } catch (error) {
      console.error('卡密兑换失败:', error)
      
      // 记录兑换失败日志
      await logUserAction(LOG_TYPES.PAYMENT, LOG_ACTIONS.REDEEM_CARD, 'failed', {
        error: error.message
      })
      
      throw error
    }
  },
  
  // 绑定邮箱
  async bindEmail(email) {
    if (!this.tempKey) return
    
    try {
      const response = await userAPI.bindEmail(this.tempKey, email)
      if (response.code === 0) {
        // 绑定成功后重新加载用户数据
        await this.loadUserData()
      }
      return response
    } catch (error) {
      console.error('邮箱绑定失败:', error)
      throw error
    }
  }
})

// 初始化用户状态
userStore.init()