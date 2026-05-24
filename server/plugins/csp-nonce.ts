/**
 * Plugin Nitro: injeta nonce por request na CSP e no HTML renderizado.
 *
 * Substitui 'unsafe-inline' por 'nonce-<valor>' em script-src e style-src,
 * eliminando a principal brecha da Content-Security-Policy atual.
 *
 * O nonce é gerado via crypto.randomBytes (16 bytes → base64url, 22 chars),
 * único por request, nunca reutilizado.
 *
 * Referência: https://w3c.github.io/webappsec-csp/#nonce-source
 */

import { randomBytes } from 'node:crypto'

const isDev = process.env.NODE_ENV === 'development'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html, { event }) => {
    const nonce = randomBytes(16).toString('base64url')

    event.context.cspNonce = nonce

    // Em dev o Vite injeta scripts inline/módulos que não passam pelo SSR,
    // então manter a substituição de nonce causaria violações constantes.
    // O plugin só altera a CSP em produção.
    if (!isDev) {
      const existingCsp = getResponseHeader(event, 'content-security-policy') as string | undefined
      if (existingCsp) {
        const updated = existingCsp.replace(
          /(script-src[^;]*)'unsafe-inline'/g,
          `$1'nonce-${nonce}'`,
        )
        setResponseHeader(event, 'content-security-policy', updated)
      }
    }

    // Injeta nonce em todas as tags <script> e <style> do SSR
    const injectNonce = (tag: string) =>
      tag.replace(/^<(script|style)(\s|>)/gi, `<$1 nonce="${nonce}"$2`)

    if (Array.isArray(html.head)) {
      html.head = html.head.map(injectNonce)
    }
    if (Array.isArray(html.bodyAppend)) {
      html.bodyAppend = html.bodyAppend.map(injectNonce)
    }
    if (Array.isArray(html.bodyPrepend)) {
      html.bodyPrepend = html.bodyPrepend.map(injectNonce)
    }
  })
})
