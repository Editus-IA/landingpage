<template>
  <div>
    <TheNavbar />
    <main id="conteudo-principal">
      <!-- 1. Hero: proposta de valor + CTA imediato -->
      <HeroSection />
      <!-- 2. Problema: por que PMEs perdem editais (empatia) -->
      <ProblemSection />
      <!-- 3. Como funciona: pipeline de 5 etapas + 12 agentes -->
      <HowItWorks />
      <!-- 4. Funcionalidades: o que o Editus analisa + CTA mid-page -->
      <FeaturesSection />
      <!-- 5. Dashboard: prova visual do produto (client-only — evita SSR sem CSS) -->
      <ClientOnly>
        <DashboardPreview />
        <template #fallback>
          <div class="py-24 bg-white" />
        </template>
      </ClientOnly>
      <!-- 6. FAQ: responde objeções, otimizado para AEO/featured snippets -->
      <FAQSection />
      <!-- 7. CTA final: seção de urgência + ancoragem para o formulário -->
      <!-- <CTASection /> -->
      <!-- 8. Formulário completo de waitlist (name, email, empresa, volume) -->
      <WaitlistForm />
    </main>
    <TheFooter />
  </div>
</template>
