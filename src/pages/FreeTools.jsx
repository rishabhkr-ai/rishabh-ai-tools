import { useMemo, useState } from 'react'
import ToolCard from '../components/ToolCard'
import SearchBar from '../components/SearchBar'
import { matchesSearch, sortTools } from '../lib/filterTools'

export default function FreeTools({ tools, favoritesApi }) {
  const [query, setQuery] = useState('')
  const [onlyFullyFree, setOnlyFullyFree] = useState(false)

  const results = useMemo(() => {
    let list = tools.filter((t) => (onlyFullyFree ? t.pricing === 'Free' : t.pricing === 'Free' || t.pricing === 'Freemium'))
    list = list.filter((t) => matchesSearch(t, query))
    return sortTools(list, 'popular')
  }, [tools, query, onlyFullyFree])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">Free AI Tools</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Tools with a genuinely usable free tier or plan — no card required to get started.
        </p>
        <div className="mt-5 max-w-xl">
          <SearchBar placeholder="Search free AI tools…" onSearch={setQuery} />
        </div>
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--ink-muted)]">
          <input
            type="checkbox"
            checked={onlyFullyFree}
            onChange={(e) => setOnlyFullyFree(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--violet)]"
          />
          Show 100% free tools only (hide freemium)
        </label>
      </div>

      <p className="mb-4 text-sm text-[var(--ink-faint)]">{results.length} tools found</p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isFavorite={favoritesApi.isFavorite(tool.id)}
            onToggleFavorite={favoritesApi.toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
