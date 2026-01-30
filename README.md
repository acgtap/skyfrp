# SkyFRP 内网穿透工具前端

一个基于 Vue 3 + Tailwind CSS + Axios 的现代化内网穿透工具前端界面。

## 功能特色

- 🎨 现代简约的 Shadcn-ui 风格设计
- 🎯 紫色主题色调 (#7367f0)
- 📱 响应式设计，支持移动端
- 🔐 QQ 登录集成
- 🚀 隧道管理功能
- 💰 余额充值和商城系统
- 📊 用户数据统计
- 📝 操作日志记录

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **样式框架**: Tailwind CSS
- **HTTP 客户端**: Axios
- **路由**: Vue Router 4
- **图表**: Chart.js + Vue-ChartJS
- **图标**: Lucide Vue Next
- **构建工具**: Vite

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── api/                 # API 接口封装
│   └── index.js        # 统一的 API 配置
├── components/          # 可复用组件
│   ├── DashboardLayout.vue  # 管理面板布局
│   ├── Button.vue      # 按钮组件
│   └── FeatureCard.vue # 功能卡片组件
├── router/             # 路由配置
│   └── index.js        # 路由定义
├── stores/             # 状态管理
│   └── user.js         # 用户状态管理
├── views/              # 页面组件
│   ├── LandingPage.vue # 着陆页
│   ├── AuthSuccess.vue # 登录成功页
│   ├── Dashboard.vue   # 管理面板首页
│   ├── Profile.vue     # 个人资料
│   ├── TunnelList.vue  # 隧道列表
│   ├── NodeList.vue    # 节点列表
│   ├── ConfigFiles.vue # 配置文件
│   ├── Downloads.vue   # 软件下载
│   ├── Recharge.vue    # 余额充值
│   ├── Shop.vue        # 余额商城
│   └── UserLogs.vue    # 用户日志
├── App.vue             # 根组件
├── main.js             # 应用入口
└── style.css           # 全局样式
```

## API 配置

项目使用统一的 API 配置，基础 URL 为 `https://mskapi.cnwbhw.com`。

主要 API 模块：
- `authAPI` - 用户认证相关
- `userAPI` - 用户信息管理
- `tunnelAPI` - 隧道管理
- `nodeAPI` - 节点信息
- `shopAPI` - 商城功能
- `paymentAPI` - 支付相关

## 页面功能

### 着陆页 (LandingPage)
- 产品介绍和功能展示
- 定价方案
- 帮助文档
- QQ 登录入口

### 管理面板 (Dashboard)
- 用户信息展示
- 隧道统计
- 流量使用情况
- 每日签到功能

### 隧道管理
- **隧道列表**: 查看、创建、删除隧道
- **节点列表**: 查看可用服务器节点
- **配置文件**: 下载 FRP 配置文件
- **软件下载**: 下载各平台客户端

### 增值服务
- **余额充值**: 支持微信、支付宝支付
- **余额商城**: 购买会员套餐和流量包

### 其他功能
- **个人资料**: 用户信息管理、卡密兑换、邮箱绑定
- **用户日志**: 操作记录和系统日志

## 设计规范

### 颜色方案
- **主色调**: 紫色 (#7367f0) - 用于按钮、链接、表单元素
- **背景色**: 浅灰色 (#f8f7fa) - 页面背景
- **文字色**: 仅使用黑色或白色
- **无渐变**: 保持简约风格

### 组件风格
- 现代简约的 Shadcn-ui 风格
- 圆角设计 (rounded-lg)
- 柔和的阴影效果
- 响应式布局

## 开发注意事项

1. **API 请求**: 所有 POST 请求使用 FormData 格式
2. **错误处理**: 统一的错误处理和用户提示
3. **响应式设计**: 确保在移动端的良好体验
4. **性能优化**: 合理使用 Vue 3 的响应式特性
5. **代码规范**: 遵循 Vue 3 Composition API 最佳实践

## 许可证

本项目仅供学习和参考使用。
