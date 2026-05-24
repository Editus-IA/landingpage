import * as Sentry from '@sentry/nuxt'

const dsn = process.env.SENTRY_DSN || ''

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (event.request) event.request.data = undefined
      event.user = undefined
      return event
    },
  })
}
