import { Facebook, Linkedin, Twitter } from './Icons'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'Account', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Privacy policy', href: '#' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact us', href: '#contact' },
      { label: 'Blog', href: '#' },
      { label: 'Help center', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'BaaS comparison', href: '#' },
      { label: 'Blockchain development', href: '#services' },
      { label: 'dApps & smart contracts', href: '#services' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'x07 Block Explorer', href: '#' },
      { label: 'iBridge 2', href: '#' },
      { label: 'Hardware nodes', href: '#' },
    ],
  },
]

const socials = [
  { label: 'LinkedIn', Icon: Linkedin },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Facebook', Icon: Facebook },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a href="#home" aria-label="Route07 Web3 — back to top">
            <img src="/logo.png" alt="Route07 Web3" />
          </a>
          <p>
            AI-native Layer 1 and Layer 2 blockchain infrastructure. Managed plans, unmanaged nodes,
            and a team that understands the chain.
          </p>
          <div className="socials">
            {socials.map(({ label, Icon }) => (
              <a key={label} href="#" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <nav className="footer-col" key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Route07 — All rights reserved.</p>
        <div className="footer-meta">
          <span className="lang-pill">EN · Global</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
