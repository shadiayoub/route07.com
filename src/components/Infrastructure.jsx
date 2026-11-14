import { Globe, Plus } from './Icons'

const points = [
  'We understand blockchain, and we built the infrastructure for it with sophistication.',
  'Tailor-made blockchain validator nodes, public services RPC nodes, and dApps nodes.',
  'Dedicated hybrid cloud for your blockchain — private, isolated, and globally distributed.',
]

const nodes = [
  { name: 'validator-01', region: 'eu-west-1', width: '92%' },
  { name: 'rpc-public-04', region: 'us-east-1', width: '78%' },
  { name: 'dapp-cluster-02', region: 'ap-south-1', width: '84%' },
]

const metrics = [
  { value: '12ms', label: 'Latency' },
  { value: '248', label: 'Peers' },
  { value: '34%', label: 'CPU' },
]

export default function Infrastructure() {
  return (
    <section className="section infrastructure" id="infrastructure">
      <div className="container infra-grid">
        <div className="infra-copy" data-reveal>
          <p className="eyebrow">03 — Infrastructure</p>
          <h2 className="section-title">
            We understand blockchain.
            <br />
            <em>We built the infrastructure for it.</em>
          </h2>
          <p className="lede">
            Dedicated hybrid cloud, private and isolated, with a global footprint. Our engineers run
            the tech while you run the business.
          </p>

          <ul className="check-list">
            {points.map((point) => (
              <li key={point}>
                <span className="check-icon">
                  <Plus />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="console" data-reveal style={{ '--d': '100ms' }}>
          <div className="console-head">
            <span>r07 · network overview</span>
            <span className="live">
              <i /> Live
            </span>
          </div>

          <div className="console-body">
            {nodes.map((node) => (
              <div className="node-row" key={node.name}>
                <div>
                  <p className="node-name">{node.name}</p>
                  <p className="node-sub">
                    <Globe /> {node.region}
                  </p>
                </div>
                <span className="node-status">Operational</span>
                <div className="bar">
                  <i style={{ width: node.width }} />
                </div>
              </div>
            ))}
          </div>

          <div className="console-metrics">
            {metrics.map((metric) => (
              <div className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="console-foot">
            <span>AI monitoring</span>
            <span>Auto-scaling enabled</span>
          </div>
        </div>
      </div>
    </section>
  )
}
