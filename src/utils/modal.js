// 创建美观的提示弹窗
export const showModal = (options) => {
  const {
    title = '提示',
    message = '',
    type = 'info', // info, success, warning, error
    confirmText = '确定',
    cancelText = '取消',
    showCancel = false,
    onConfirm = null,
    onCancel = null
  } = options

  // 图标配置
  const icons = {
    info: {
      bg: 'bg-blue-100',
      color: 'text-blue-600',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
    },
    success: {
      bg: 'bg-green-100',
      color: 'text-green-600',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
    },
    warning: {
      bg: 'bg-amber-100',
      color: 'text-amber-600',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>'
    },
    error: {
      bg: 'bg-red-100',
      color: 'text-red-600',
      svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
    }
  }

  const icon = icons[type]

  // 创建弹窗
  const modal = document.createElement('div')
  modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-enter'

  const modalContent = document.createElement('div')
  modalContent.className = 'bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden modal-content-enter'

  modalContent.innerHTML = `
    <div class="p-8">
      <!-- 图标 -->
      <div class="flex justify-center mb-6">
        <div class="w-20 h-20 ${icon.bg} rounded-full flex items-center justify-center shadow-lg">
          <svg class="w-10 h-10 ${icon.color}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${icon.svg}
          </svg>
        </div>
      </div>
      
      <!-- 标题 -->
      <h3 class="text-2xl font-bold text-gray-900 text-center mb-4">${title}</h3>
      
      <!-- 消息 -->
      <p class="text-gray-600 text-center text-base leading-relaxed whitespace-pre-line mb-8">${message}</p>
      
      <!-- 按钮区 -->
      <div class="flex ${showCancel ? 'gap-3' : ''}">
        ${showCancel ? `
          <button data-action="cancel" 
                  class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-xl font-medium transition-all duration-200 active:scale-95">
            ${cancelText}
          </button>
        ` : ''}
        <button data-action="confirm" 
                class="flex-1 bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#6358e5] hover:to-[#5449c7] text-white px-6 py-3.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95">
          ${confirmText}
        </button>
      </div>
    </div>
  `

  modal.appendChild(modalContent)

  document.body.appendChild(modal)

  // 关闭弹窗函数
  const closeModal = () => {
    modal.classList.remove('modal-enter')
    modal.classList.add('modal-leave')
    modalContent.classList.remove('modal-content-enter')
    modalContent.classList.add('modal-content-leave')
    setTimeout(() => {
      modal.remove()
    }, 200)
  }

  // 确认按钮
  modal.querySelector('[data-action="confirm"]').addEventListener('click', () => {
    closeModal()
    if (onConfirm) onConfirm()
  })

  // 取消按钮
  if (showCancel) {
    modal.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      closeModal()
      if (onCancel) onCancel()
    })
  }

  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal()
      if (onCancel) onCancel()
    }
  })

  // ESC键关闭
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal()
      if (onCancel) onCancel()
      document.removeEventListener('keydown', handleEsc)
    }
  }
  document.addEventListener('keydown', handleEsc)

  return {
    close: closeModal
  }
}

// 便捷方法
export const showInfo = (message, title = '提示') => {
  return showModal({ type: 'info', message, title })
}

export const showSuccess = (message, title = '成功') => {
  return showModal({ type: 'success', message, title })
}

export const showWarning = (message, title = '警告') => {
  return showModal({ type: 'warning', message, title })
}

export const showError = (message, title = '错误') => {
  return showModal({ type: 'error', message, title })
}

export const showConfirm = (message, title = '确认', onConfirm, onCancel) => {
  return showModal({
    type: 'warning',
    message,
    title,
    showCancel: true,
    confirmText: '确定',
    cancelText: '取消',
    onConfirm,
    onCancel
  })
}
