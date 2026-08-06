<template>
  <GuiaLayout :guide="guide" />
</template>

<script setup lang="ts">
import { getGuide } from '~/composables/useGuides'

const route = useRoute()
const slug = computed(() => String(route.params.slug))

const guide = getGuide(slug.value)

// Slug desconhecido → 404 real (não gera página fantasma nem dilui o cluster).
if (!guide) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Guia não encontrado',
    fatal: true,
  })
}
</script>
