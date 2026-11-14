import { useEffect, useState } from 'react'
import { ArrowUpRight, Close, Menu } from './Icons'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Stories', href: '#stories' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="brand" href="#home" aria-label="Route07 Web3 — home">
          <img src="/logo.png" alt="Route07 Web3" className="brand-logo" />
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a className="nav-link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm" href="#contact">
            Contact us
            <ArrowUpRight />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="mobile-links">
            {links.map((link, index) => (
              <li key={link.href} style={{ '--i': index }}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  <span>0{index + 1}</span>
                  {link.label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-foot">
          <p>AI-native Layer 1 &amp; Layer 2 infrastructure.</p>
          <a
            className="btn btn-primary"
            href="#contact"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Start a conversation
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </header>
  )
}
