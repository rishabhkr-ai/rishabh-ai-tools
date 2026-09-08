import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="font-display text-6xl font-semibold text-[var(--violet)]">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-[var(--ink)]">Page not found</h1>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-[var(--violet)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  )
}
