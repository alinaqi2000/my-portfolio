import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '../theme.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={config.dateLocale} className="relative scroll-smooth antialiased">
        <Head>
          <meta name="theme-color" content="#27272a" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="alternate" type="application/rss+xml" href="/feed/blog/feed.xml" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "xg62nk13rk");
              `,
            }}
          />
        </Head>
        <body className="scrollbar-thin scrollbar-thumb-omega-500 hover:scrollbar-thumb-omega-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
