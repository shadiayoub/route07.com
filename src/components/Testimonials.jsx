import { useState } from 'react'
import { ChevronLeft, ChevronRight } from './Icons'

const stories = [
  {
    quote:
      'Not only did it save me time, but it also helped me run an industry-level Layer 1 public blockchain with a fraction of the cost, while maintaining high quality and deep knowledge implementation. The guys at Route07 simply listen and understand!',
    name: 'Jared Robinson',
    role: 'CIC Labs',
    initials: 'JR',
  },
  {
    quote:
      'The service I purchased exceeded my expectations. It was well-made, and beyond what I was looking for. I highly recommend Route07 to anyone seeking high-level blockchain solutions.',
    name: 'Burhan Indari',
    role: 'Satisfied customer',
    initials: 'BI',
  },
  {
    quote:
      'I was blown away by the exceptional customer service I received from the team. The engineer I spoke with was knowledgeable, friendly, and went above and beyond to help me with my issue.',
    name: 'John Lee',
    role: 'Satisfied customer',
    initials: 'JL',
  },
  {
    quote:
      'Route07 truly cares about its customers. I had an issue with my blockchain, the community were frustrated but not for long, since support was quick to respond and resolve the issue to my satisfaction. It is rare to find a company that values its customers so highly.',
    name: 'Thomas Dew',
    role: 'Blockchain operator',
    initials: 'TD',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const story = stories[index]

  const prev = () => setIndex((value) => (value - 1 + stories.length) % stories.length)
  const next = () => setIndex((value) => (value + 1) % stories.length)

  return (
    <section className="section stories" id="stories">
      <div className="container stories-grid">
        <div className="stories-head" data-reveal>
          <p className="eyebrow">04 — Customer stories</p>
          <h2 className="section-title">
            Customer
            <br />
            <em>Stories.</em>
          </h2>
          <p className="lede">
            Teams building real networks on Route07. No lock-in, no black boxes — just infrastructure
            that behaves.
          </p>

          <div className="slider-controls">
            <button type="button" className="slider-btn" onClick={prev} aria-label="Previous story">
              <ChevronLeft />
            </button>
            <button type="button" className="slider-btn" onClick={next} aria-label="Next story">
              <ChevronRight />
            </button>
            <span className="slider-count">
              {String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <figure className="story-card" data-reveal style={{ '--d': '100ms' }}>
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <blockquote key={index} aria-live="polite">
            {story.quote}
          </blockquote>
          <figcaption>
            <span className="avatar" aria-hidden="true">
              {story.initials}
            </span>
            <span>
              <strong>{story.name}</strong>
              <em>{story.role}</em>
            </span>
          </figcaption>
          <div className="story-dots" aria-label="Choose a story">
            {stories.map((item, dotIndex) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={dotIndex === index}
                aria-label={`Story ${dotIndex + 1}: ${item.name}`}
                className={dotIndex === index ? 'is-active' : ''}
                onClick={() => setIndex(dotIndex)}
              />
            ))}
          </div>
        </figure>
      </div>
    </section>
  )
}
