import React from 'react'
import { useRouter } from 'next/router'
import classNames from 'clsx'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SectionRail from '@/components/SectionRail'
import { menu } from '../theme.config'
import BracesMark from '@/components/BracesMark'
import fonts from '@/styles/fonts'

const Layout = (props) => {
  const { children } = props
  const router = useRouter()
  const isHome = router.asPath.split('?')[0] === '/'

  return (
    <div
      className={classNames(
        'bg-night relative flex min-h-screen w-full flex-col font-sans',
        !isHome && 'page-layout',
        ...fonts
      )}
    >
      {/* Fixed accent field + `{}` watermark, visible on every page */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="bg-grid pin-backdrop__grid" />
        <div className="layout-accent layout-accent--purple" />
        <div className="layout-accent layout-accent--blue" />
        <BracesMark />
      </div>

      {/* Vertical frame — wraps everything from header to footer, like Herdr's .hd-frame */}
      <div className="border-line relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col border-x">
        <div className="glass-field" aria-hidden="true">
          <div className="layout-accent layout-accent--purple" />
          <div className="layout-accent layout-accent--blue" />
        </div>
        <Navbar />
        <main className="relative z-10 flex w-full flex-1 flex-col pt-24 md:pt-16">{children}</main>
        <Footer />
      </div>
      {!isHome && <SectionRail links={menu} className="page-rail" />}
    </div>
  )
}

export default Layout
