import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import classNames from 'clsx'
import Loader from '@/components/Loader'

const Paging = ({ totalPages, currentPage, slug, infinite = false }) => {
  const router = useRouter()
  const [isFetching, setIsFetching] = React.useState()
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const [inViewRef, inView] = useInView({
    triggerOnce: false,
    threshold: 1,
  })

  React.useEffect(() => {
    router.events.on('routeChangeStart', () => setIsFetching(true))
    router.events.on('routeChangeComplete', () => setIsFetching(false))
    return () => {
      router.events.off('routeChangeStart')
      router.events.off('routeChangeComplete')
    }
  }, [router.events])

  React.useEffect(() => {
    setIsIntersecting(inView)
  }, [inView])

  React.useEffect(() => {
    if (!infinite || currentPage === totalPages || !isIntersecting) return

    setIsIntersecting(false)

    router.push(
      {
        query: {
          slug: slug.concat('page', currentPage + 1),
          infinite,
        },
      },
      undefined,
      { scroll: false }
    )
  }, [router, currentPage, slug, totalPages, infinite, isIntersecting])

  return (
    <div ref={inViewRef}>
      <div className="mt-10 text-center">
        <div className="block flex h-10 items-center justify-center text-ink-faint">
          {isFetching && <Loader />}
        </div>
        <div className="my-4"></div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={`p-${page}`}
            href={slug.concat('page', page).join('/')}
            className={classNames(
              'mx-2 inline-block rounded border px-3 py-1 font-mono text-sm no-underline transition-colors',
              currentPage == page
                ? 'border-accent/60 bg-accent/10 text-accent'
                : 'border-line bg-transparent text-ink-mute hover:border-accent/60 hover:text-white'
            )}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="mt-4 text-center">
        {currentPage && (
          <div className="md:block">
            <small className="font-mono text-ink-faint">
              <span>
                Page <span className="font-bold text-white">{currentPage}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span>
              </span>
            </small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Paging
