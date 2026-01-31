import { createRouter, createWebHistory } from 'vue-router'

// 导入页面组件
import LandingPage from '../views/LandingPage.vue'
import QQCallback from '../views/QQCallback.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import TunnelList from '../views/TunnelList.vue'
import NodeList from '../views/NodeList.vue'
import ConfigFiles from '../views/ConfigFiles.vue'
import Downloads from '../views/Downloads.vue'
import Recharge from '../views/Recharge.vue'
import Shop from '../views/Shop.vue'
import UserLogs from '../views/UserLogs.vue'
import AuthSuccess from '../views/AuthSuccess.vue'
import ApiTest from '../views/ApiTest.vue'
import Help from '../views/Help.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/qq-callback',
    name: 'QQCallback',
    component: QQCallback
  },
  {
    path: '/auth-success',
    name: 'AuthSuccess',
    component: AuthSuccess
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/tunnels',
    name: 'TunnelList',
    component: TunnelList,
    meta: { requiresAuth: true }
  },
  {
    path: '/nodes',
    name: 'NodeList',
    component: NodeList,
    meta: { requiresAuth: true }
  },
  {
    path: '/config',
    name: 'ConfigFiles',
    component: ConfigFiles,
    meta: { requiresAuth: true }
  },
  {
    path: '/downloads',
    name: 'Downloads',
    component: Downloads,
    meta: { requiresAuth: true }
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: Recharge,
    meta: { requiresAuth: true }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: { requiresAuth: true }
  },
  {
    path: '/logs',
    name: 'UserLogs',
    component: UserLogs,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: { requiresAuth: true }
  },
  {
    path: '/api-test',
    name: 'ApiTest',
    component: ApiTest
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('temp_key') && localStorage.getItem('users_id')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router