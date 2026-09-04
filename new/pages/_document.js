import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '../theme.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={config.dateLocale} className="relative scroll-smooth antialiased">
        <Head>
          <meta name="theme-color" content="#0A0A0A" />
          <link rel="icon" href="/laptop.png" type="image/png" />
          <link rel="apple-touch-icon" href="/laptop.png" />
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
        <body className="scrollbar-thin scrollbar-thumb-line hover:scrollbar-thumb-ink-faint">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
