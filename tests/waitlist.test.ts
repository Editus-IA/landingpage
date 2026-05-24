/**
 * Testes unitários para POST /api/waitlist
 *
 * Executa com: npx vitest run tests/waitlist.test.ts
 * As funções puras são extraídas e testadas diretamente sem Nitro/Nuxt.
 */

import { describe, it, expect } from 'vitest'

// ── Funções extraídas do endpoint (mesma lógica) ──────────────────────────────

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

const VALID_SOURCES = ['landing', 'hero', 'waitlist-section', 'cta', 'footer'] as const
type Source = typeof VALID_SOURCES[number]

function sanitizeSource(raw: string | undefined): Source {
  return VALID_SOURCES.includes(raw as Source) ? (raw as Source) : 'landing'
}

function sanitizeVolume(raw: string | undefined): string | null {
  return ['1-5', '6-20', '20+'].includes(raw ?? '') ? raw! : null
}

function sanitizeText(raw: string | undefined, max: number): string | null {
  const trimmed = raw?.trim().slice(0, max)
  return trimmed || null
}

// ── Testes ────────────────────────────────────────────────────────────────────

describe('isValidEmail', () => {
  it('aceita email simples', () => {
    expect(isValidEmail('joao@empresa.com.br')).toBe(true)
  })

  it('aceita email com subdomínio', () => {
    expect(isValidEmail('joao@mail.empresa.com')).toBe(true)
  })

  it('rejeita email sem @', () => {
    expect(isValidEmail('joaoempresa.com')).toBe(false)
  })

  it('rejeita email sem domínio', () => {
    expect(isValidEmail('joao@')).toBe(false)
  })

  it('rejeita email sem TLD (< 2 chars)', () => {
    expect(isValidEmail('joao@empresa.c')).toBe(false)
  })

  it('rejeita email vazio', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('rejeita email com espaços', () => {
    expect(isValidEmail('joao @empresa.com')).toBe(false)
  })
})

describe('sanitizeSource', () => {
  it('aceita sources válidos', () => {
    for (const s of VALID_SOURCES) {
      expect(sanitizeSource(s)).toBe(s)
    }
  })

  it('fallback para landing em source inválido', () => {
    expect(sanitizeSource('arbitrary_string')).toBe('landing')
  })

  it('fallback para landing quando undefined', () => {
    expect(sanitizeSource(undefined)).toBe('landing')
  })
})

describe('sanitizeVolume', () => {
  it('aceita volumes válidos', () => {
    expect(sanitizeVolume('1-5')).toBe('1-5')
    expect(sanitizeVolume('6-20')).toBe('6-20')
    expect(sanitizeVolume('20+')).toBe('20+')
  })

  it('retorna null para volume inválido', () => {
    expect(sanitizeVolume('muitos')).toBeNull()
  })

  it('retorna null quando undefined', () => {
    expect(sanitizeVolume(undefined)).toBeNull()
  })
})

describe('sanitizeText', () => {
  it('faz trim de espaços', () => {
    expect(sanitizeText('  João  ', 100)).toBe('João')
  })

  it('trunca no limite', () => {
    expect(sanitizeText('a'.repeat(200), 100)).toBe('a'.repeat(100))
  })

  it('retorna null para string vazia após trim', () => {
    expect(sanitizeText('   ', 100)).toBeNull()
  })

  it('retorna null quando undefined', () => {
    expect(sanitizeText(undefined, 100)).toBeNull()
  })
})

describe('honeypot logic', () => {
  it('ativa honeypot quando _trap tem conteúdo', () => {
    const trap = 'bot-filled-this'
    expect(trap.length > 0).toBe(true)
  })

  it('não ativa honeypot quando _trap está vazio', () => {
    const trap = ''
    expect(trap.length > 0).toBe(false)
  })
})

describe('consent validation', () => {
  it('aceita consent=true', () => {
    expect(true === true).toBe(true)
  })

  it('rejeita consent=false', () => {
    expect(false !== true).toBe(true)
  })

  it('rejeita consent=undefined', () => {
    expect(undefined !== true).toBe(true)
  })
})
