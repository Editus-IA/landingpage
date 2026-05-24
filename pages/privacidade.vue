<template>
  <div class="min-h-screen bg-editus-950 py-20">
    <div class="max-w-3xl mx-auto px-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-10">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10 7H4M6.5 4.5L4 7l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Voltar ao início
      </NuxtLink>

      <h1 class="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-3">Política de Privacidade</h1>
      <p class="text-white/40 text-sm mb-12">Última atualização: maio de 2026</p>

      <div class="prose prose-invert prose-sm max-w-none space-y-10 text-white/70 leading-relaxed">

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">1. Quem somos (Controlador de Dados)</h2>
          <p>
            Esta política é aplicada pela <strong class="text-white">Editus Tecnologia Ltda</strong>,
            porém a empresa inteirina nesse primeiro momento será a 
            <strong class="text-white">Joaquim Alves LTDA</strong> inscrita no CNPJ sob o nº 
            <strong class="text-white">49.076.076/0001-90</strong>,
            responsável pelo tratamento dos seus dados pessoais coletados nesta plataforma.
          </p>
          <p class="mt-3">
            Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato:
            <a href="mailto:privacidade@editus.com.br" class="text-editus-400 hover:text-editus-300 transition-colors">privacidade@editus.com.br</a>
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">2. Quais dados coletamos</h2>
          <p>Ao se cadastrar na lista de acesso antecipado, coletamos:</p>
          <ul class="list-disc list-inside space-y-1.5 mt-3">
            <li><strong class="text-white">Nome completo</strong>: para personalização da comunicação.</li>
            <li><strong class="text-white">Endereço de e-mail</strong>: para notificação sobre o lançamento e envio de comunicações relacionadas ao produto.</li>
            <li><strong class="text-white">Nome da empresa</strong>: para entender o perfil dos interessados.</li>
            <li><strong class="text-white">Volume mensal de licitações</strong>: para segmentação de acesso e priorização.</li>
            <li><strong class="text-white">Hash do endereço IP</strong>: anonimizado via SHA-256, usado exclusivamente para prevenção de fraudes e spam. Não é possível identificar você a partir deste dado.</li>
            <li><strong class="text-white">Parâmetros UTM da URL</strong> (quando presentes): para atribuição de canal de aquisição. Não identificam o usuário.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">3. Para quê usamos seus dados</h2>
          <p>Seus dados são utilizados exclusivamente para:</p>
          <ul class="list-disc list-inside space-y-1.5 mt-3">
            <li>Notificá-lo sobre a abertura do acesso antecipado ao Editus.</li>
            <li>Enviar comunicações sobre o produto para as quais você deu consentimento explícito.</li>
            <li>Prevenir fraudes e acessos automatizados (uso do hash de IP).</li>
            <li>Entender o perfil do público interessado para priorizar o desenvolvimento do produto.</li>
          </ul>
          <p class="mt-3">
            Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins de marketing externo.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">4. Base legal para o tratamento</h2>
          <p>
            O tratamento dos seus dados é realizado com base no seu <strong class="text-white">consentimento explícito</strong>
            (Art. 7º, I da Lei 13.709/2018, LGPD), fornecido no momento do cadastro ao marcar o checkbox de aceite.
            Você pode revogar o consentimento a qualquer momento entrando em contato pelo e-mail
            <a href="mailto:privacidade@editus.com.br" class="text-editus-400 hover:text-editus-300 transition-colors">privacidade@editus.com.br</a>.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">5. Por quanto tempo armazenamos</h2>
          <p>
            Seus dados são mantidos enquanto você permanecer na lista de acesso antecipado ou até que solicite a exclusão.
            Após o lançamento do produto, os dados migrarão para os termos de serviço da plataforma Editus,
            sobre os quais você será informado oportunamente.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">6. Com quem compartilhamos</h2>
          <p>Seus dados podem ser processados pelos seguintes sub-processadores para operação do serviço:</p>
          <ul class="list-disc list-inside space-y-1.5 mt-3">
            <li><strong class="text-white">Supabase</strong>: banco de dados (armazenamento dos cadastros).</li>
            <li><strong class="text-white">Vercel</strong>: hospedagem da aplicação.</li>
            <li><strong class="text-white">Resend</strong>: envio de e-mails transacionais.</li>
            <li><strong class="text-white">Plausible Analytics</strong>: analytics sem cookies, sem dados pessoais.</li>
          </ul>
          <p class="mt-3">Todos operam em conformidade com o GDPR e fornecem garantias equivalentes à LGPD.</p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">7. Seus direitos (Art. 18 da LGPD)</h2>
          <p>Como titular dos dados, você tem direito a:</p>
          <ul class="list-disc list-inside space-y-1.5 mt-3">
            <li><strong class="text-white">Confirmação e acesso:</strong> saber se tratamos seus dados e obter uma cópia.</li>
            <li><strong class="text-white">Correção:</strong> solicitar a correção de dados incompletos ou desatualizados.</li>
            <li><strong class="text-white">Exclusão:</strong> solicitar a eliminação dos seus dados da lista de waitlist.</li>
            <li><strong class="text-white">Portabilidade:</strong> receber seus dados em formato estruturado.</li>
            <li><strong class="text-white">Revogação do consentimento:</strong> cancelar seu cadastro a qualquer momento.</li>
            <li><strong class="text-white">Oposição:</strong> opor-se ao tratamento com base em determinada finalidade.</li>
          </ul>
          <p class="mt-3">
            Para exercer qualquer destes direitos, envie um e-mail para
            <a href="mailto:privacidade@editus.com.br" class="text-editus-400 hover:text-editus-300 transition-colors">privacidade@editus.com.br</a>.
            Responderemos em até 15 dias úteis.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">8. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados:
            criptografia em trânsito (HTTPS/TLS), hash irreversível de IPs, controles de acesso
            restrito ao banco de dados e políticas de Row Level Security no Supabase.
          </p>
        </section>

        <section>
          <h2 class="text-lg font-semibold text-white mb-3">9. Contato e reclamações</h2>
          <p>
            Em caso de dúvidas, entre em contato com nosso encarregado de proteção de dados (DPO):
            <a href="mailto:privacidade@editus.com.br" class="text-editus-400 hover:text-editus-300 transition-colors">privacidade@editus.com.br</a>.
          </p>
          <p class="mt-3">
            Se considerar que o tratamento dos seus dados viola a LGPD, você pode registrar reclamação
            junto à <strong class="text-white">ANPD (Autoridade Nacional de Proteção de Dados)</strong>:
            <a href="https://www.gov.br/anpd" target="_blank" rel="noopener" class="text-editus-400 hover:text-editus-300 transition-colors">www.gov.br/anpd</a>.
          </p>
        </section>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Política de Privacidade — Editus',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Política de Privacidade da Editus Tecnologia — como coletamos, usamos e protegemos seus dados pessoais.' },
  ],
})
</script>
