import React from 'react'
import classNames from 'clsx'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import fonts from '@/styles/fonts'

const Layout = (props) => {
  const { children } = props

  return (
    <div className={classNames('relative flex min-h-screen w-full flex-col bg-night font-sans', ...fonts)}>
      {/* Vertical frame — wraps everything from header to footer, like Herdr's .hd-frame */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col border-x border-line">
        <Navbar />
        <main className="relative z-10 flex w-full flex-1 flex-col pt-16">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
