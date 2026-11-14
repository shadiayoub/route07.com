import 'dotenv/config'
import express from 'express'
import { Resend } from 'resend'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const port = Number(process.env.PORT) || 8787
const apiKey = process.env.RESEND_API_KEY
const toEmail = process.env.CONTACT_TO_EMAIL
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const fromName = process.env.RESEND_FROM_NAME || 'Route07'

if (!apiKey) console.warn('[contact] RESEND_API_KEY is missing — emails will not send.')
if (!toEmail) console.warn('[contact] CONTACT_TO_EMAIL is missing — emails will not send.')

const resend = apiKey ? new Resend(apiKey) : null
const app = express()

const trustProxy = Number(process.env.TRUST_PROXY || 0)
if (trustProxy > 0) app.set('trust proxy', trustProxy)

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

/* Simple in-memory rate limit: 5 requests per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const requests = new Map()

function rateLimit(req, res, next) {
  const now = Date.now()
  const ip = req.ip || req.socket.remoteAddress || 'unknown'
  const entry = requests.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    requests.set(ip, { start: now, count: 1 })
    return next()
  }

  entry.count += 1

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000)
    res.set('Retry-After', String(retryAfter))
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please try again in a few minutes.',
    })
  }

  next()
}

function cleanupRequests() {
  if (requests.size < 2000) return
  const now = Date.now()
  for (const [ip, entry] of requests) {
    if (now - entry.start > WINDOW_MS) requests.delete(ip)
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mailConfigured: Boolean(resend && toEmail) })
})

app.post('/api/contact', rateLimit, async (req, res) => {
  cleanupRequests()

  const { email, website } = req.body ?? {}

  // Honeypot — bots fill hidden fields. Pretend success and drop it.
  if (typeof website === 'string' && website.trim()) {
    return res.json({ ok: true })
  }

  if (typeof email !== 'string') {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  }

  const cleanEmail = email.trim().replace(/[\r\n]/g, '')

  if (!cleanEmail || cleanEmail.length > 254 || !EMAIL_PATTERN.test(cleanEmail)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' })
  }

  if (!resend || !toEmail) {
    console.error('[contact] Email service is not configured.')
    return res.status(503).json({
      ok: false,
      error: 'Email is not configured yet. Please try again later.',
    })
  }

  const safeEmail = escapeHtml(cleanEmail)
  const submittedAt = new Date().toUTCString()

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [toEmail],
    replyTo: cleanEmail,
    subject: 'New contact request — route07.com',
    text: [
      'New contact request from route07.com',
      '',
      `Email: ${cleanEmail}`,
      `Submitted: ${submittedAt}`,
      '',
      'Reply to this email to reach the person directly.',
    ].join('\n'),
    html: `
      <div style="margin:0;padding:32px;background:#000000;color:#dddacd;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:32px;border:1px solid #2a2930;border-radius:20px;background:#0b0b0e;">
          <p style="margin:0 0 8px;color:#8777e0;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
            Route07 · Contact
          </p>
          <h1 style="margin:0 0 24px;color:#f0ede4;font-size:26px;line-height:1.2;">
            New contact request
          </h1>
          <p style="margin:0 0 20px;color:#a5a39b;font-size:14px;line-height:1.6;">
            Someone asked to talk about launching their blockchain. Reply to this email to reach
            them directly.
          </p>
          <p style="margin:0 0 6px;color:#8f8d84;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">
            Email
          </p>
          <p style="margin:0 0 24px;">
            <a href="mailto:${safeEmail}" style="color:#b4a8ff;font-size:16px;text-decoration:none;">
              ${safeEmail}
            </a>
          </p>
          <p style="margin:0;color:#6d6b64;font-size:11px;">
            Submitted ${submittedAt} from the route07.com contact form.
          </p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return res.status(502).json({
      ok: false,
      error: 'We could not send your message. Please try again in a moment.',
    })
  }

  return res.json({ ok: true })
})

app.use('/api', (req, res) => {
  res.status(404).json({ ok: false, error: 'Not found.' })
})

// Production: serve the Vite build from the same origin as the API.
if (existsSync(distDir)) {
  app.use(express.static(distDir, { index: false, maxAge: '1h' }))
  app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')))
}

app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ ok: false, error: 'Invalid request body.' })
  }
  console.error('[server] Unhandled error:', err)
  return res.status(500).json({ ok: false, error: 'Something went wrong.' })
})

app.listen(port, () => {
  console.log(`[route07] Server running at http://localhost:${port}`)
  console.log(`[route07] Contact emails → ${toEmail || 'NOT CONFIGURED'} (from ${fromEmail})`)
})
