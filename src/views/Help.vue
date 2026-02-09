<template>
  <div>
    <!-- 页面标题 -->
    <div class="mb-6">
      <h1 class="text-2xl text-black">帮助文档</h1>
      <p class="text-gray-600 mt-1">详细了解如何使用SkyFRP内网穿透服务</p>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex gap-6">
      <!-- 左侧内容 -->
      <div class="flex-1 min-w-0">
        <!-- 搜索框 -->
        <div class="mb-6">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索帮助内容..." 
              class="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7367f0] focus:border-transparent transition-all">
            <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

    <!-- 帮助内容 -->
    <div class="space-y-6">
      <!-- 快速开始 -->
      <div id="quick-start" class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-[#7367f0]/10 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900">快速开始指南</h2>
        </div>
        
        <div class="space-y-6">
          <div class="border-l-4 border-[#7367f0] pl-6 py-2">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">第一步：创建隧道</h3>
            <p class="text-gray-600 mb-3">前往"隧道管理 > 隧道列表"，点击右上角的"创建隧道"按钮</p>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#7367f0] text-white text-xs font-bold mr-3 mt-0.5">1</span>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">隧道名称</p>
                  <p class="text-sm text-gray-600">填写一个容易识别的名称，如"我的世界服务器"、"网站测试"等</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#7367f0] text-white text-xs font-bold mr-3 mt-0.5">2</span>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">选择节点</p>
                  <p class="text-sm text-gray-600">建议选择延迟较低的节点。可以在"节点列表"中查看各节点的延迟和负载情况</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#7367f0] text-white text-xs font-bold mr-3 mt-0.5">3</span>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">选择协议</p>
                  <p class="text-sm text-gray-600">TCP适用于大多数应用，UDP适用于实时通信应用</p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#7367f0] text-white text-xs font-bold mr-3 mt-0.5">4</span>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">本地地址和端口</p>
                  <p class="text-sm text-gray-600">填写您要穿透的服务地址，如 127.0.0.1:25565（Minecraft）、127.0.0.1:80（网站）</p>
                </div>
              </div>
            </div>
          </div>

          <div class="border-l-4 border-[#7367f0] pl-6 py-2">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">第二步：下载客户端</h3>
            <p class="text-gray-600 mb-3">前往"隧道管理 > 软件下载"，根据您的操作系统下载对应的客户端</p>
            <div class="bg-gray-50 rounded-lg p-4">
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center"><span class="w-2 h-2 bg-[#7367f0] rounded-full mr-3"></span>Windows系统：下载 frpc_windows.exe</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-[#7367f0] rounded-full mr-3"></span>Linux系统：下载 frpc_linux</li>
                <li class="flex items-center"><span class="w-2 h-2 bg-[#7367f0] rounded-full mr-3"></span>MacOS系统：下载 frpc_darwin</li>
              </ul>
            </div>
          </div>

          <div class="border-l-4 border-[#7367f0] pl-6 py-2">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">第三步：获取配置文件</h3>
            <p class="text-gray-600 mb-3">前往"隧道管理 > 配置文件"，选择您创建的隧道</p>
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <p class="text-gray-600">• 点击"获取配置文件"按钮</p>
              <p class="text-gray-600">• 配置文件会自动显示在下方</p>
              <p class="text-gray-600">• 复制配置内容或点击下载按钮保存为 frpc.ini 文件</p>
            </div>
          </div>

          <div class="border-l-4 border-[#7367f0] pl-6 py-2">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">第四步：启动客户端</h3>
            <p class="text-gray-600 mb-3">将配置文件和客户端放在同一目录下</p>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <p class="font-medium text-gray-900 mb-2">Windows用户：</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded-lg text-sm font-mono">frpc_windows.exe -c frpc.ini</code>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">Linux/Mac用户：</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded-lg text-sm font-mono">./frpc -c frpc.ini</code>
              </div>
              <p class="text-sm text-gray-600 mt-2">💡 提示：看到"start proxy success"表示启动成功</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常见问题 -->
      <div id="faq" class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-[#7367f0]/10 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900">常见问题解答</h2>
        </div>

        <div class="space-y-3">
          <div 
            v-for="(faq, index) in filteredFaqs" 
            :key="index"
            class="border border-gray-200 rounded-lg overflow-hidden hover:border-[#7367f0] transition-colors">
            <button 
              @click="toggleFaq(index)"
              class="w-full px-5 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
              <span class="font-medium text-gray-900 text-left">{{ faq.question }}</span>
              <svg 
                class="w-5 h-5 text-gray-600 transition-transform duration-200 flex-shrink-0 ml-3"
                :class="{ 'rotate-180': openFaqIndex === index }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="openFaqIndex === index"
              class="px-5 py-4 bg-white border-t border-gray-200">
              <div class="text-gray-600 leading-relaxed" v-html="faq.answer"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 隧道配置详解 -->
      <div id="tunnel-config" class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-[#7367f0]/10 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900">隧道配置详解</h2>
        </div>

        <div class="space-y-4">
          <div class="bg-gradient-to-r from-[#7367f0]/5 to-transparent rounded-lg p-5 border-l-4 border-[#7367f0]">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">协议类型选择</h3>
            <div class="space-y-4">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center mb-2">
                  <span class="px-3 py-1 bg-[#7367f0] text-white text-sm font-medium rounded-lg mr-3">TCP</span>
                  <span class="text-gray-900 font-medium">传输控制协议</span>
                </div>
                <p class="text-gray-600 mb-2">适用场景：</p>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• 网站服务（HTTP/HTTPS）</li>
                  <li>• 游戏服务器（Minecraft、泰拉瑞亚等）</li>
                  <li>• 远程桌面（RDP、VNC）</li>
                  <li>• 数据库连接（MySQL、PostgreSQL）</li>
                  <li>• SSH远程连接</li>
                </ul>
              </div>
              
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center mb-2">
                  <span class="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg mr-3">UDP</span>
                  <span class="text-gray-900 font-medium">用户数据报协议</span>
                </div>
                <p class="text-gray-600 mb-2">适用场景：</p>
                <ul class="space-y-1 text-gray-600 ml-4">
                  <li>• 语音通话应用</li>
                  <li>• 视频直播/会议</li>
                  <li>• 在线游戏（需要低延迟）</li>
                  <li>• DNS服务</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-blue-500/5 to-transparent rounded-lg p-5 border-l-4 border-blue-500">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">本地地址配置</h3>
            <div class="space-y-3">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <p class="font-medium text-gray-900 mb-2">127.0.0.1（本机回环地址）</p>
                <p class="text-gray-600 mb-2">用于穿透运行在本机上的服务</p>
                <div class="bg-gray-50 rounded p-3">
                  <p class="text-sm text-gray-600 mb-1">常用端口示例：</p>
                  <code class="text-sm text-[#7367f0]">127.0.0.1:25565</code> <span class="text-sm text-gray-600">- Minecraft服务器</span><br>
                  <code class="text-sm text-[#7367f0]">127.0.0.1:80</code> <span class="text-sm text-gray-600">- HTTP网站</span><br>
                  <code class="text-sm text-[#7367f0]">127.0.0.1:3389</code> <span class="text-sm text-gray-600">- Windows远程桌面</span><br>
                  <code class="text-sm text-[#7367f0]">127.0.0.1:22</code> <span class="text-sm text-gray-600">- SSH服务</span>
                </div>
              </div>
              
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <p class="font-medium text-gray-900 mb-2">局域网IP地址</p>
                <p class="text-gray-600 mb-2">用于穿透局域网内其他设备的服务</p>
                <div class="bg-gray-50 rounded p-3">
                  <p class="text-sm text-gray-600 mb-1">示例：</p>
                  <code class="text-sm text-[#7367f0]">192.168.1.100:8080</code> <span class="text-sm text-gray-600">- 局域网内另一台电脑的服务</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-amber-500/5 to-transparent rounded-lg p-5 border-l-4 border-amber-500">
            <h3 class="font-semibold text-gray-900 mb-3 text-lg">流量模式说明</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center mb-2">
                  <svg class="w-5 h-5 text-[#7367f0] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span class="font-medium text-gray-900">用户流量</span>
                </div>
                <p class="text-gray-600 text-sm mb-2">使用您账户的总流量额度</p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>✓ 所有隧道共享流量</li>
                  <li>✓ 灵活分配使用</li>
                  <li>✓ 适合多隧道用户</li>
                </ul>
              </div>
              
              <div class="bg-white rounded-lg p-4 border border-gray-200">
                <div class="flex items-center mb-2">
                  <svg class="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span class="font-medium text-gray-900">隧道流量</span>
                </div>
                <p class="text-gray-600 text-sm mb-2">为单个隧道单独购买流量</p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>✓ 独立流量池</li>
                  <li>✓ 不影响其他隧道</li>
                  <li>✓ 适合大流量单一应用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 客户端使用指南 -->
      <div id="client-guide" class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-[#7367f0]/10 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900">客户端使用指南</h2>
        </div>

        <div class="space-y-6">
          <!-- Windows -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3">
              <h3 class="font-semibold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
                Windows系统使用方法
              </h3>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <p class="font-medium text-gray-900 mb-2">1. 下载客户端</p>
                <p class="text-gray-600 text-sm">下载 frpc_windows.exe 文件</p>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">2. 准备配置文件</p>
                <p class="text-gray-600 text-sm mb-2">将配置文件保存为 frpc.ini，与客户端放在同一文件夹</p>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">3. 启动方式</p>
                <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p class="text-sm text-gray-600 mb-2">方法一：命令行启动</p>
                    <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">frpc_windows.exe -c frpc.ini</code>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 mb-2">方法二：创建批处理文件（推荐）</p>
                    <p class="text-sm text-gray-600 mb-1">新建文本文件，输入以下内容并保存为 start.bat：</p>
                    <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">@echo off<br>frpc_windows.exe -c frpc.ini<br>pause</code>
                    <p class="text-sm text-gray-600 mt-2">双击 start.bat 即可启动</p>
                  </div>
                </div>
              </div>
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800"><strong>💡 提示：</strong>如果需要开机自启，可以将批处理文件快捷方式放入启动文件夹</p>
              </div>
            </div>
          </div>

          <!-- Linux -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3">
              <h3 class="font-semibold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.719-.287 2.649.123.93.429 1.791.935 2.596.51.81 1.191 1.594 1.981 2.312.79.718 1.694 1.365 2.716 1.94 1.021.576 2.159 1.082 3.403 1.512 1.244.43 2.595.785 4.046 1.066.726.14 1.476.261 2.248.355.386.047.772.086 1.16.117.194.015.387.027.582.036.097.005.194.007.291.009.097.001.194.001.291 0 .097-.002.194-.004.291-.009.194-.009.387-.021.582-.036.388-.031.774-.07 1.16-.117.772-.094 1.522-.215 2.248-.355 1.451-.281 2.802-.636 4.046-1.066 1.244-.43 2.382-.936 3.403-1.512 1.022-.575 1.926-1.222 2.716-1.94.79-.718 1.471-1.502 1.981-2.312.506-.805.812-1.666.935-2.596.123-.93-.009-1.809-.287-2.649-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021z"/>
                </svg>
                Linux系统使用方法
              </h3>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <p class="font-medium text-gray-900 mb-2">1. 下载并设置权限</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono mb-2">chmod +x frpc_linux</code>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">2. 启动客户端</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">./frpc_linux -c frpc.ini</code>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">3. 后台运行（推荐）</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono mb-2">nohup ./frpc_linux -c frpc.ini &</code>
                <p class="text-sm text-gray-600">使用 nohup 可以让程序在后台持续运行，即使关闭终端也不会停止</p>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">4. 设置开机自启（systemd）</p>
                <div class="bg-gray-50 rounded-lg p-4">
                  <p class="text-sm text-gray-600 mb-2">创建服务文件：</p>
                  <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono mb-3">sudo nano /etc/systemd/system/frpc.service</code>
                  <p class="text-sm text-gray-600 mb-2">输入以下内容：</p>
                  <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono whitespace-pre">[Unit]
Description=FRP Client
After=network.target

[Service]
Type=simple
ExecStart=/path/to/frpc_linux -c /path/to/frpc.ini
Restart=on-failure

[Install]
WantedBy=multi-user.target</code>
                  <p class="text-sm text-gray-600 mt-3 mb-2">启用服务：</p>
                  <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">sudo systemctl enable frpc<br>sudo systemctl start frpc</code>
                </div>
              </div>
            </div>
          </div>

          <!-- MacOS -->
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div class="bg-gradient-to-r from-gray-700 to-gray-800 px-5 py-3">
              <h3 class="font-semibold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                MacOS系统使用方法
              </h3>
            </div>
            <div class="p-5 space-y-4">
              <div>
                <p class="font-medium text-gray-900 mb-2">1. 下载并设置权限</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">chmod +x frpc_darwin</code>
              </div>
              <div>
                <p class="font-medium text-gray-900 mb-2">2. 启动客户端</p>
                <code class="block bg-white border border-gray-300 text-gray-900 p-3 rounded text-sm font-mono">./frpc_darwin -c frpc.ini</code>
              </div>
              <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>首次运行可能会提示"无法验证开发者"，请前往"系统偏好设置 > 安全性与隐私"中允许运行</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 联系支持 -->
      <div id="support" class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-[#7367f0]/10 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-[#7367f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900">联系支持</h2>
        </div>

        <div class="max-w-md mx-auto">
          <div class="bg-gradient-to-br from-[#7367f0]/10 to-[#5f5bd8]/10 rounded-xl p-6 border border-[#7367f0]/20">
            <div class="flex items-center mb-4">
              <div class="w-14 h-14 bg-[#7367f0] rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <span class="text-white text-lg font-bold">QQ</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">官方QQ交流群</h3>
                <p class="text-gray-600">群号：572658815</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4 text-sm">加入QQ群获取技术支持、交流使用经验、了解最新动态</p>
            <button @click="joinQQGroup" class="w-full bg-gradient-to-r from-[#7367f0] to-[#5f5bd8] hover:from-[#5f5bd8] hover:to-[#4c46d8] text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-[#7367f0]/30 hover:scale-105 transform">
              立即加入群聊
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>

      <!-- 右侧目录 -->
      <div class="hidden lg:block w-64 flex-shrink-0">
        <div class="sticky top-24">
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <h3 class="text-sm font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">目录导航</h3>
            <nav class="space-y-1">
              <button 
                v-for="category in categories" 
                :key="category.id"
                @click="scrollToSection(category.id)"
                class="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#7367f0] hover:bg-[#7367f0]/5 rounded-lg transition-colors">
                {{ category.name }}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索关键词
const searchQuery = ref('')

// 当前展开的FAQ索引
const openFaqIndex = ref(null)

// 分类导航
const categories = [
  { id: 'quick-start', name: '快速开始' },
  { id: 'faq', name: '常见问题' },
  { id: 'tunnel-config', name: '隧道配置' },
  { id: 'client-guide', name: '客户端指南' },
  { id: 'support', name: '联系支持' }
]

// FAQ数据
const faqs = [
  {
    question: '如何创建第一个隧道？',
    answer: '<p class="mb-2">创建隧道的详细步骤：</p><ol class="list-decimal list-inside space-y-1 ml-2"><li>前往"隧道管理 > 隧道列表"</li><li>点击右上角"创建隧道"按钮</li><li>填写隧道名称（便于识别）</li><li>选择延迟较低的节点</li><li>选择协议类型（TCP/UDP）</li><li>填写本地IP和端口（如 127.0.0.1:25565）</li><li>选择流量模式</li><li>点击"创建"按钮</li></ol>'
  },
  {
    question: '隧道显示离线怎么办？',
    answer: '<p class="mb-2">隧道离线的常见原因及解决方法：</p><div class="space-y-2"><div class="bg-gray-50 p-3 rounded"><strong>1. 客户端未启动</strong><br>检查客户端程序是否正在运行，查看任务管理器或进程列表</div><div class="bg-gray-50 p-3 rounded"><strong>2. 配置文件错误</strong><br>重新获取配置文件，确保配置内容完整且正确</div><div class="bg-gray-50 p-3 rounded"><strong>3. 本地服务未运行</strong><br>确认您要穿透的服务（如游戏服务器）已经启动</div><div class="bg-gray-50 p-3 rounded"><strong>4. 防火墙阻止</strong><br>检查防火墙设置，允许客户端程序通过</div><div class="bg-gray-50 p-3 rounded"><strong>5. 端口被占用</strong><br>确保本地端口没有被其他程序占用</div></div>'
  },
  {
    question: '如何获取和使用配置文件？',
    answer: '<p class="mb-2">配置文件获取步骤：</p><ol class="list-decimal list-inside space-y-1 ml-2 mb-3"><li>前往"隧道管理 > 配置文件"</li><li>在隧道列表中找到您的隧道</li><li>点击"获取配置文件"按钮</li><li>配置内容会自动显示</li><li>复制内容或点击下载按钮</li></ol><p class="mb-2">使用方法：</p><ul class="list-disc list-inside space-y-1 ml-2"><li>将配置保存为 frpc.ini 文件</li><li>与客户端程序放在同一目录</li><li>启动客户端时会自动读取配置</li></ul>'
  },
  {
    question: '流量不足怎么办？',
    answer: '<p class="mb-2">获取流量的方式：</p><div class="space-y-2"><div class="bg-green-50 p-3 rounded border border-green-200"><strong>🎁 每日签到</strong><br>每天登录后点击右上角"每日签到"按钮，可获得免费流量奖励</div><div class="bg-blue-50 p-3 rounded border border-blue-200"><strong>💰 购买流量包</strong><br>前往"增值服务 > 余额商城"购买流量包，性价比高</div><div class="bg-purple-50 p-3 rounded border border-purple-200"><strong>👑 升级会员</strong><br>成为会员可获得更多流量额度和专属节点</div></div>'
  },
  {
    question: '支持哪些协议？各有什么区别？',
    answer: '<div class="space-y-3"><div class="border-l-4 border-[#7367f0] pl-3"><strong class="text-[#7367f0]">TCP协议</strong><p class="text-sm mt-1">传输控制协议，可靠的面向连接的协议</p><p class="text-sm mt-1"><strong>适用场景：</strong>网站、游戏服务器、远程桌面、数据库、SSH等</p><p class="text-sm mt-1"><strong>特点：</strong>数据传输可靠，有序到达，适合大多数应用</p></div><div class="border-l-4 border-green-500 pl-3"><strong class="text-green-600">UDP协议</strong><p class="text-sm mt-1">用户数据报协议，无连接的协议</p><p class="text-sm mt-1"><strong>适用场景：</strong>语音通话、视频会议、在线游戏、DNS服务等</p><p class="text-sm mt-1"><strong>特点：</strong>传输速度快，延迟低，适合实时应用</p></div></div>'
  },
  {
    question: '如何选择合适的节点？',
    answer: '<p class="mb-2">选择节点的建议：</p><div class="space-y-2"><div class="bg-gray-50 p-3 rounded"><strong>1. 查看延迟</strong><br>前往"节点列表"查看各节点延迟，选择延迟较低的节点（通常<50ms为佳）</div><div class="bg-gray-50 p-3 rounded"><strong>2. 考虑地理位置</strong><br>选择距离您和访问者都较近的节点，可以获得更好的连接速度</div><div class="bg-gray-50 p-3 rounded"><strong>3. 查看负载情况</strong><br>避免选择负载过高的节点，以免影响使用体验</div><div class="bg-gray-50 p-3 rounded"><strong>4. 国内外选择</strong><br>• 国内访问：选择国内节点<br>• 国际访问：选择海外节点</div></div>'
  },
  {
    question: '可以同时运行多个隧道吗？',
    answer: '<p class="mb-2"><strong>可以！</strong>您可以创建并同时运行多个隧道。</p><p class="mb-2">注意事项：</p><ul class="list-disc list-inside space-y-1 ml-2"><li>每个隧道需要使用不同的本地端口</li><li>确保您的流量额度充足</li><li>所有隧道可以使用同一个配置文件</li><li>可以为不同服务创建不同隧道</li></ul><p class="mt-3 bg-blue-50 p-3 rounded text-sm">💡 <strong>提示：</strong>例如，您可以同时运行Minecraft服务器隧道（25565端口）和网站隧道（80端口）</p>'
  },
  {
    question: '忘记密码怎么办？',
    answer: '<p class="mb-2">SkyFRP使用QQ登录，无需记忆密码。</p><div class="bg-green-50 p-4 rounded border border-green-200"><p class="mb-2"><strong>✓ 登录方式：</strong></p><ul class="list-disc list-inside space-y-1 ml-2"><li>点击"QQ登录"按钮</li><li>使用您的QQ账号授权登录</li><li>无需设置和记忆密码</li></ul></div><p class="mt-3 text-sm text-gray-600">如果遇到登录问题，请联系QQ群客服处理</p>'
  },
  {
    question: 'Minecraft服务器如何配置？',
    answer: '<p class="mb-3"><strong>Minecraft服务器穿透完整教程：</strong></p><div class="space-y-3"><div class="bg-gray-50 p-4 rounded"><strong>步骤1：启动MC服务器</strong><br>确保您的Minecraft服务器已经在本地正常运行，默认端口为25565</div><div class="bg-gray-50 p-4 rounded"><strong>步骤2：创建隧道</strong><br>• 协议选择：TCP<br>• 本地地址：127.0.0.1<br>• 本地端口：25565<br>• 选择合适的节点</div><div class="bg-gray-50 p-4 rounded"><strong>步骤3：启动客户端</strong><br>下载客户端，获取配置文件，启动frpc</div><div class="bg-gray-50 p-4 rounded"><strong>步骤4：连接服务器</strong><br>在隧道详情中查看"连接地址"（格式：节点IP:远程端口），使用此地址连接服务器</div></div><p class="mt-3 bg-green-50 p-3 rounded text-sm">✓ <strong>成功标志：</strong>客户端显示"start proxy success"，隧道状态显示"在线"</p>'
  },
  {
    question: '如何查看隧道使用情况和流量消耗？',
    answer: '<p class="mb-2">查看使用情况的方法：</p><div class="space-y-2"><div class="bg-gray-50 p-3 rounded"><strong>📊 总览页面</strong><br>• 查看今日上传/下载流量<br>• 查看剩余流量<br>• 查看隧道数量和在线状态</div><div class="bg-gray-50 p-3 rounded"><strong>📝 用户日志</strong><br>• 查看详细的使用记录<br>• 查看流量消耗明细<br>• 查看连接时间和历史</div><div class="bg-gray-50 p-3 rounded"><strong>🔧 隧道详情</strong><br>• 查看单个隧道的流量使用<br>• 查看隧道创建时间<br>• 查看最近使用时间</div></div>'
  },
  {
    question: '客户端启动后没有反应怎么办？',
    answer: '<p class="mb-2">排查步骤：</p><div class="space-y-2"><div class="bg-red-50 p-3 rounded border border-red-200"><strong>1. 检查配置文件</strong><br>• 确保frpc.ini文件存在<br>• 检查配置内容是否完整<br>• 确认文件编码为UTF-8</div><div class="bg-orange-50 p-3 rounded border border-orange-200"><strong>2. 查看错误信息</strong><br>• 在命令行中运行客户端<br>• 查看输出的错误提示<br>• 根据错误信息进行修复</div><div class="bg-yellow-50 p-3 rounded border border-yellow-200"><strong>3. 检查网络连接</strong><br>• 确保网络连接正常<br>• 检查防火墙设置<br>• 尝试ping节点IP</div><div class="bg-blue-50 p-3 rounded border border-blue-200"><strong>4. 重新下载</strong><br>• 客户端文件可能损坏<br>• 重新下载客户端<br>• 重新获取配置文件</div></div>'
  },
  {
    question: '如何设置客户端开机自启？',
    answer: '<div class="space-y-3"><div class="border-l-4 border-blue-500 pl-3"><strong>Windows系统：</strong><p class="text-sm mt-2">1. 创建批处理文件（start.bat）</p><p class="text-sm">2. 创建快捷方式</p><p class="text-sm">3. 按Win+R，输入shell:startup</p><p class="text-sm">4. 将快捷方式复制到启动文件夹</p></div><div class="border-l-4 border-orange-500 pl-3"><strong>Linux系统：</strong><p class="text-sm mt-2">使用systemd服务（详见"客户端使用指南"）</p></div><div class="border-l-4 border-gray-500 pl-3"><strong>MacOS系统：</strong><p class="text-sm mt-2">1. 打开"系统偏好设置"</p><p class="text-sm">2. 选择"用户与群组"</p><p class="text-sm">3. 点击"登录项"</p><p class="text-sm">4. 添加客户端程序</p></div></div>'
  }
]

// 过滤后的FAQ
const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs
  const query = searchQuery.value.toLowerCase()
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(query) || 
    faq.answer.toLowerCase().includes(query)
  )
})

// 切换FAQ展开状态
const toggleFaq = (index) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

// 滚动到指定区域
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// 加入QQ群
const joinQQGroup = () => {
  window.open('https://qun.qq.com/universal-share/share?ac=1&authKey=py0eEw6f35ao84w8aKMd0amlB46O7DNt8%2BUEg%2Fzbl1i%2FYp7CrG9jgDbpgCAnzmmk&busi_data=eyJncm91cENvZGUiOiI1NzI2NTg4MTUiLCJ0b2tlbiI6ImJsVFlEMFpLMUdRM2JMUnl4NXloamxPYmRGVENYeTIrc1dqWUJxTFFKWjJjUGJ3VzZ0d01YeDNzYlBxVWhJZmwiLCJ1aW4iOiIxMzM3MjEyMzMxIn0%3D&data=e8-IKxOIHbmTkm5FlIk0bTBaGetMO0rbz7rftAdAPLAbhQOOg7m7Y5Ao6tYMnuaMQj6Zedi7beHi_BQPQ-bhgQ&svctype=4&tempid=h5_group_info', '_blank')
}
</script>
