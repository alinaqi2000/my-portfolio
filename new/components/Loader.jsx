import React from 'react'
import classNames from 'clsx'

const Loader = (props) => {
  const { className, text } = props

  return (
    <div className="w-full text-center">
      <div className={classNames('mx-auto h-10 w-10 animate-spin text-accent', className)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
        </svg>
      </div>
      {text && <p className="prose prose-invert">{text}</p>}
    </div>
  )
}

export default Loader
