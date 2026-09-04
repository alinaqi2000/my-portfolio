const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Herdr design system
        night: {
          DEFAULT: '#0A0A0A', // global background
          surface: '#121212', // cards / terminal windows
          raised: '#171717', // raised panels
          inset: '#1A1A1A', // CLI bars / inputs
        },
        line: '#27272A', // 1px borders / dividers (zinc-800)
        accent: {
          DEFAULT: '#C084FC', // primary brand accent (purple)
          dim: '#A855F7',
          glow: 'rgba(192, 132, 252, 0.15)',
        },
        term: {
          green: '#4ADE80', // success / prompt
          blue: '#60A5FA', // paths / strings
          orange: '#FB923C', // warnings / tags
          red: '#F87171',
          yellow: '#FACC15',
        },
        ink: {
          DEFAULT: '#FFFFFF', // primary text
          mute: '#A1A1AA', // secondary text (zinc-400)
          faint: '#52525B', // tertiary / meta (zinc-600)
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: [
            {
              maxWidth: 'inherit',
              lineHeight: theme('lineHeight.relaxed'),
              color: theme('colors.ink.mute'),
              strong: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.semibold'),
              },
              h1: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.extrabold'),
                letterSpacing: '-0.04em',
                marginTop: theme('margin.8'),
                marginBottom: theme('margin.4'),
              },
              h2: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.bold'),
                letterSpacing: '-0.02em',
                marginTop: theme('margin.10'),
                marginBottom: theme('margin.4'),
              },
              h3: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.semibold'),
                marginTop: theme('margin.8'),
                marginBottom: theme('margin.3'),
              },
              h4: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.semibold'),
                marginTop: theme('margin.6'),
                marginBottom: theme('margin.2'),
              },
              h5: {
                color: theme('colors.ink.DEFAULT'),
                fontWeight: theme('fontWeight.semibold'),
                marginTop: theme('margin.6'),
                marginBottom: theme('margin.2'),
              },
              h6: {
                color: theme('colors.ink.faint'),
                fontFamily: theme('fontFamily.mono').join(', '),
                fontSize: theme('fontSize.sm'),
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: theme('margin.6'),
                marginBottom: theme('margin.2'),
              },
              a: {
                color: theme('colors.accent.DEFAULT'),
                textDecoration: 'none',
                '&:hover': {
                  color: theme('colors.ink.DEFAULT'),
                },
              },
              'ul > li': {
                markerColor: theme('colors.accent.DEFAULT'),
              },
              'ul > li::marker': {
                color: theme('colors.accent.DEFAULT'),
              },
              'ol > li::marker': {
                color: theme('colors.accent.DEFAULT'),
              },
              code: {
                color: theme('colors.term.green'),
                backgroundColor: theme('colors.night.inset'),
                border: `1px solid ${theme('colors.line')}`,
                borderRadius: theme('borderRadius.sm'),
                padding: theme('padding.1') + ' ' + theme('padding.2'),
                fontWeight: theme('fontWeight.normal'),
              },
              'code::before': {
                content: '""',
              },
              'code::after': {
                content: '""',
              },
              'pre code': {
                backgroundColor: 'transparent',
                border: 'none',
                padding: 0,
                color: 'inherit',
              },
              blockquote: {
                color: theme('colors.ink.mute'),
                borderLeftColor: theme('colors.accent.DEFAULT'),
                fontStyle: 'normal',
                fontWeight: theme('fontWeight.normal'),
              },
              hr: {
                borderColor: theme('colors.line'),
              },
              th: {
                color: theme('colors.ink.DEFAULT'),
                backgroundColor: theme('colors.night.surface'),
                borderBottomColor: theme('colors.line'),
              },
              td: {
                borderBottomColor: theme('colors.line'),
              },
              'td, th': {
                paddingTop: theme('padding.2'),
                paddingBottom: theme('padding.2'),
                paddingRight: theme('padding.4'),
                paddingLeft: theme('padding.4'),
              },
              figcaption: {
                margin: 0,
                paddingTop: theme('padding.3'),
                paddingBottom: theme('padding.3'),
                textAlign: 'center',
                color: theme('colors.ink.faint'),
                fontFamily: theme('fontFamily.mono').join(', '),
                fontSize: theme('fontSize.sm'),
              },
              ':is(h1, h2, h3, h4, h5, h6):first-child': {
                marginTop: '0',
              },
              'figure:first-child > img': {
                marginTop: '0',
              },
              'ul > li > *:first-child': {
                margin: 0,
              },
              'ul > li > *:last-child': {
                margin: 0,
              },
            },
          ],
        },
      }),
      gridTemplateColumns: {
        fluid:
          'repeat(auto-fit, minmax(var(--tw-fluid-col-min, 20rem), var(--tw-fluid-col-max, 1fr)))',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        blink: 'blink-caret 1s steps(1, end) infinite',
        typewriter: 'typing 2s steps(30, end) forwards',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        typing: {
          '0%': { width: 0 },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),
    require('tailwind-scrollbar'),
  ],
}
