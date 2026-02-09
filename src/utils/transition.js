// 登录成功过渡动画

/**
 * 显示登录成功的过渡动画
 * @param {string} message - 显示的消息（可选）
 * @returns {Promise} - 动画完成后 resolve
 */
export const showLoginSuccessTransition = (message = '登录成功') => {
    return new Promise((resolve) => {
        // 创建过渡遮罩层
        const overlay = document.createElement('div')
        overlay.className = 'login-success-overlay'
        overlay.id = 'login-success-overlay'

        overlay.innerHTML = `
      <div class="login-success-icon">
        <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg class="w-14 h-14 text-white success-checkmark-animated" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path class="success-circle" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z"></path>
            <path class="success-checkmark" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
          </svg>
        </div>
      </div>
      <h2 class="login-success-text text-white text-2xl font-bold mt-6">${message}</h2>
      <p class="login-success-text text-white/80 mt-2" style="animation-delay: 0.3s;">正在跳转...</p>
    `

        document.body.appendChild(overlay)

        // 动画完成后移除并 resolve
        setTimeout(() => {
            overlay.remove()
            resolve()
        }, 1200) // 动画时长
    })
}

/**
 * 显示简单的加载过渡
 * @param {string} message - 显示的消息
 * @param {number} duration - 持续时间（毫秒）
 * @returns {Promise}
 */
export const showLoadingTransition = (message = '加载中...', duration = 800) => {
    return new Promise((resolve) => {
        const overlay = document.createElement('div')
        overlay.className = 'fixed inset-0 bg-gradient-to-br from-[#7367f0]/90 to-[#5f5bd8]/90 z-[9998] flex flex-col items-center justify-center'
        overlay.style.animation = 'fadeIn 0.2s ease-out'
        overlay.id = 'loading-transition-overlay'

        overlay.innerHTML = `
      <div class="animate-spin w-12 h-12 border-4 border-white/30 border-t-white rounded-full mb-4"></div>
      <p class="text-white text-lg font-medium">${message}</p>
    `

        document.body.appendChild(overlay)

        setTimeout(() => {
            overlay.style.animation = 'fadeOut 0.2s ease-out'
            setTimeout(() => {
                overlay.remove()
                resolve()
            }, 200)
        }, duration)
    })
}
