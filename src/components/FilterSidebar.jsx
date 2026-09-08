import { CATEGORIES } from '../data/categories'

const PRICING_OPTIONS = ['Free', 'Freemium', 'Paid']
const BEST_FOR_OPTIONS = ['Students', 'Developers', 'Designers', 'Researchers', 'Content Creators']
const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name (A-Z)' },
]

function CheckboxRow({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-[var(--border)] accent-[var(--violet)]"
      />
      {label}
    </label>
  )
}

export default function FilterSidebar({ filters, onChange, hideCategory = false }) {
  const { pricing, bestFor, category, sort } = filters

  const toggleValue = (key, value) => {
    const current = filters[key]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const reset = () =>
    onChange({ pricing: [], bestFor: [], category: hideCategory ? category : 'all', sort: filters.sort })

  return (
    <aside className="card-surface h-fit w-full shrink-0 rounded-2xl p-5 lg:w-64">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-[var(--ink)]">Filters</h3>
        <button type="button" onClick={reset} className="text-xs font-medium text-[var(--violet)] hover:opacity-80">
          Reset
        </button>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-xs font-medium text-[var(--ink-faint)]">Sort by</p>
        <select
          value={sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--ink)]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--surface)] text-[var(--ink)]">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 border-t border-[var(--border)] pt-4">
        <p className="mb-1 text-xs font-medium text-[var(--ink-faint)]">Pricing</p>
        {PRICING_OPTIONS.map((opt) => (
          <CheckboxRow
            key={opt}
            label={opt}
            checked={pricing.includes(opt)}
            onChange={() => toggleValue('pricing', opt)}
          />
        ))}
      </div>

      {!hideCategory && (
        <div className="mb-5 border-t border-[var(--border)] pt-4">
          <p className="mb-1 text-xs font-medium text-[var(--ink-faint)]">Category</p>
          <select
            value={category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm text-[var(--ink)]"
          >
            <option value="all" className="bg-[var(--surface)]">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-[var(--surface)]">
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="border-t border-[var(--border)] pt-4">
        <p className="mb-1 text-xs font-medium text-[var(--ink-faint)]">Best for</p>
        {BEST_FOR_OPTIONS.map((opt) => (
          <CheckboxRow key={opt} label={opt} checked={bestFor.includes(opt)} onChange={() => toggleValue('bestFor', opt)} />
        ))}
      </div>
    </aside>
  )
}
