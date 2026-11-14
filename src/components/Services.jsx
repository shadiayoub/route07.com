import { Sparkles } from './Icons'

const rows = [
  ['Blockchain Hosting', 'PoA or PoW EVM', 'dApps & Smart Contracts', 'Validator Nodes'],
  ['Global Cloud', 'Cyber Security', 'High Availability', 'RPC Nodes'],
  ['AI Monitoring', 'A–Z DevOps', 'Global Clusters', 'Block Explorers'],
]

function MarqueeRow({ items, reverse, duration }) {
  return (
    <div
      className={`marquee-row ${reverse ? 'is-reverse' : ''}`}
      style={{ '--duration': `${duration}s` }}
    >
      {[0, 1].map((group) => (
        <div className="marquee-group" key={group} aria-hidden={group === 1}>
          {items.map((item) => (
            <span className="pill" key={`${group}-${item}`}>
              <Sparkles />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container services-head">
        <div>
          <p className="eyebrow">02 — Services</p>
          <h2 className="section-title">
            Everything you need,
            <br />
            <em>on-chain.</em>
          </h2>
        </div>
        <p className="lede">
          Tailor-made validator nodes, public RPC nodes, and dApps nodes. Dedicated hybrid cloud for
          your blockchain — private, isolated, and globally distributed.
        </p>
      </div>

      <div className="marquee-band" aria-label="Route07 services">
        <MarqueeRow items={rows[0]} duration={46} />
        <MarqueeRow items={rows[1]} duration={54} reverse />
        <MarqueeRow items={rows[2]} duration={50} />
      </div>

      <p className="container services-note">
        Managed or unmanaged. You choose the layer of control.
      </p>
    </section>
  )
}
