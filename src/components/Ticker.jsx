const items = [
  'Layer 1',
  'Layer 2',
  'Validator nodes',
  'RPC nodes',
  'dApps & smart contracts',
  'Global cloud',
  'AI monitoring',
  'DevOps',
]

export default function Ticker() {
  return (
    <div className="ticker" aria-label="What Route07 runs">
      <div className="ticker-track">
        {[0, 1].map((group) => (
          <div className="ticker-group" key={group} aria-hidden={group === 1}>
            {items.map((item) => (
              <span className="ticker-item" key={`${group}-${item}`}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
