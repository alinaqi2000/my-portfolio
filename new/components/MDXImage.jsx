import React from 'react'

/**
 * MDX image — uses a plain <img> instead of next/image so it works with
 * external URLs and README images that don't provide width/height.
 * Relative paths are already rewritten to GitHub raw URLs by the parser.
 */
const MDXImage = (props) => {
  const { src, alt, width, ...rest } = props

  return (
    <figure className="mx-auto my-8" style={width ? { maxWidth: `${width}px` } : undefined}>
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        className="mx-auto rounded-lg"
        style={width ? { width: `${width}px` } : { maxWidth: '100%' }}
        {...rest}
      />
      {alt && (
        <></> // <figcaption className="text-ink-mute mt-2 text-center text-sm italic">{alt}</figcaption>
      )}
    </figure>
  )
}

export default MDXImage
