// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
  },
  dirs: {
    src: ['.'],
  },
}).append(
  {
    rules: {
      // Segurança: detecta eval e funções perigosas
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Segurança: previne injeção via prototype pollution
      'no-extend-native': 'error',
      'no-proto': 'error',

      // Segurança: força uso explícito de === (previne type coercion exploits)
      'eqeqeq': ['error', 'always'],

      // Segurança: garante que secrets não vazem em console.log acidentalmente
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // Qualidade: sem variáveis não usadas (reduz superfície de ataque)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Segurança: sem any explícito (força tipagem que previne bypasses)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Segurança Vue: previne v-html (XSS)
      'vue/no-v-html': 'error',

      // Segurança Vue: previne uso de innerHTML via template
      'vue/no-v-text-v-html-on-component': 'error',
    },
  },
  {
    // Relaxa regras para arquivos de config
    files: ['*.config.*', 'nuxt.config.ts'],
    rules: {
      'no-console': 'off',
    },
  },
)
