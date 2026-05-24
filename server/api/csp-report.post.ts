/**
 * POST /api/csp-report
 * Recebe violações de CSP do browser (report-uri).
 * Loga no servidor para diagnóstico — não expõe detalhes ao cliente.
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const report = body?.['csp-report'] ?? body
    console.warn('[csp-violation]', JSON.stringify({
      blockedUri:         report?.['blocked-uri'],
      violatedDirective:  report?.['violated-directive'],
      documentUri:        report?.['document-uri'],
      sourceFile:         report?.['source-file'],
    }))
  } catch { /* ignora body malformado */ }

  setResponseStatus(event, 204)
  return ''
})
