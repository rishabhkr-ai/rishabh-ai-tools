const PRICING_STYLES = {
  Free: 'text-[var(--mint)] bg-[color-mix(in_srgb,var(--mint)_16%,transparent)]',
  Freemium: 'text-[var(--cyan)] bg-[color-mix(in_srgb,var(--cyan)_16%,transparent)]',
  Paid: 'text-[var(--amber)] bg-[color-mix(in_srgb,var(--amber)_16%,transparent)]',
}

export function PricingBadge({ pricing }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        PRICING_STYLES[pricing] || PRICING_STYLES.Freemium
      }`}
    >
      {pricing}
    </span>
  )
}

export function Pill({ children, icon, tone = 'violet' }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--ink)]"
      style={{
        background: `color-mix(in srgb, var(--${tone}) 14%, transparent)`,
        color: `var(--${tone})`,
      }}
    >
      {icon}
      {children}
    </span>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--ink-muted)]">
      {children}
    </span>
  )
}
