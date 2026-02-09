<template>
  <div class="min-h-screen bg-[#f8f7fa] flex flex-col">
    <MainHeader />
    
    <main class="flex-grow py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <div class="border-b border-gray-100 pb-8 mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">免责声明</h1>
          <p class="text-gray-500">生效日期：2025年1月1日</p>
        </div>
        
        <div class="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">1. 服务性质声明</h2>
            <p>由于内网穿透服务的特殊性，SkyFRP 不保证服务的连续性、安全性、稳定性，也不对因服务中断、数据丢失等情况造成的损失承担责任。SkyFRP 提供的服务仅供用户进行合法的网络穿透测试和学习研究使用，严禁用于任何非法用途。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">2. 用户行为责任</h2>
            <p>您对自己在 SkyFRP 上的行为、发布的信息、传输的数据承担全部责任。SkyFRP 不对您通过服务发布、传送的任何内容进行事先审查，也不对该等内容的真实性、准确性、合法性负责。如您的行为侵犯他人权益或违反法律法规，由此产生的任何法律后果和赔偿责任均由您自行承担，与 SkyFRP 无关。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">3. 合法合规使用</h2>
            <p>您必须承诺并保证，您在使用 SkyFRP 服务时，全面遵守中华人民共和国及其他相关国家或地区的法律法规。因您违反法律法规造成的一切后果，由您自行承担。SkyFRP 有权配合司法机关的调查，并提供相关数据和信息。一旦发现您有违法违规行为，SkyFRP 有权立即终止向您提供服务，并向相关部门举报。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">4. 第三方链接</h2>
            <p>SkyFRP 服务可能包含指向第三方网站的链接。SkyFRP 不对这些网站的内容、隐私政策或做法负责。您访问这些网站的风险由您自行承担。</p>
          </section>
          
          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">5. 不可抗力</h2>
            <p>对于因自然灾害、罢工、骚乱、战争、政府行为、司法行政命令、黑客攻击、电信部门技术调整或故障、系统维护等不可抗力因素造成的服务中断或终止，SkyFRP 不承担责任。</p>
          </section>
          
          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">6. 免责声明的修改</h2>
            <p>本免责声明的解释权归 SkyFRP 所有。SkyFRP 有权在必要时修改本免责声明，并在网站上公布。如您继续使用 SkyFRP 服务，则视为您接受修改后的免责声明。</p>
          </section>
          
          <div class="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
            <span class="text-gray-400 text-sm">如有疑问，请咨询法律顾问或联系我们</span>
            <router-link to="/" class="text-[#7367f0] hover:text-[#5f5bd8] font-medium flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              返回首页
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <MainFooter />
  </div>
</template>

<script setup>
import MainHeader from '../../components/MainHeader.vue'
import MainFooter from '../../components/MainFooter.vue'
</script>
