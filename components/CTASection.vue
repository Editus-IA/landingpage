<template>
  <section class="py-24 bg-editus-900 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-[linear-gradient(rgba(100,89,200,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(100,89,200,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-editus-600/15 rounded-full blur-[100px] pointer-events-none" />

    <div class="relative max-w-3xl mx-auto px-6 text-center">
      <!-- Eyebrow -->
      <div class="inline-flex items-center gap-2 bg-editus-800/60 border border-editus-700/40 rounded-full px-4 py-1.5 mb-8">
        <span class="w-1.5 h-1.5 bg-victory-400 rounded-full" />
        <span class="text-xs text-editus-300 font-medium">Acesso antecipado · Vagas limitadas</span>
      </div>

      <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-6">
        Pare de analisar editais<br>
        <span class="text-editus-400">manualmente. Comece hoje.</span>
      </h2>

      <p class="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
        Cada edital que você não analisa a tempo é uma oportunidade perdida.
        Entre na lista e seja avisado quando o acesso abrir.
      </p>

      <!-- Benefícios rápidos -->
      <div class="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-victory-400 flex-shrink-0">
            <path d="M12 3.5L5.5 10 2 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-sm text-white/60">Sem custo no beta</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-victory-400 flex-shrink-0">
            <path d="M12 3.5L5.5 10 2 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-sm text-white/60">Sem compromisso</span>
        </div>
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="text-victory-400 flex-shrink-0">
            <path d="M12 3.5L5.5 10 2 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-sm text-white/60">Selecionamos PMEs que lidam com licitações</span>
        </div>
      </div>

      <WaitlistForm :inline="true" cta-location="cta_section" />

      <p class="mt-5 text-xs text-white/25">
        Sem spam. Só avisamos quando o acesso abrir.
      </p>
    </div>
  </section>
</template>
