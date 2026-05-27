<template>
  <footer class="bg-editus-950 py-12">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-7 h-7 bg-editus-700 rounded-lg flex items-center justify-center">
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
              >
                <rect
                  x="2"
                  y="2"
                  width="6"
                  height="4"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="2"
                  y="7.5"
                  width="6"
                  height="4"
                  rx="1"
                  fill="white"
                  opacity="0.6"
                />
                <rect
                  x="2"
                  y="13"
                  width="6"
                  height="3"
                  rx="1"
                  fill="white"
                  opacity="0.3"
                />
                <path
                  d="M10 5.5h6M10 9h4.5M10 12.5h3"
                  stroke="white"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <span class="text-white font-semibold tracking-tight">
              edit<span class="text-editus-500">us</span>
            </span>
          </div>
          <p class="text-xs text-white/30 max-w-xs leading-relaxed">
            Inteligência artificial para PMEs brasileiras que competem em licitações públicas.
          </p>
        </div>

        <!-- Links -->
        <div class="flex gap-12">
          <div>
            <p class="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
              Produto
            </p>
            <div class="space-y-2">
              <a
                href="#como-funciona"
                class="block text-sm text-white/30 hover:text-white/60 transition-colors"
              >Como funciona</a>
              <a
                href="#features"
                class="block text-sm text-white/30 hover:text-white/60 transition-colors"
              >Funcionalidades</a>
              <a
                href="#faq"
                class="block text-sm text-white/30 hover:text-white/60 transition-colors"
              >Perguntas frequentes</a>
              <a
                href="#waitlist"
                class="block text-sm text-white/30 hover:text-white/60 transition-colors"
              >Acesso antecipado</a>
            </div>
          </div>
          <div>
            <p class="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
              Legal
            </p>
            <div class="space-y-2">
              <NuxtLink
                to="/privacidade"
                class="block text-sm text-white/30 hover:text-white/60 transition-colors"
              >Política de Privacidade</NuxtLink>
              <span
                class="block text-sm text-white/20 cursor-default"
                title="Em breve"
              >Termos de uso</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 pt-8 border-t border-editus-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-white/20">
          © 2026 Editus. Todos os direitos reservados.
        </p>
        <p class="text-xs text-white/20">
          Editus Tecnologia Ltda. · CNPJ 49.076.076/0001-90 ·
          <a
            href="mailto:privacidade@editus.com.br"
            class="hover:text-white/40 transition-colors"
          >privacidade@editus.com.br</a>
        </p>
      </div>
    </div>
  </footer>
</template>
