import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ToolCard from '../components/ToolCard'
import { filterTools, sortTools } from '../lib/filterTools'

export default function AllTools({ tools, favoritesApi }) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filters, setFilters] = useState({
    pricing: [],
    bestFor: [],
    category: searchParams.get('category') || 'all',
    sort: searchParams.get('sort') || 'popular',
  })

  const results = useMemo(() => {
    const filtered = filterTools(tools, { query, ...filters })
    return sortTools(filtered, filters.sort)
  }, [tools, query, filters])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">All AI Tools</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {query ? (
            <>Showing results for <span className="text-[var(--ink)]">&ldquo;{query}&rdquo;</span></>
          ) : (
            'Search, filter and sort every tool in the directory.'
          )}
        </p>
        <div className="mt-5 max-w-xl">
          <SearchBar placeholder="Try “AI for C++ coding” or “free AI for PPT”" />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <div className="flex-1">
          <p className="mb-4 text-sm text-[var(--ink-faint)]">{results.length} tools found</p>

          {results.length === 0 ? (
            <div className="card-surface flex flex-col items-center gap-3 rounded-2xl p-12 text-center">
              <SearchX size={32} className="text-[var(--ink-faint)]" />
              <p className="font-medium text-[var(--ink)]">No tools match those filters yet</p>
              <p className="max-w-sm text-sm text-[var(--ink-muted)]">
                Try a broader search term or clear a filter — new tools are added regularly, so check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isFavorite={favoritesApi.isFavorite(tool.id)}
                  onToggleFavorite={favoritesApi.toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
