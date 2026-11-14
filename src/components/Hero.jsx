import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight } from './Icons'

const words = ['CRYPTO', 'WEB3', 'INFRA']

const stats = [
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '12+', label: 'Global regions' },
  { value: '24/7', label: 'AI monitoring' },
  { value: 'A–Z', label: 'DevOps lifecycle' },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % words.length)
    }, 2600)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-photo" />
        <div className="hero-glow" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-inner">
        <p className="hero-eyebrow">
          <span className="hero-dot" />
          AI-native blockchain infrastructure
        </p>

        <h1 className="hero-title">
          <span className="hero-line">AI meets</span>
          <span className="hero-line hero-rotate">
            <span className="rotate-word" key={index}>
              {words[index]}
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          Cost-effective, high-quality Layer 1 and Layer 2 blockchain solutions — managed or
          unmanaged, deployed in days.
        </p>

        <div className="hero-actions">
          <a className="btn btn-primary" href="#platform">
            Managed plans
            <ArrowUpRight />
          </a>
          <a className="btn btn-ghost" href="#infrastructure">
            Un-managed
            <ArrowRight />
          </a>
        </div>

        <div className="hero-stats">
          {stats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="hero-side" aria-hidden="true">
        Built on-chain · Run by AI
      </p>
    </section>
  )
}
