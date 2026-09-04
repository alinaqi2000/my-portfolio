import localFont from '@next/font/local'

const sans = localFont({
  src: '../public/fonts/inter-variable-latin.woff2',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
})

const mono = localFont({
  src: '../public/fonts/jetbrains-mono-variable-latin.woff2',
  variable: '--font-mono',
  weight: '100 800',
  display: 'swap',
})

const variables = [sans.variable, mono.variable]

export default variables
