<template>
  <div>
    <a
      href="#conteudo-principal"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-editus-600 focus:text-white focus:rounded-lg focus:font-medium focus:text-sm"
    >Ir para o conteúdo principal</a>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()

// Injeta o script do Umami via runtimeConfig (lido em runtime, não em build-time)
// Isso garante que variáveis de ambiente definidas após o build também funcionem
if (config.public.umamiScriptUrl && config.public.umamiWebsiteId) {
  useHead({
    script: [
      {
        'src': config.public.umamiScriptUrl,
        'defer': true,
        'data-website-id': config.public.umamiWebsiteId,
        // Umami Cloud ignora localhost por padrão — este atributo força o tracking em dev
        'data-host-url': 'https://cloud.umami.is',
      },
    ],
  })
}
</script>
