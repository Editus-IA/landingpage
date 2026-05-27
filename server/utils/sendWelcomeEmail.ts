import { createHmac } from 'node:crypto'
import { Resend } from 'resend'
import { welcomeEmailHtml, welcomeEmailText } from './emailTemplates'

const UNSUB_TTL_DAYS = 30
const CONFIRM_TTL_DAYS = 7

function signToken(payload: string, salt: string, ttlDays: number): string {
  const expiry = Math.floor(Date.now() / 1000) + ttlDays * 86400
  const data = `${payload}|${expiry}`
  const hmac = createHmac('sha256', salt).update(data).digest('hex')
  return `${hmac}.${expiry}`
}

export async function sendWelcomeEmail({ name, email }: { name: string, email: string }): Promise<void> {
  const config = useRuntimeConfig()
  const resend = new Resend(config.resendApiKey)
  const salt = config.ipHashSalt

  const unsubToken = salt ? signToken(email, salt, UNSUB_TTL_DAYS) : ''
  const confirmToken = salt ? signToken(`confirm|${email}`, salt, CONFIRM_TTL_DAYS) : ''

  const unsubscribeUrl = unsubToken
    ? `https://editus.com.br/cancelar?email=${encodeURIComponent(email)}&token=${encodeURIComponent(unsubToken)}`
    : 'https://editus.com.br/privacidade'

  const confirmUrl = confirmToken
    ? `https://editus.com.br/api/confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(confirmToken)}`
    : null

  const result = await resend.emails.send({
    from: 'Editus <boas-vindas@editus.com.br>',
    to: email,
    subject: 'Bem-vindo(a) à lista de espera do Editus',
    html: welcomeEmailHtml(name, unsubscribeUrl, confirmUrl),
    text: welcomeEmailText(name, unsubscribeUrl, confirmUrl),
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
  })

  if (result.error) {
    console.error('[email] Resend retornou erro', { email_hash: email.slice(0, 3) + '***', error: result.error })
    throw new Error(`Resend error: ${result.error.message}`)
  }

  console.warn('[email] boas-vindas enviado', { id: result.data?.id, email_hash: email.slice(0, 3) + '***' })
}
