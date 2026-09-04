import React from 'react'
import classNames from 'clsx'

/**
 * Scroll-based section appearance.
 *
 * Pattern (per current best practice): one shared IntersectionObserver
 * detects when an element enters the viewport — no scroll listeners, no
 * layout thrashing — then a CSS class transition animates it in
 * (compositor-safe transform/opacity only).
 *
 * Props:
 *  - as            element/tag to render (default 'div')
 *  - animation     'fade-in' | 'slide-in-left' | 'slide-in-right' | 'slide-in-top' |
 *                  'slide-in-bottom' | 'zoom-in' | 'scale-x' | 'none' (combinable)
 *  - stagger       ms between children — wraps each child in its own reveal
 *                  wrapper so grids/flex lists cascade (SSR-safe)
 *  - delay         fixed delay in ms
 *  - duration      transition duration in ms (default 700)
 *  - threshold     IO threshold (default 0.15)
 *  - triggerOnce   unobserve after reveal (default true)
 */
let sharedObserver = null
const observed = new WeakMap()

const getObserver = () => {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const opts = observed.get(entry.target)
        if (!opts) continue
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          if (opts.triggerOnce) {
            sharedObserver.unobserve(entry.target)
            observed.delete(entry.target)
          }
        } else if (!opts.triggerOnce) {
          entry.target.classList.remove('is-revealed')
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  return sharedObserver
}

const Reveal = (props) => {
  const {
    as: Tag = 'div',
    className,
    animation = 'fade-in',
    stagger,
    delay,
    duration,
    threshold,
    triggerOnce = true,
    style = {},
    children,
    ...rest
  } = props

  const ref = React.useRef(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el || animation === 'none') return

    observed.set(el, { triggerOnce, threshold })
    getObserver().observe(el)
    return () => {
      if (sharedObserver) sharedObserver.unobserve(el)
      observed.delete(el)
    }
  }, [animation, triggerOnce, threshold])

  // Staggered group: wrap each child in its own reveal wrapper
  const content =
    stagger && animation !== 'none'
      ? React.Children.map(children, (child, i) =>
          child == null ? child : (
            <Reveal animation={animation} delay={i * stagger} className="reveal-item">
              {child}
            </Reveal>
          )
        )
      : children

  return (
    <Tag
      ref={ref}
      data-reveal={animation}
      className={classNames('reveal', className)}
      style={{
        transitionDelay: delay ? `${delay}ms` : undefined,
        transitionDuration: duration ? `${duration}ms` : undefined,
        ...style,
      }}
      {...rest}
    >
      {content}
    </Tag>
  )
}

export default Reveal
