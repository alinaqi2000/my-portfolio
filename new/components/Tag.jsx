import React from 'react'
import classNames from 'clsx'
import Link from 'next/link'

const Tag = (props) => {
  const { children, className, slug, ...rest } = props

  const isLinked = Array.isArray(slug)
  const Component = isLinked ? Link : 'span'
  const href = isLinked ? slug.join('/') : undefined

  return (
    <Component
      className={classNames(
        'inline-block select-none rounded border border-line bg-night-surface px-2.5 py-1',
        'font-mono text-xs text-term-orange no-underline',
        isLinked && 'transition-colors hover:border-accent/60 hover:text-accent',
        className
      )}
      href={href}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Tag
