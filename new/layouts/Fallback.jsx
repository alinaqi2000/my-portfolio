import React from 'react'
import Loader from '@/components/Loader'

const Layout = () => (
  <div className="mx-auto my-auto w-full max-w-6xl px-6 py-16 md:py-20">
    <div className="prose prose-invert">
      <Loader text="Loading" />
    </div>
  </div>
)

export default Layout
