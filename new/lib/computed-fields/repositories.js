import fs from 'fs'
import path from 'path'

/**
 * GitHub repository computed field.
 *
 * - Uses GITHUB_TOKEN for authenticated requests (5000 req/hr vs 60 unauthenticated).
 * - Caches results to .next/cache/github-repos.json so repeated builds don't
 *   re-hit the API (the #1 cause of rate-limit errors).
 * - Falls back to cached data when the API is rate-limited, so the page still
 *   renders with the last-known repo metadata.
 */
const repositories = {
  hasSubFields: false,
  resolve: async (repositories) => {
    if (!Array.isArray(repositories)) return null

    const cacheDir = path.join(process.cwd(), '.next', 'cache')
    const cacheFile = path.join(cacheDir, 'github-repos.json')
    const CACHE_TTL = 1000 * 60 * 60 * 6 // 6 hours

    // Load cache
    let cache = {}
    try {
      if (fs.existsSync(cacheFile)) {
        cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
      }
    } catch {
      cache = {}
    }

    const records = await Promise.all(
      repositories.filter(Boolean).map(async (repo) => {
        const cached = cache[repo]
        const isFresh = cached && Date.now() - cached._ts < CACHE_TTL

        // Return fresh cache without hitting the API
        if (isFresh) {
          return cached.data
        }

        let res, json
        try {
          res = await fetch('https://api.github.com/repos/' + repo, {
            headers: {
              authorization: process.env.GITHUB_TOKEN
                ? 'token ' + process.env.GITHUB_TOKEN
                : undefined,
              accept: 'application/vnd.github.v3+json',
            },
          })
          json = await res.json()

          if (!res.ok || !json || !json.owner) {
            console.warn(
              `Failed to fetch repository data for ${repo}:`,
              json?.message || 'Unknown error'
            )
            // Fall back to stale cache if available
            if (cached?.data) return cached.data
            return null
          }
        } catch (error) {
          console.error(`Error fetching repository ${repo}:`, error)
          if (cached?.data) return cached.data
          return null
        }

        const data = {
          name: json.name,
          owner: json.owner.login,
          url: json.html_url,
          description: json.description,
          language: json.language,
          stars: json.stargazers_count,
          forks: json.forks_count,
        }

        // Update cache entry
        cache[repo] = { _ts: Date.now(), data }
        return data
      })
    )

    // Persist cache
    try {
      fs.mkdirSync(cacheDir, { recursive: true })
      fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2))
    } catch {
      // Non-fatal — cache is best-effort
    }

    return { records: records.filter(Boolean) }
  },
}

export default repositories
