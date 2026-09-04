import React from 'react'
import SVG from 'react-inlinesvg'

const Icon = ({ source, src, width = 28, ...props }) => {
  if (!source && !src) return null

  // If we already have the raw SVG markup (resolved by the icon computed
  // field), render it directly — SSR-safe and instant. No need to wait for
  // react-inlinesvg's client-side componentDidMount fetch cycle.
  if (source && typeof source === 'string' && source.includes('<svg')) {
    return (
      <span
        {...props}
        style={{ display: 'inline-flex', width, height: width, ...props.style }}
        dangerouslySetInnerHTML={{ __html: source }}
      />
    )
  }

  // Fallback: URL-only — let react-inlinesvg fetch it client-side
  return <SVG src={source || src} {...props} width={width} />
}

export default Icon
