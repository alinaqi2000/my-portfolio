const repositories = {
  hasSubFields: false,
  resolve: async (repositories) => {
    if (!Array.isArray(repositories) || !process.env.GITHUB_TOKEN) return null

    const records = await Promise.all(
      repositories.filter(Boolean).map(async (repo) => {
        let res, json
        try {
          res = await fetch('https://api.github.com/repos/' + repo, {
            headers: {
              authorization: process.env.GITHUB_TOKEN
                ? 'token ' + process.env.GITHUB_TOKEN
                : undefined,
            },
          })
          json = await res.json()

          // Check if API call was successful
          if (!res.ok || !json || !json.owner) {
            console.warn(
              `Failed to fetch repository data for ${repo}:`,
              json?.message || 'Unknown error'
            )
            return null
          }
        } catch (error) {
          console.error(`Error fetching repository ${repo}:`, error)
          return null
        }

        return {
          name: json.name,
          owner: json.owner.login,
          url: json.html_url,
          description: json.description,
          language: json.language,
          stars: json.stargazers_count,
          forks: json.forks_count,
        }
      })
    )

    // Filter out null entries from failed API calls
    return { records: records.filter(Boolean) }
  },
}

export default repositories
