<template>
  <div class="min-h-screen bg-[#f8f7fa] flex flex-col">
    <MainHeader />
    
    <main class="flex-grow py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <div class="border-b border-gray-100 pb-8 mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">隐私政策</h1>
          <p class="text-gray-500">生效日期：2025年1月1日</p>
        </div>
        
        <div class="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">1. 引言</h2>
            <p>欢迎使用 SkyFRP（以下简称"我们"）。我们深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">2. 我们如何收集和使用您的个人信息</h2>
            <p class="mb-2">我们仅会出于本政策所述的以下目的，收集和使用您的个人信息：</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>注册成为用户：</strong>当您注册账户时，我们会收集您的QQ号码、电子邮件地址，用于创建您的账户、验证身份以及为您提供服务通知。</li>
              <li><strong>使用服务：</strong>在使用我们的内网穿透服务时，我们会自动收集您的使用记录，包括但不限于IP地址、访问时间、流量数据、隧道连接状态等日志信息，以用于故障排查、安全分析和改进服务质量。</li>
              <li><strong>Cookies 和同类技术：</strong>我们使用 Cookies 和同类技术来实现您的个性化体验，例如记录您的登录状态，避免您重复登录。您可以通过浏览器设置管理或删除 Cookies。</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">3. 我们如何共享、转让、公开披露您的个人信息</h2>
            <p class="mb-2">我们不会与任何公司、组织和个人分享您的个人信息，但以下情况除外：</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>在获取明确同意的情况下共享：</strong>获得您的明确同意后，我们会与其他方共享您的个人信息。</li>
              <li><strong>法定情形下的共享：</strong>我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。</li>
              <li><strong>与授权合作伙伴共享：</strong>仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">4. 我们如何保护您的个人信息</h2>
            <p>我们已采取符合业界标准、合理可行的安全防护措施保护您提供的个人信息安全，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会使用加密技术提高个人信息的安全性；我们会使用受信赖的保护机制防止个人信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问个人信息。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">5. 您的权利</h2>
            <p>按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：访问权、更正权、删除权、撤回同意权以及注销账户权。如果您希望行使包含上述在内的各项权利，请通过本政策提供的联系方式联系我们。</p>
          </section>

          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">6. 本政策如何更新</h2>
            <p>我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。对于重大变更，我们还会提供更为显著的通知。</p>
          </section>
          
          <section>
            <h2 class="text-xl font-bold text-gray-900 mb-4">7. 如何联系我们</h2>
            <p>如果您对本隐私政策有任何疑问、意见或建议，通过以下方式与我们联系：<br>电子邮件：support@skyfrp.com</p>
          </section>
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
