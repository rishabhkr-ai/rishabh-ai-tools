import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeader({ title, subtitle, viewAllTo }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-2xl font-semibold text-[var(--ink)] sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-[var(--ink-muted)]">{subtitle}</p>}
      </div>
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--violet)] hover:opacity-80"
        >
          View all <ArrowRight size={15} />
        </Link>
      )}
    </div>
  )
}
