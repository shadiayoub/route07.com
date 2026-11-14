import 'dotenv/config'
import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { contactHandler, healthHandler, rateLimitMiddleware } from './contact.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const port = Number(process.env.PORT) || 8787
const apiKey = process.env.RESEND_API_KEY
const toEmail = process.env.CONTACT_TO_EMAIL
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

if (!apiKey) console.warn('[contact] RESEND_API_KEY is missing — emails will not send.')
if (!toEmail) console.warn('[contact] CONTACT_TO_EMAIL is missing — emails will not send.')

const app = express()

const trustProxy = Number(process.env.TRUST_PROXY || 0)
if (trustProxy > 0) app.set('trust proxy', trustProxy)

app.disable('x-powered-by')
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', healthHandler)
app.post('/api/contact', rateLimitMiddleware, contactHandler)

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
