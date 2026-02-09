import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false,
  speed: 200,
  minimum: 0.08,
  trickleSpeed: 100
})

// 独立页面
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import QQCallback from '../views/QQCallback.vue'
import AuthSuccess from '../views/AuthSuccess.vue'
import ApiTest from '../views/ApiTest.vue'

// Dashboard 布局和子页面
import DashboardLayout from '../components/DashboardLayout.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import TunnelList from '../views/TunnelList.vue'
import NodeList from '../views/NodeList.vue'
import ConfigFiles from '../views/ConfigFiles.vue'
import Downloads from '../views/Downloads.vue'
import Recharge from '../views/Recharge.vue'
import Shop from '../views/Shop.vue'
import UserLogs from '../views/UserLogs.vue'
import Help from '../views/Help.vue'
import PrivacyPolicy from '../views/legal/PrivacyPolicy.vue'
import TermsOfService from '../views/legal/TermsOfService.vue'
import Disclaimer from '../views/legal/Disclaimer.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/qq-callback', name: 'QQCallback', component: QQCallback },
  { path: '/auth-success', name: 'AuthSuccess', component: AuthSuccess },
  { path: '/api-test', name: 'ApiTest', component: ApiTest },
  { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicy },
  { path: '/terms', name: 'TermsOfService', component: TermsOfService },
  { path: '/disclaimer', name: 'Disclaimer', component: Disclaimer },

  // Dashboard 嵌套路由
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
      { path: 'profile', name: 'Profile', component: Profile },
      { path: 'tunnels', name: 'TunnelList', component: TunnelList },
      { path: 'nodes', name: 'NodeList', component: NodeList },
      { path: 'config', name: 'ConfigFiles', component: ConfigFiles },
      { path: 'downloads', name: 'Downloads', component: Downloads },
      { path: 'recharge', name: 'Recharge', component: Recharge },
      { path: 'shop', name: 'Shop', component: Shop },
      { path: 'logs', name: 'UserLogs', component: UserLogs },
      { path: 'help', name: 'Help', component: Help }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const isAuthenticated = localStorage.getItem('temp_key') && localStorage.getItem('users_id')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    NProgress.done()
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router