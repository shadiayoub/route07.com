const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
}

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function ArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  )
}

export function ChevronLeft(props) {
  return (
    <svg {...base} {...props}>
      <path d="m14 6-6 6 6 6" />
    </svg>
  )
}

export function ChevronRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="m10 6 6 6-6 6" />
    </svg>
  )
}

export function Menu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function Close(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function Sparkles(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.7 9 19 10.7 13.7 12.4 12 18l-1.7-5.6L5 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 15.5 19.2 18l2.3.8-2.3.8-.7 2.4-.7-2.4-2.3-.8 2.3-.8.7-2.5Z" />
    </svg>
  )
}

export function Shield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5.2c0 4.3 2.8 7.5 7 9.8 4.2-2.3 7-5.5 7-9.8V6l-7-3Z" />
      <path d="m9.3 11.8 1.9 1.9 3.6-3.8" />
    </svg>
  )
}

export function Plus(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function Globe(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3c2.5 2.5 3.7 5.6 3.7 9S14.5 18.5 12 21c-2.5-2.5-3.7-5.6-3.7-9S9.5 5.5 12 3Z" />
    </svg>
  )
}

export function Activity(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3.6l2.2-6 4 12 2.2-6H21" />
    </svg>
  )
}

export function Cpu(props) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9.5 9.5h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  )
}

export function Linkedin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 9.5V18M6.5 6.2v.1M11 18v-4.8c0-1.8 1-3.2 2.8-3.2 1.9 0 2.7 1.3 2.7 3.3V18M11 9.5V18" />
    </svg>
  )
}

export function Twitter(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4h3.6L12 9.3 16.6 4H20l-5.8 6.6L20.5 20h-3.6l-4.7-5.6L7 20H3.5l6.2-7L4 4Z" />
    </svg>
  )
}

export function Facebook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5h1.4V5.1c-.7-.1-1.6-.2-2.5-.2-2.5 0-4.1 1.5-4.1 4.2V11H8.5v3h2.4v7" />
    </svg>
  )
}
