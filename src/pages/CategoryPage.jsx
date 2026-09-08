import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import FilterSidebar from '../components/FilterSidebar'
import ToolCard from '../components/ToolCard'
import { CATEGORIES, getCategoryById } from '../data/categories'
import { getToolsByCategory } from '../data/tools'
import { filterTools, sortTools } from '../lib/filterTools'

export default function CategoryPage({ tools, favoritesApi }) {
  const { id } = useParams()
  const category = getCategoryById(id)
  const [query, setQuery] = useState('')
  const [subcategory, setSubcategory] = useState('all')
  const [filters, setFilters] = useState({ pricing: [], bestFor: [], sort: 'popular' })

  const categoryTools = useMemo(() => getToolsByCategory(id, tools), [id, tools])

  const results = useMemo(() => {
    let filtered = filterTools(categoryTools, { query, ...filters, category: id })
    if (subcategory !== 'all') filtered = filtered.filter((t) => t.subcategory === subcategory)
    return sortTools(filtered, filters.sort)
  }, [categoryTools, query, filters, subcategory, id])

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Category not found</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">It may have been renamed or merged into another category.</p>
        <Link to="/categories" className="mt-6 inline-block text-sm font-medium text-[var(--violet)]">
          Back to all categories
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <span className="text-4xl" role="img" aria-hidden="true">{category.emoji}</span>
        <h1 className="mt-3 font-display text-3xl font-semibold text-[var(--ink)]">{category.name}</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">{category.description}</p>
        <div className="mt-5 max-w-xl">
          <SearchBar
            placeholder={`Search within ${category.name}…`}
            autoFocus={false}
            onSearch={setQuery}
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSubcategory('all')}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            subcategory === 'all'
              ? 'border-[var(--violet)] text-[var(--violet)]'
              : 'border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
          }`}
        >
          All
        </button>
        {category.subcategories.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => setSubcategory(sub)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              subcategory === sub
                ? 'border-[var(--violet)] text-[var(--violet)]'
                : 'border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]'
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <FilterSidebar filters={{ ...filters, category: id }} onChange={(f) => setFilters(f)} hideCategory />

        <div className="flex-1">
          <p className="mb-4 text-sm text-[var(--ink-faint)]">{results.length} tools found</p>
          {results.length === 0 ? (
            <div className="card-surface rounded-2xl p-10 text-center text-sm text-[var(--ink-muted)]">
              No tools here yet for this filter combination — this category is still growing.
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

      <div className="mt-12 border-t border-[var(--border)] pt-8">
        <p className="mb-3 text-sm font-medium text-[var(--ink)]">Other categories</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.id !== id).map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.id}`}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              {c.emoji} {c.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
