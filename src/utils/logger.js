// 用户操作日志工具

// 获取用户IP地址（通过第三方API，带超时和缓存）
let cachedIP = null
async function getUserIP() {
  // 如果已经缓存了IP，直接返回
  if (cachedIP) {
    return cachedIP
  }
  
  try {
    // 设置超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 2000) // 2秒超时
    
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    
    const data = await response.json()
    cachedIP = data.ip // 缓存IP地址
    return data.ip
  } catch (error) {
    console.warn('获取IP失败，使用本地IP:', error.message)
    // 返回本地IP标识，不再等待
    return '本地'
  }
}

// 获取User Agent
function getUserAgent() {
  return navigator.userAgent
}

// 生成日志ID
function generateLogId() {
  const logs = JSON.parse(localStorage.getItem('userLogs') || '[]')
  return logs.length > 0 ? Math.max(...logs.map(log => log.id)) + 1 : 1
}

// 记录日志（异步获取IP，不阻塞主流程）
export async function logUserAction(type, action, status = 'success', details = {}) {
  try {
    const userAgent = getUserAgent()
    const timestamp = new Date().toISOString()
    
    // 先创建日志对象，IP稍后异步获取
    const log = {
      id: generateLogId(),
      type,
      action,
      ip: '获取中...',
      userAgent,
      status, // success, failed, pending
      timestamp,
      details
    }
    
    // 从localStorage读取现有日志
    const logs = JSON.parse(localStorage.getItem('userLogs') || '[]')
    
    // 添加新日志
    logs.push(log)
    
    // 只保留最近1000条日志
    if (logs.length > 1000) {
      logs.splice(0, logs.length - 1000)
    }
    
    // 立即保存到localStorage（IP为"获取中..."）
    localStorage.setItem('userLogs', JSON.stringify(logs))
    
    console.log('日志已记录:', log)
    
    // 异步获取IP地址并更新
    getUserIP().then(ip => {
      const updatedLogs = JSON.parse(localStorage.getItem('userLogs') || '[]')
      const logIndex = updatedLogs.findIndex(l => l.id === log.id)
      if (logIndex !== -1) {
        updatedLogs[logIndex].ip = ip
        localStorage.setItem('userLogs', JSON.stringify(updatedLogs))
      }
    })
    
    // 如果是pending状态，10分钟后检查并更新为failed
    if (status === 'pending') {
      setTimeout(() => {
        const logs = JSON.parse(localStorage.getItem('userLogs') || '[]')
        const logIndex = logs.findIndex(l => l.id === log.id)
        if (logIndex !== -1 && logs[logIndex].status === 'pending') {
          logs[logIndex].status = 'failed'
          logs[logIndex].details = {
            ...logs[logIndex].details,
            reason: '操作超时（10分钟未完成）'
          }
          localStorage.setItem('userLogs', JSON.stringify(logs))
          console.log('日志状态已更新为失败（超时）:', logs[logIndex])
        }
      }, 10 * 60 * 1000) // 10分钟
    }
    
    return log.id // 返回日志ID，用于后续更新
  } catch (error) {
    console.error('记录日志失败:', error)
    return null
  }
}

// 更新日志状态
export function updateLogStatus(logId, status, additionalDetails = {}) {
  try {
    const logs = JSON.parse(localStorage.getItem('userLogs') || '[]')
    const logIndex = logs.findIndex(log => log.id === logId)
    
    if (logIndex !== -1) {
      logs[logIndex].status = status
      logs[logIndex].details = { ...logs[logIndex].details, ...additionalDetails }
      logs[logIndex].updatedAt = new Date().toISOString()
      
      localStorage.setItem('userLogs', JSON.stringify(logs))
      console.log('日志状态已更新:', logs[logIndex])
      return true
    }
    
    return false
  } catch (error) {
    console.error('更新日志状态失败:', error)
    return false
  }
}

// 日志类型常量
export const LOG_TYPES = {
  LOGIN: 'login',
  TUNNEL: 'tunnel',
  PAYMENT: 'payment',
  PURCHASE: 'purchase',
  SIGNIN: 'signin'
}

// 日志操作常量
export const LOG_ACTIONS = {
  // 登录相关
  LOGIN_SUCCESS: 'QQ登录成功',
  LOGIN_FAILED: 'QQ登录失败',
  LOGOUT: '退出登录',
  
  // 隧道相关
  CREATE_TUNNEL: '创建隧道',
  DELETE_TUNNEL: '删除隧道',
  UPDATE_TUNNEL: '更新隧道',
  
  // 充值相关
  RECHARGE: '余额充值',
  REDEEM_CARD: '卡密兑换',
  
  // 购买相关
  PURCHASE_PRODUCT: '购买商品',
  
  // 签到相关
  SIGNIN: '每日签到'
}
