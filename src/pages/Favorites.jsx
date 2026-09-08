import { Link } from 'react-router-dom'
import { HeartOff } from 'lucide-react'
import ToolCard from '../components/ToolCard'
export default function Favorites({ tools, favoritesApi }) {
  const savedTools = tools.filter((t) => favoritesApi.favorites.includes(t.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">Your Favorites</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Saved on this device only, using your browser's local storage — no account needed.
        </p>
      </div>

      {savedTools.length === 0 ? (
        <div className="card-surface flex flex-col items-center gap-3 rounded-2xl p-14 text-center">
          <HeartOff size={32} className="text-[var(--ink-faint)]" />
          <p className="font-medium text-[var(--ink)]">No favorites yet</p>
          <p className="max-w-sm text-sm text-[var(--ink-muted)]">
            Tap the heart icon on any tool card to save it here for quick access later.
          </p>
          <Link
            to="/tools"
            className="mt-2 rounded-xl bg-[var(--violet)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Browse all tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite
              onToggleFavorite={favoritesApi.toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
