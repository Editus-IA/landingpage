export function welcomeEmailHtml(name: string, unsubscribeUrl: string, confirmUrl: string | null): string {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bem-vindo(a) ao Editus</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#1E1654;padding:32px 40px;">
              <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Editus</p>
              <p style="margin:4px 0 0;font-size:13px;color:#a5b4fc;">IA para análise de editais e licitações</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 16px;font-size:22px;font-weight:600;color:#111827;">Olá, ${firstName}! 👋</p>
              <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">
                Seu cadastro na lista de espera do <strong>Editus</strong> foi confirmado.
                Você está entre os primeiros a ter acesso à plataforma de IA que transforma a forma como PMEs
                brasileiras participam de licitações públicas.
              </p>
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <!-- Next steps -->
              <p style="margin:0 0 12px;font-size:14px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">O que acontece a seguir</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;background:#ede9fe;border-radius:50%;text-align:center;line-height:22px;font-size:12px;font-weight:700;color:#7c3aed;">1</span>
                  </td>
                  <td style="padding:10px 0 10px 10px;font-size:15px;color:#374151;line-height:1.5;">
                    <strong>Lançamento antecipado</strong> — você será avisado(a) por este email antes da abertura geral.
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;background:#ede9fe;border-radius:50%;text-align:center;line-height:22px;font-size:12px;font-weight:700;color:#7c3aed;">2</span>
                  </td>
                  <td style="padding:10px 0 10px 10px;font-size:15px;color:#374151;line-height:1.5;">
                    <strong>Acesso prioritário</strong> — membros da lista serão os primeiros a entrar, antes da abertura geral.
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;vertical-align:top;width:28px;">
                    <span style="display:inline-block;width:22px;height:22px;background:#ede9fe;border-radius:50%;text-align:center;line-height:22px;font-size:12px;font-weight:700;color:#7c3aed;">3</span>
                  </td>
                  <td style="padding:10px 0 10px 10px;font-size:15px;color:#374151;line-height:1.5;">
                    <strong>Onboarding guiado</strong> — nossa equipe vai te ajudar a configurar o perfil da sua empresa e rodar a primeira análise de edital.
                  </td>
                </tr>
              </table>
              <!-- CTA de confirmação (double opt-in) -->
              ${confirmUrl
                ? `
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">
                Para garantir sua vaga e confirmar o e-mail, clique no botão abaixo:
              </p>
              <a href="${confirmUrl}" style="display:inline-block;background:#1E1654;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;">
                Confirmar minha inscrição
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">O link expira em 7 dias.</p>
              `
                : ''}
              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">
                Se tiver dúvidas, é só responder este email. Ficamos felizes em ajudar.
              </p>
              <p style="margin:20px 0 0;font-size:15px;color:#374151;">
                Até breve,<br />
                <strong>Time Editus</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                Você está recebendo este email porque se cadastrou na lista de espera do Editus em
                <a href="https://editus.com.br" style="color:#7c3aed;text-decoration:none;">editus.com.br</a>.
                Seus dados são tratados de acordo com nossa
                <a href="https://editus.com.br/privacidade" style="color:#7c3aed;text-decoration:none;">Política de Privacidade</a>
                (LGPD). ·
                <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">Cancelar inscrição</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function welcomeEmailText(name: string, unsubscribeUrl: string, confirmUrl: string | null): string {
  const firstName = name.split(' ')[0]
  const confirmBlock = confirmUrl
    ? `\nPara confirmar sua inscrição e garantir sua vaga, acesse:\n${confirmUrl}\n(O link expira em 7 dias)\n`
    : ''
  return `Olá, ${firstName}!

Seu cadastro na lista de espera do Editus foi confirmado.

Você está entre os primeiros a ter acesso à plataforma de IA que transforma a forma como PMEs brasileiras participam de licitações públicas.
${confirmBlock}
O QUE ACONTECE A SEGUIR

1. Lançamento antecipado — você será avisado(a) por este email antes da abertura geral.
2. Acesso prioritário — membros da lista serão os primeiros a entrar, antes da abertura geral.
3. Onboarding guiado — nossa equipe vai te ajudar a configurar o perfil da sua empresa e rodar a primeira análise de edital.

Se tiver dúvidas, é só responder este email.

Até breve,
Time Editus

---
Você está recebendo este email porque se cadastrou na lista de espera do Editus em https://editus.com.br.
Seus dados são tratados de acordo com nossa Política de Privacidade (LGPD): https://editus.com.br/privacidade
Para cancelar a inscrição: ${unsubscribeUrl}
`
}
