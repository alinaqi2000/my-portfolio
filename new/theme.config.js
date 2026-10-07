/** *************************************************************
 * Please refer to the Theme Options section in documentation   *
 ****************************************************************/

/**
 * Icons from react-icons: https://react-icons.github.io/react-icons
 */

import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { FaSquareXTwitter } from 'react-icons/fa6'

/**
 * Main Menu Items
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000'

export const menu = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'About',
    slug: '/about',
  },
  {
    name: 'Services',
    slug: '/services',
  },
  {
    name: 'Projects',
    slug: '/projects',
  },
  {
    name: 'Contact',
    slug: '/contact',
  },
]

/**
 * Social Links (footer + mobile menu)
 */

export const social = [
  {
    name: 'GitHub',
    url: 'https://github.com/alinaqi2000',
    Icon: IoLogoGithub,
  },
  {
    name: 'X',
    url: 'https://x.com/AliNaqi2000',
    Icon: FaSquareXTwitter,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ali-naqi-al-musawi/',
    Icon: IoLogoLinkedin,
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/alinaqi2000/',
    Icon: IoLogoInstagram,
  },
]

/**
 * General configurations
 */

export const config = {
  dateLocale: 'en-US',
  dateOptions: {
    // dateOptions is passed to JavaScript's toLocaleDateString()
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  },
  convertKit: {
    tipUrl: 'https://fantastic-mover-3439.ck.page/products/blog',
  },
  contactForm: {
    inputs: require('./content/contact-form.json'),
    recipient: process.env.CONTACT_FORM_RECIPIENT || 'alinaqi2000@gmail.com',
    sender: process.env.CONTACT_FORM_SENDER || 'ali@zairone.com',
    subject: 'Contact Message - ' + (process.env.NEXT_PUBLIC_SITE_URL || 'localhost'),
  },
}

/**
 * MDX/Markdown configurations
 */

export const mdxConfig = {
  publicDir: 'public',
  pagesDir: 'content',
  fileExt: '.md',
  collections: ['/blog', '/projects'],
  remarkPlugins: [],
  rehypePlugins: [],
}

/**
 * Global SEO configuration for next-seo plugin
 * https://github.com/garmeeh/next-seo
 */

export const siteMetaData = {
  siteUrl: SITE_URL,
  authorName: 'Ali Naqi Al-Musawi',
  siteName: 'Ali Naqi',
  defaultTitle: 'Ali Naqi — Software Engineer',
  titleTemplate: 'Ali Naqi | %s',
  description:
    "Empower your digital journey with a skilled Software Developer. Expert in Laravel, Angular, ReactJS, and more. Elevate your web and mobile experience. Unleash innovation for impactful results. Let's build success together!",
  email: 'alinaqi2000@gmail.com',
  locale: 'en_US',
  twitter: {
    handle: '@AliNaqi2000',
    site: '@site',
    cardType: 'summary_large_image',
  },
}
