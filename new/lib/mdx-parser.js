import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import computedFields from './computed-fields'

/**
 * Fetch a GitHub README and strip the first H1 title + leading horizontal rules
 * so it doesn't duplicate the page header.
 *
 * Caches to .next/cache/github-readmes.json (6h TTL) to avoid rate limits.
 */
async function fetchGithubReadme(repo) {
  const cacheDir = path.join(process.cwd(), '.next', 'cache')
  const cacheFile = path.join(cacheDir, 'github-readmes.json')
  const CACHE_TTL = 1000 * 60 * 60 * 6

  let cache = {}
  try {
    if (fs.existsSync(cacheFile)) cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
  } catch {
    cache = {}
  }

  const cached = cache[repo]
  if (cached && Date.now() - cached._ts < CACHE_TTL) {
    return cached.data
  }

  // Try main then master branch
  const branches = ['main', 'master']
  let readme = null
  let matchedBranch = 'master'

  for (const branch of branches) {
    for (const filename of ['README.md', 'readme.md']) {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${repo}/${branch}/${filename}`,
          {
            headers: {
              authorization: process.env.GITHUB_TOKEN
                ? 'token ' + process.env.GITHUB_TOKEN
                : undefined,
            },
          }
        )
        if (res.ok) {
          readme = await res.text()
          matchedBranch = branch
          break
        }
      } catch {
        // try next
      }
    }
    if (readme) break
  }

  if (!readme) {
    console.warn(`Failed to fetch README for ${repo}`)
    if (cached?.data) return cached.data
    return null
  }

  // Strip the first H1 title and any leading horizontal rules / blank lines
  let lines = readme.split('\n')
  let startIdx = 0

  // Find and skip the first H1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^#\s+/)) {
      startIdx = i + 1
      break
    }
  }

  // Skip leading blank lines after the H1
  while (startIdx < lines.length && lines[startIdx].trim() === '') {
    startIdx++
  }

  // Skip leading horizontal rules (---)
  while (startIdx < lines.length && lines[startIdx].trim().match(/^-{3,}$/)) {
    startIdx++
    // Skip blank lines after each rule
    while (startIdx < lines.length && lines[startIdx].trim() === '') {
      startIdx++
    }
  }

  const cleaned = lines.slice(startIdx).join('\n').trim()

  // Sanitize HTML for MDX compatibility:
  //  - Self-close void elements (<img>, <br>, <hr>, etc.)
  //  - Remove <p> wrapper tags (READMEs use them for alignment, MDX chokes)
  //  - Rewrite relative image/asset paths to GitHub raw URLs
  //  - Wrap shields.io badge lines in a flex container so they display inline
  let sanitized = cleaned
    // Self-close void elements that aren't already self-closed
    .replace(/<(img|br|hr|input|link|meta|col|area|base|source|track|wbr)([^>]*?)(?<!\/)>/gi, '<$1$2 />')
    // Remove all <p>...</p> wrapper tags (keep inner content)
    .replace(/<\/?p[^>]*>/gi, '')
    // Rewrite relative src in <img> tags to GitHub raw URLs
    .replace(/<img([^>]*?)src="(?!https?:\/\/|\/)([^"]+)"/gi, (match, pre, relPath) => {
      return `<img${pre}src="https://raw.githubusercontent.com/${repo}/${matchedBranch}/${relPath}"`
    })
    // Rewrite relative paths in Markdown image syntax ![alt](path)
    .replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)]+)\)/gi, (match, alt, relPath) => {
      return `![${alt}](https://raw.githubusercontent.com/${repo}/${matchedBranch}/${relPath})`
    })

  // Wrap consecutive shields.io badge lines in a flex container
  // Matches lines like: [![PHP Version](https://img.shields.io/badge/...)](...)
  sanitized = sanitized.replace(
    /((?:.*img\.shields\.io.*\n?)+)/g,
    (match, badges) => {
      const trimmed = badges.trim()
      if (!trimmed) return match
      return `<div className="flex flex-wrap items-center gap-2 my-6 not-prose">\n${trimmed}\n</div>`
    }
  )

  // Persist cache
  cache[repo] = { _ts: Date.now(), data: sanitized }
  try {
    fs.mkdirSync(cacheDir, { recursive: true })
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2))
  } catch {
    // non-fatal
  }

  return sanitized
}

class Parser {
  constructor({ filePath, mdxOptions }) {
    this.filePath = filePath
    this.mdxOptions = mdxOptions
    this.computedFields = computedFields
    this.computedFieldKeys = Object.keys(computedFields)
    this.ignoreFields = ['compliedSource', 'filterBy', 'sortBy']
  }

  async resolveComputedFields(data) {
    if (!data || Object.keys(data).length === 0) return null

    const self = this
    let results = Object.assign({}, data)

    async function traverse(fields, shallow) {
      if (!fields || typeof fields != 'object') return fields

      await Promise.all(
        Object.entries(fields).map(async ([key, value]) => {
          // Continue traverse if field is not a computed field
          if (!self.computedFieldKeys.includes(key)) {
            fields[key] = await traverse(value, shallow)
            return fields
          }

          // Resolve computed field
          const { resolve, hasSubFields } = self.computedFields[key]
          fields[key] = await resolve(value, {
            mdxOptions: self.mdxOptions,
            shallow,
          })

          // Resolve sub-fields within computed field
          if (hasSubFields) {
            // Shallow fields wont have their subFields traversed
            const { shallow } = fields[key]
            fields[key] = await traverse(fields[key], shallow)
          }

          return fields
        })
      )

      return fields
    }

    results = await traverse(results)

    return results
  }

  async parseFrontmatter(filePath) {
    const { data } = await matter.read(filePath)
    return data
  }

  async parseMdxSections(sections) {
    const result = {}

    if (!sections || sections.length < 1) {
      return result
    }

    await Promise.all(
      sections.map(async ({ key, data, content }) => {
        const serializedContent =
          content.replace(/[\n\r\t\s]+/g, '').length > 0
            ? await serialize(content, { mdxOptions: this.mdxOptions.options })
            : null

        //Check if section key represents array item eg. Section[1]
        var [, arrKey, arrIndex] = key.match(/(\w+)\[([0-9]+)\]$/) || []

        if (!arrIndex) {
          result[key] = data || {}
          result[key].content = serializedContent
          return
        }

        result[arrKey] = result[arrKey] || []
        result[arrKey][arrIndex] = data || {}
        result[arrKey][arrIndex].content = serializedContent
      })
    )

    return result
  }

  async parseMdx(filePath) {
    const { data, content, sections } = await matter.read(filePath, {
      section: (section, file) => {
        if (typeof section.data === 'string' && section.data.trim() !== '') {
          section.data = yaml.load(section.data)
        }
        section.content = section.content.trim()
      },
    })

    // If the file has a `github` field, fetch the README and use it as content
    let body = content
    if (data.github) {
      const readme = await fetchGithubReadme(data.github)
      if (readme) {
        body = readme
      }
    }

    const serializedContent = await serialize(body, {
      scope: { path: '/blog' },
      mdxOptions: this.mdxOptions.options,
      parseFrontmatter: false,
    })

    const serializedSections = await this.parseMdxSections(sections)

    return {
      data,
      content: serializedContent,
      sections: serializedSections,
    }
  }
}

export default Parser
