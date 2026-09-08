import { Link } from 'react-router-dom'
import { ExternalLink, GraduationCap, Heart, Star } from 'lucide-react'
import { getCategoryById } from '../data/categories'
import { accentVar, initialsFromName } from '../lib/accent'
import { PricingBadge, Tag } from './Badge'

export default function ToolCard({ tool, isFavorite, onToggleFavorite }) {
  const category = getCategoryById(tool.category)
  const accent = accentVar(category?.accent)

  return (
    <div className="card-surface group relative flex flex-col gap-4 rounded-2xl p-5 transition-colors hover:border-[var(--border-strong)]">
      {tool.featured && (
        <div
          className="absolute inset-x-5 top-0 h-[3px] rounded-full"
          style={{ background: accent }}
          aria-hidden="true"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <Link to={`/tools/${tool.id}`} className="flex items-center gap-3 min-w-0">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold text-white"
            style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 40%, black))` }}
          >
            {initialsFromName(tool.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-[var(--ink)]">{tool.name}</h3>
            <p className="truncate text-xs text-[var(--ink-faint)]">{category?.name}</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={() => onToggleFavorite(tool.id)}
          aria-label={isFavorite ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
          aria-pressed={isFavorite}
          className="shrink-0 rounded-full p-2 text-[var(--ink-faint)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--rose)]"
        >
          <Heart size={18} fill={isFavorite ? 'var(--rose)' : 'none'} color={isFavorite ? 'var(--rose)' : 'currentColor'} />
        </button>
      </div>

      <p className="line-clamp-2 text-sm text-[var(--ink-muted)]">{tool.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <PricingBadge pricing={tool.pricing} />
        {tool.popularity >= 85 && (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--amber)]" style={{ background: 'color-mix(in srgb, var(--amber) 16%, transparent)' }}>
            <Star size={12} fill="currentColor" /> Popular
          </span>
        )}
        {tool.studentRecommended && (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--violet)]" style={{ background: 'color-mix(in srgb, var(--violet) 16%, transparent)' }}>
            <GraduationCap size={12} /> Student Pick
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tool.tags.slice(0, 3).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <a
        href={tool.officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] py-2.5 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--violet)] hover:text-[var(--violet)]"
      >
        Visit Official Website
        <ExternalLink size={15} />
      </a>
    </div>
  )
}
