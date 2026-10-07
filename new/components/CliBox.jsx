import React from 'react'
import classNames from 'clsx'
import { FiCopy, FiCheck } from 'react-icons/fi'

/**
 * Herdr CLI copy box — a horizontal terminal-prompt bar with a
 * copy-to-clipboard button on the right.
 */
const CliBox = ({ command, className, ...rest }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // Clipboard unavailable (e.g. insecure context) — ignore
    }
  }

  return (
    <div
      className={classNames(
        'flex max-w-xl items-center justify-between gap-4',
        'rounded-md border glass-border glass-subtle p-3',
        className
      )}
      {...rest}
    >
      <code className="truncate font-mono text-sm text-ink-mute">
        <span className="mr-2 select-none text-term-green">$</span>
        {command}
      </code>
      <button
        onClick={handleCopy}
        aria-label="Copy to clipboard"
        className={classNames(
          'shrink-0 rounded p-1.5 transition-colors',
          copied ? 'text-term-green' : 'text-ink-faint hover:text-white'
        )}
      >
        {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export default CliBox
