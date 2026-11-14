import { Resend } from 'resend'

/*
 * Shared contact-form logic.
 * Used by both the local Express server (server/index.js) and the Vercel
 * serverless functions in /api. Keep this file platform-agnostic: it only
 * relies on the Node http request/response shape.
 */

const apiKey = process.env.RESEND_API_KEY
const toEmail = process.env.CONTACT_TO_EMAIL
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const fromName = process.env.RESEND_FROM_NAME || 'Route07'

const resend = apiKey ? new Resend(apiKey) : null

/* Simple in-memory rate limit: 5 requests per IP per 10 minutes. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5
const requests = new Map()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function getClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

function cleanupRequests() {
  if (requests.size < 2000) return
  const now = Date.now()
  for (const [ip, entry] of requests) {
    if (now - entry.start > WINDOW_MS) requests.delete(ip)
  }
}

/**
 * Returns true when the request may proceed, false when a 429 was sent.
 * On serverless hosts the map is per-instance, so this is best-effort only.
 */
export function checkRateLimit(req, res) {
  cleanupRequests()

  const now = Date.now()
  const ip = getClientIp(req)
  const entry = requests.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    requests.set(ip, { start: now, count: 1 })
    return true
  }

  entry.count += 1

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000)
    res.setHeader('Retry-After', String(retryAfter))
    res.status(429).json({
      ok: false,
      error: 'Too many requests. Please try again in a few minutes.',
    })
    return false
  }

  return true
}

export function rateLimitMiddleware(req, res, next) {
  if (checkRateLimit(req, res)) next()
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  )
}

function parseBody(req) {
  if (req.body == null) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  return req.body
}

export function healthHandler(req, res) {
  res.status(200).json({ ok: true, mailConfigured: Boolean(resend && toEmail) })
}

export async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  if (!checkRateLimit(req, res)) return

  const body = parseBody(req)

  if (body === null || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body.' })
  }

  const { email, website } = body

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
}
