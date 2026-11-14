import { useState } from 'react'
import { ArrowUpRight } from './Icons'

const idleNote = 'No spam. A real engineer replies within one business day.'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email.trim() || status === 'sending') return

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || 'We could not send your message. Please try again.')
      }

      setStatus('sent')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const note =
    status === 'sending'
      ? 'Sending your request…'
      : status === 'sent'
        ? 'You message has been sent successfully'
        : status === 'error'
          ? error
          : idleNote

  return (
    <section className="section cta-section" id="contact">
      <div className="container">
        <div className="cta-panel" data-reveal>
          <div className="cta-grid" aria-hidden="true" />
          <p className="eyebrow eyebrow-center">Ready when you are</p>
          <h2 className="cta-title">
            Ready to launch<span>?</span>
          </h2>
          <p className="cta-sub">Talk to us and get your blockchain running in days, not months.</p>

          <form className="cta-form" onSubmit={handleSubmit} aria-busy={status === 'sending'}>
            <label className="sr-only" htmlFor="cta-email">
              Email address
            </label>
            <input
              id="cta-email"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={email}
              aria-describedby="cta-note"
              aria-invalid={status === 'error'}
              onChange={(event) => {
                setEmail(event.target.value)
                if (status === 'sent' || status === 'error') setStatus('idle')
              }}
              required
            />
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="cta-website">Website</label>
              <input
                id="cta-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Talk to us'}
              {status === 'sending' ? (
                <span className="spinner" aria-hidden="true" />
              ) : (
                <ArrowUpRight />
              )}
            </button>
          </form>

          <p
            id="cta-note"
            className={`cta-note ${status === 'sent' ? 'is-sent' : ''} ${
              status === 'error' ? 'is-error' : ''
            }`}
            role="status"
            aria-live="polite"
          >
            {note}
          </p>
        </div>
      </div>
    </section>
  )
}
