import axios from 'axios'
import NProgress from 'nprogress'

// 配置 NProgress（与 App.vue 保持一致）
NProgress.configure({
  showSpinner: false,
  speed: 300,
  minimum: 0.1,
  trickleSpeed: 150
})

// 跟踪正在进行的请求数量
let activeRequests = 0

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
    // 开始 NProgress 进度条
    // 开始 NProgress 进度条
    if (!config.hideLoading) {
      if (activeRequests === 0) {
        NProgress.start()
      }
      activeRequests++
    }

    console.log('API请求配置:', config)

    // 如果是POST请求且数据是对象，转换为URLSearchParams（form-data格式）
    // 但如果已经指定了Content-Type为application/json，则保持JSON格式
    if (config.method === 'post' && config.data && typeof config.data === 'object') {
      if (config.headers['Content-Type'] === 'application/json') {
        // JSON格式，需要序列化
        config.data = JSON.stringify(config.data)
      } else {
        // form-data格式
        const params = new URLSearchParams()
        Object.keys(config.data).forEach(key => {
          params.append(key, config.data[key])
        })
        config.data = params
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    // 请求错误时也要减少计数并可能结束进度条
    // 请求错误时也要减少计数并可能结束进度条
    if (!error.config || !error.config.hideLoading) {
      activeRequests--
      if (activeRequests === 0) {
        NProgress.done()
      }
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    // 结束 NProgress 进度条
    if (!response.config.hideLoading) {
      activeRequests--
      if (activeRequests === 0) {
        NProgress.done()
      }
    }

    console.log('API响应:', response)
    return response.data
  },
  error => {
    // 结束 NProgress 进度条
    if (!error.config || !error.config.hideLoading) {
      activeRequests--
      if (activeRequests === 0) {
        NProgress.done()
      }
    }

    console.error('API请求错误:', error)
    if (error.response) {
      console.error('错误响应数据:', error.response.data)
      console.error('错误状态码:', error.response.status)

      // 检查是否是临时密钥失效（根据后端返回的错误码判断）
      if (error.response.data && (
        error.response.data.code === -1 ||
        error.response.data.code === -2 ||
        error.response.data.msg?.includes('临时密钥') ||
        error.response.data.msg?.includes('temp_key') ||
        error.response.data.msg?.includes('登录') ||
        error.response.data.msg?.includes('认证')
      )) {
        // 清除本地存储
        localStorage.removeItem('temp_key')
        localStorage.removeItem('users_id')

        // 显示提示信息
        if (typeof window !== 'undefined') {
          // 创建提示弹窗
          const alertDiv = document.createElement('div')
          alertDiv.className = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] modal-enter'
          alertDiv.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 modal-content-enter">
              <div class="text-center">
                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">登录已过期</h3>
                <p class="text-gray-600 mb-6">您的登录状态已失效，请重新登录</p>
                <button onclick="this.closest('.fixed').remove(); window.location.href='/'" 
                        class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-lg font-medium transition-all">
                  返回登录
                </button>
              </div>
            </div>
          `
          document.body.appendChild(alertDiv)

          // 3秒后自动跳转
          setTimeout(() => {
            alertDiv.remove()
            window.location.href = '/'
          }, 3000)
        }
      }
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

  // 发送邮箱验证码（用于绑定邮箱）
  sendEmailCode: (email, userTempKey) => {
    return api.get('/api/send_email_code', {
      params: {
        email: email,
        user_temp_key: userTempKey
      }
    })
  },

  // 发送邮箱注册验证码
  sendEmailRegisterCode: (email) => {
    return api.post('/api/send_email_register_code', {
      users_email: email
    })
  },

  // 验证邮箱验证码
  verifyEmailCode: (code, usersId, usersUid = null) => {
    const params = { code }
    if (usersId) {
      params.users_id = usersId
    } else if (usersUid) {
      params.users_uid = usersUid
    }
    return api.get('/api/verify_email_code', { params })
  },

  // 邮箱注册
  emailRegister: (email, username, password, verificationCode, invitationId = null, faceImg = null, registerIp = null) => {
    const data = {
      users_email: email,
      users_login: username,
      users_pass: password,
      verification_code: verificationCode
    }
    if (invitationId) data.invitation_id = invitationId
    if (faceImg) data.users_faceimg = faceImg
    if (registerIp) data.register_ip = registerIp

    return api.post('/api/users_email_register', data)
  },

  // 邮箱登录
  emailLogin: (email, password) => {
    return api.post('/api/email_login', {
      users_email: email,
      users_pass: password
    })
  },

  // 更新用户数据
  rebootUserData: (userTempKey) => {
    return api.post('/api/reboot_users_data', {
      user_temp_key: userTempKey
    })
  },

  // 更新用户资料
  updateProfile: (userTempKey, data) => {
    return api.post('/api/update_profile', {
      user_temp_key: userTempKey,
      ...data
    })
  }
}

// 隧道相关API
export const tunnelAPI = {
  // 获取用户隧道列表
  getTunnelList: (userTempKey, config = {}) => {
    return api.post('/api/get_frp_tunnel_list', {
      user_temp_key: userTempKey
    }, config)
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
  },

  // 查询隧道流量
  queryTraffic: (userTempKey, params = {}, config = {}) => {
    const requestData = {
      user_temp_key: userTempKey,
      ...params
    }
    console.log('查询流量请求数据:', requestData)
    return api.post('/api/traffic/query', requestData, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...config
    })
  },

  // 修改隧道信息
  modifyTunnel: (userTempKey, tunnelName, mode, value) => {
    return api.post('/api/modify_tunnel_information', {
      user_temp_key: userTempKey,
      user_tunnel: tunnelName,
      mode: mode,
      value: value
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

// 实名认证相关API
export const certificationAPI = {
  // 初始化实名认证
  initCertification: (userTempKey, realname, idcard, certType = 'person') => {
    return api.post('/api/certification/init', {
      user_temp_key: userTempKey,
      realname: realname,
      idcard: idcard,
      cert_type: certType
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  // 查询认证状态
  queryCertificationStatus: (userTempKey, certifyId) => {
    return api.post('/api/certification/status', {
      user_temp_key: userTempKey,
      certify_id: certifyId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  // 获取认证信息
  getCertificationInfo: (userTempKey) => {
    return api.post('/api/certification/info', {
      user_temp_key: userTempKey
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export default api