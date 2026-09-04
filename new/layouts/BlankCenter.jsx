import React from 'react'
import ContentRenderer from '@/components/ContentRenderer'

const Layout = ({ content }) => (
  <div className="mx-auto my-auto w-full max-w-6xl px-6 py-16 md:py-20">
    <div className="prose prose-invert">
      {/* Main content of the markdown file */}
      <ContentRenderer source={content} />
    </div>
  </div>
)

export default Layout
