import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="text-term-green mb-4 font-mono text-xs uppercase tracking-[.2em]">
        $ exit 404
      </div>
      <h1 className="m-0 text-4xl md:text-6xl">404</h1>
      <p className="text-ink-mute mt-4">
        This page could not be found. The route may have been moved or never existed.
      </p>
      <Link
        href="/"
        className="text-accent mt-8 font-mono text-sm no-underline hover:underline"
      >
        ← back to home
      </Link>
    </div>
  )
}
