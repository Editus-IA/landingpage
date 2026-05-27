<template>
  <!-- Modal overlay -->
  <Teleport to="body">
    <Transition name="popup-fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
        @keydown.esc="close"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <!-- Modal -->
        <div class="relative bg-editus-900 border border-editus-700/60 rounded-2xl shadow-2xl max-w-md w-full p-8" role="dialog" aria-modal="true" aria-label="Garantir acesso antecipado">
          <!-- Fechar -->
          <button
            class="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
            @click="close"
            aria-label="Fechar"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="inline-flex items-center gap-2 bg-editus-800/60 border border-editus-700/40 rounded-full px-3 py-1 mb-5">
            <span class="w-1.5 h-1.5 bg-victory-400 rounded-full animate-pulse" />
            <span class="text-xs text-editus-300 font-medium">Acesso antecipado · Vagas limitadas</span>
          </div>

          <h3 class="text-2xl font-semibold text-white tracking-tight mb-2">
            Garanta sua vaga antes de fechar
          </h3>
          <p class="text-sm text-white/50 mb-6 leading-relaxed">
            Deixe seu e-mail e segmento. Leva 30 segundos.
          </p>

          <!-- Confirmação inline -->
          <div v-if="success" class="text-center py-4">
            <div class="text-victory-400 text-lg font-semibold mb-1">Você está na lista!</div>
            <p class="text-white/50 text-sm">Avisaremos quando o acesso abrir.</p>
          </div>

          <form v-else @submit.prevent="onSubmit" class="space-y-4">
            <!-- Honeypot anti-bot -->
            <input v-if="mounted" v-model="trap" type="text" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" style="display:none;" />

            <div>
              <label for="popup-email" class="block text-xs font-medium text-white/50 mb-1.5">E-mail profissional</label>
              <input
                id="popup-email"
                v-model="popupEmail"
                type="email"
                required
                placeholder="joao@empresa.com.br"
                class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white placeholder-white/25 text-sm focus:outline-none focus:border-editus-500 transition-all"
              />
            </div>

            <div>
              <label for="popup-segment" class="block text-xs font-medium text-white/50 mb-1.5">Segmento de atuação</label>
              <div class="relative">
                <select
                  id="popup-segment"
                  v-model="popupSegment"
                  class="w-full px-4 py-3 bg-editus-800/50 border border-editus-700/50 rounded-lg text-white/80 text-sm focus:outline-none focus:border-editus-500 transition-all appearance-none pr-10"
                >
                  <option value="" disabled selected>Selecione</option>
                  <option value="ti">TI e Tecnologia</option>
                  <option value="construcao">Construção e Engenharia</option>
                  <option value="saude">Saúde e Farmácia</option>
                  <option value="limpeza">Limpeza e Conservação</option>
                  <option value="alimentacao">Alimentação e Nutrição</option>
                  <option value="outro">Outro</option>
                </select>
                <svg class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <input
                id="popup-consent"
                v-model="popupConsent"
                type="checkbox"
                class="mt-0.5 h-4 w-4 shrink-0 rounded border-editus-600 bg-editus-800/50 text-editus-500 focus:ring-editus-500 focus:ring-offset-editus-900 cursor-pointer"
              />
              <label for="popup-consent" class="text-xs text-white/50 leading-relaxed cursor-pointer select-none">
                Li e concordo com a
                <NuxtLink to="/privacidade" class="text-editus-400 hover:text-editus-300 underline underline-offset-2 transition-colors">Política de Privacidade</NuxtLink>
                e autorizo o contato sobre o Editus.
              </label>
            </div>

            <p v-if="errorMsg" class="text-xs text-red-400 font-medium">{{ errorMsg }}</p>

            <button
              type="submit"
              :disabled="loading || !popupConsent"
              class="w-full bg-editus-600 hover:bg-editus-700 text-white rounded-lg px-6 py-3 text-sm font-medium inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-px hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Enviando...</span>
              <span v-else>
                Garantir acesso →
              </span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const { track } = useUmami()
const route = useRoute()

const visible  = ref(false)
const success  = ref(false)
const loading  = ref(false)
const mounted  = ref(false)
const trap         = ref('')
const popupEmail   = ref('')
const popupSegment = ref('')
const popupConsent = ref(false)
const errorMsg     = ref('')

const SCROLL_THRESHOLD = 0.6 // 60% da página

function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  if (scrollable <= 0) return
  const progress = window.scrollY / scrollable
  if (progress >= SCROLL_THRESHOLD) {
    triggerPopup()
  }
}

function triggerPopup() {
  if (sessionStorage.getItem('popup_shown')) return
  visible.value = true
  sessionStorage.setItem('popup_shown', '1')
  track('scroll_popup_shown', { ab_scroll_popup: 'popup' })
  window.removeEventListener('scroll', onScroll)
}

onMounted(() => {
  mounted.value = true
  if (sessionStorage.getItem('popup_shown')) return
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function close() {
  visible.value = false
  sessionStorage.setItem('popup_shown', '1')
}

async function onSubmit() {
  if (trap.value) return // honeypot
  loading.value = true
  errorMsg.value = ''

  const utmSource   = (route.query.utm_source   as string) || null
  const utmMedium   = (route.query.utm_medium   as string) || null
  const utmCampaign = (route.query.utm_campaign as string) || null

  try {
    const res = await $fetch<{ ok: boolean }>('/api/waitlist', {
      method: 'POST',
      body: {
        email: popupEmail.value,
        segment: popupSegment.value,
        consent: popupConsent.value,
        _trap: trap.value,
        source: 'scroll-popup',
        utm_source:   utmSource,
        utm_medium:   utmMedium,
        utm_campaign: utmCampaign,
      },
    })
    if (res?.ok) {
      success.value = true
      sessionStorage.setItem('waitlist_submitted', '1')
      track('waitlist_signup', { source: 'scroll-popup', ab_scroll_popup: 'popup' })
    }
  } catch (err: any) {
    const status = err?.statusCode ?? err?.data?.statusCode
    if (status === 429) {
      errorMsg.value = 'Muitas tentativas. Aguarde um momento.'
    } else {
      errorMsg.value = 'Erro ao salvar. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.22s ease;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}
</style>
