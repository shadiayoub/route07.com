import { ArrowRight, ArrowUpRight, Shield, Sparkles } from './Icons'

const promises = [
  'Optimized infrastructure to fit the blockchain network needs, with built-in high-availability and security.',
  'Responsive dashboard allows you to access valuable insight and manage blockchain settings.',
  'Tools to help you generate and run decentralized applications (dApps) seamlessly.',
  'AI powered infrastructure monitoring allowing automatic adaptability and self adjustment.',
  'A–Z DevOps lifecycle, so you focus on business while our engineers take care of the tech.',
  'Global cluster pools for maximum service availability, data integrity, and information confidentiality.',
]

export default function Features() {
  return (
    <section className="section platform" id="platform">
      <div className="container promise-grid">
        <div className="promise-head" data-reveal>
          <p className="eyebrow">01 — The platform</p>
          <h2 className="section-title">
            High availability.
            <br />
            <em>By default.</em>
          </h2>
          <p className="lede">
            We understand blockchain, and we built the infrastructure for it — with built-in
            security, global redundancy, and AI that keeps everything in tune.
          </p>
          <a className="text-link" href="#services">
            Explore services
            <ArrowRight />
          </a>
        </div>

        <ul className="promise-list">
          {promises.map((promise, index) => (
            <li key={promise} data-reveal style={{ '--d': `${index * 55}ms` }}>
              <span className="promise-num">{String(index + 1).padStart(2, '0')}</span>
              <p>{promise}</p>
              <ArrowUpRight className="promise-arrow" />
            </li>
          ))}
        </ul>
      </div>

      <div className="container feature-grid">
        <article className="feature-card" data-reveal>
          <div className="feature-top">
            <span className="feature-icon">
              <Sparkles />
            </span>
            <span className="feature-eyebrow">AI monitoring</span>
          </div>
          <h3>SmartInsight.</h3>
          <p>
            Access valuable insights into network behavior, identify areas for improvement, manage
            support requests and make data-driven decisions.
          </p>

          <div className="chart-wrap" aria-hidden="true">
            <div className="chart-meta">
              <span>Network health</span>
              <span className="chart-live">
                <i /> Live
              </span>
            </div>
            <svg className="chart" viewBox="0 0 420 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8777e0" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8777e0" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="chartLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8777e0" />
                  <stop offset="100%" stopColor="#c4baff" />
                </linearGradient>
              </defs>
              <path
                d="M0 88 C 40 80, 58 62, 96 68 S 150 40, 188 48 S 244 20, 282 32 S 340 52, 420 18 L 420 110 L 0 110 Z"
                fill="url(#chartFill)"
              />
              <path
                d="M0 88 C 40 80, 58 62, 96 68 S 150 40, 188 48 S 244 20, 282 32 S 340 52, 420 18"
                fill="none"
                stroke="url(#chartLine)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <div className="chart-tags">
              <span>Latency 12ms</span>
              <span>Throughput 4.2k tx/s</span>
              <span>Peers 248</span>
            </div>
          </div>
        </article>

        <article className="feature-card feature-card-api" data-reveal style={{ '--d': '120ms' }}>
          <div className="feature-top">
            <span className="feature-icon">
              <Shield />
            </span>
            <span className="feature-eyebrow">Secure platform</span>
          </div>
          <h3>Api Access.</h3>
          <p>
            Highly available, well documented developer API access to blockchain services and data,
            using industry standards for immediate adaptation.
          </p>

          <div className="code-card" aria-hidden="true">
            <div className="code-head">
              <span className="code-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="code-method">GET</span>
              <span className="code-path">/v1/nodes/status</span>
            </div>
            <pre>
              <code>
                <span className="tok-p">{'{'}</span>
                {'\n  '}
                <span className="tok-k">"status"</span>
                <span className="tok-p">:</span> <span className="tok-s">"operational"</span>
                <span className="tok-p">,</span>
                {'\n  '}
                <span className="tok-k">"region"</span>
                <span className="tok-p">:</span> <span className="tok-s">"eu-west-1"</span>
                <span className="tok-p">,</span>
                {'\n  '}
                <span className="tok-k">"uptime"</span>
                <span className="tok-p">:</span> <span className="tok-n">99.99</span>
                <span className="tok-p">,</span>
                {'\n  '}
                <span className="tok-k">"ai_monitored"</span>
                <span className="tok-p">:</span> <span className="tok-b">true</span>
                {'\n'}
                <span className="tok-p">{'}'}</span>
              </code>
            </pre>
          </div>
        </article>
      </div>
    </section>
  )
}
