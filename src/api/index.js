import axios from 'axios'

// 根据环境判断baseURL
const getBaseURL = () => {
  // 开发环境使用相对路径（通过Vite代理）
  if (import.meta.env.DEV) {
    return ''
  }
  // 生产环境直接使用后端API地址
  return 'https://mskapi.cnwbhw.com'
}

// 创建axios实例
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    console.log('API请求配置:', config)
    
    // 如果是POST请求且数据是对象，转换为URLSearchParams（form-data格式）
    if (config.method === 'post' && config.data && typeof config.data === 'object') {
      const params = new URLSearchParams()
      Object.keys(config.data).forEach(key => {
        params.append(key, config.data[key])
      })
      config.data = params
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    console.log('API响应:', response)
    return response.data
  },
  error => {
    console.error('API请求错误:', error)
    if (error.response) {
      console.error('错误响应数据:', error.response.data)
      console.error('错误状态码:', error.response.status)
    }
    return Promise.reject(error)
  }
)

// QQ登录相关API
export const authAPI = {
  // 获取QQ登录URL
  getQQLoginUrl: (redirectUri = null) => {
    console.log('调用获取QQ登录URL接口, redirectUri:', redirectUri)
    if (redirectUri) {
      // 尝试传递redirect_uri参数
      return api.get('/api/qq_login_url', {
        params: { redirect_uri: redirectUri }
      })
    } else {
      return api.get('/api/qq_login_url')
    }
  }
}

// 用户相关API
export const userAPI = {
  // 获取用户所有数据
  getUserAllData: (userTempKey) => {
    return api.post('/api/get_users_all_data', {
      user_temp_key: userTempKey
    })
  },
  
  // 用户签到
  userSignIn: (userTempKey) => {
    return api.post('/api/users_sign_in', {
      user_temp_key: userTempKey
    })
  },
  
  // 卡密兑换
  redeemCard: (usersId, kamiData) => {
    return api.post('/api/wyzz_kami_key', {
      users_id: usersId,
      kami_data: kamiData
    })
  },
  
  // 绑定邮箱
  bindEmail: (userTempKey, userEmail) => {
    return api.post('/api/bind_email', {
      user_temp_key: userTempKey,
      user_email: userEmail
    })
  },
  
  // 更新用户数据
  rebootUserData: (userTempKey) => {
    return api.post('/api/reboot_users_data', {
      user_temp_key: userTempKey
    })
  }
}

// 隧道相关API
export const tunnelAPI = {
  // 获取用户隧道列表
  getTunnelList: (userTempKey) => {
    return api.post('/api/get_frp_tunnel_list', {
      user_temp_key: userTempKey
    })
  },
  
  // 创建隧道
  createTunnel: (userTempKey, tunnelData) => {
    return api.post('/api/create_frp_tunnel', {
      user_temp_key: userTempKey,
      ...tunnelData
    })
  },
  
  // 删除隧道
  deleteTunnel: (userTempKey, tunnelName) => {
    return api.post('/api/delete_frp_tunnel', {
      user_temp_key: userTempKey,
      tunnel_name: tunnelName
    })
  },
  
  // 获取节点配置
  getNodeConfig: (userTempKey, userTunnel) => {
    return api.post('/api/get_frp_node_config', {
      user_temp_key: userTempKey,
      user_tunnel: userTunnel
    })
  }
}

// 节点相关API
export const nodeAPI = {
  // 获取FRP节点列表
  getNodeList: (usersId) => {
    return api.get('/api/get_frp_nodes', {
      params: {
        users_id: usersId,
        json: 1
      }
    })
  }
}

// 商店相关API
export const shopAPI = {
  // 获取商品列表
  getShopList: () => {
    return api.get('/api/get_shop_list')
  },
  
  // 余额购买商品
  purchaseProduct: (userTempKey, productId) => {
    return api.post('/api/shop_purchase', {
      user_temp_key: userTempKey,
      product_id: productId
    })
  }
}

// MSKPro模式接口
export const mskproAPI = {
  // MSKPro模式切换
  switchMode: (userTempKey, mode) => {
    return api.post('/api/mskpro_mode', {
      user_temp_key: userTempKey,
      mode: mode
    })
  }
}

// 健康检查接口
export const healthAPI = {
  // 健康检查
  checkHealth: () => {
    return api.get('/api/health')
  }
}

export default api