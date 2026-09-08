import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { accentVar } from '../lib/accent'

export default function CategoryCard({ category, toolCount, size = 'md' }) {
  const accent = accentVar(category.accent)
  const isLarge = size === 'lg'

  return (
    <Link
      to={`/categories/${category.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] p-6 transition-transform hover:-translate-y-0.5 ${
        isLarge ? 'row-span-2 min-h-[220px]' : 'min-h-[160px]'
      }`}
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-35"
        style={{ background: accent }}
        aria-hidden="true"
      />
      <div className="relative">
        <span className={isLarge ? 'text-4xl' : 'text-3xl'} role="img" aria-hidden="true">
          {category.emoji}
        </span>
        <h3 className={`mt-4 font-display font-semibold text-[var(--ink)] ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {category.name}
        </h3>
        <p className={`mt-1 text-[var(--ink-muted)] ${isLarge ? 'text-sm' : 'text-xs'} line-clamp-2`}>
          {category.description}
        </p>
      </div>
      <div className="relative mt-4 flex items-center justify-between text-xs text-[var(--ink-faint)]">
        <span>{toolCount} tools</span>
        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: accent }} />
      </div>
    </Link>
  )
}
