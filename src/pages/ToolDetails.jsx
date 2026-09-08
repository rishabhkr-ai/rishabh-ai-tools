import { Link, useParams } from 'react-router-dom'
import { ExternalLink, GraduationCap, Heart, Star } from 'lucide-react'
import { getCategoryById } from '../data/categories'
import { getToolById } from '../data/tools'
import { accentVar, initialsFromName } from '../lib/accent'
import { PricingBadge, Tag } from '../components/Badge'
import ToolCard from '../components/ToolCard'

export default function ToolDetails({ tools, favoritesApi }) {
  const { id } = useParams()
  const tool = getToolById(id, tools)

  if (!tool) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Tool not found</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          It may have been renamed, or it's not in the directory yet.
        </p>
        <Link to="/tools" className="mt-6 inline-block text-sm font-medium text-[var(--violet)]">
          Browse all tools
        </Link>
      </div>
    )
  }

  const category = getCategoryById(tool.category)
  const accent = accentVar(category?.accent)
  const isFav = favoritesApi.isFavorite(tool.id)
  const related = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-[var(--ink-faint)]">
        <Link to="/tools" className="hover:text-[var(--ink)]">All Tools</Link>
        <span className="mx-2">/</span>
        <Link to={`/categories/${tool.category}`} className="hover:text-[var(--ink)]">{category?.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--ink)]">{tool.name}</span>
      </nav>

      <div className="card-surface rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 40%, black))` }}
            >
              {initialsFromName(tool.name)}
            </div>
            <div>
              <h1 className="font-display text-2xl font-semibold text-[var(--ink)] sm:text-3xl">{tool.name}</h1>
              <p className="mt-1 text-sm text-[var(--ink-faint)]">
                {category?.name} • {tool.subcategory}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <PricingBadge pricing={tool.pricing} />
                {tool.popularity >= 85 && (
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--amber)]" style={{ background: 'color-mix(in srgb, var(--amber) 16%, transparent)' }}>
                    <Star size={12} fill="currentColor" /> Popular
                  </span>
                )}
                {tool.studentRecommended && (
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--violet)]" style={{ background: 'color-mix(in srgb, var(--violet) 16%, transparent)' }}>
                    <GraduationCap size={12} /> Student Recommended
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => favoritesApi.toggleFavorite(tool.id)}
              aria-pressed={isFav}
              className="flex items-center gap-2 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
            >
              <Heart size={16} fill={isFav ? 'var(--rose)' : 'none'} color={isFav ? 'var(--rose)' : 'currentColor'} />
              {isFav ? 'Saved' : 'Save'}
            </button>
            <a
              href={tool.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[var(--violet)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Visit Website <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-[var(--ink-muted)]">{tool.description}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-[var(--ink)]">
            More in {category?.name}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard
                key={t.id}
                tool={t}
                isFavorite={favoritesApi.isFavorite(t.id)}
                onToggleFavorite={favoritesApi.toggleFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
