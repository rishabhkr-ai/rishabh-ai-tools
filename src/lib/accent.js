// Maps a category's `accent` token (or a raw pricing/status keyword) to the
// CSS variables defined in index.css, so components never hardcode hex values.
export const ACCENT_VARS = {
  violet: 'var(--violet)',
  cyan: 'var(--cyan)',
  mint: 'var(--mint)',
  amber: 'var(--amber)',
  rose: 'var(--rose)',
}

export function accentVar(token) {
  return ACCENT_VARS[token] || ACCENT_VARS.violet
}

export function initialsFromName(name = '') {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}
