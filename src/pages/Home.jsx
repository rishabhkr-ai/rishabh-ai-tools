import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import ToolCard from '../components/ToolCard'
import SectionHeader from '../components/SectionHeader'
import { CATEGORIES } from '../data/categories'
import {
  getFeaturedTools,
  getFreeTools,
  getRecentTools,
  getStudentTools,
  getToolsByCategory,
} from '../data/tools'

const POPULAR_SEARCHES = ['ChatGPT', 'Coding', 'Notes', 'PPT', 'Research', 'AI Agents', 'Image Generation']

function ToolRow({ tools, favoritesApi }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          isFavorite={favoritesApi.isFavorite(tool.id)}
          onToggleFavorite={favoritesApi.toggleFavorite}
        />
      ))}
    </div>
  )
}

export default function Home({ tools, favoritesApi }) {
  const navigate = useNavigate()
  const featuredTools = getFeaturedTools(tools).slice(0, 8)
  const freeTools = getFreeTools(tools).slice(0, 4)
  const studentTools = getStudentTools(tools).slice(0, 4)
  const codingTools = getToolsByCategory('coding', tools).slice(0, 4)
  const aimlTools = getToolsByCategory('ai-ml', tools).slice(0, 4)
  const recentTools = getRecentTools(8, tools)
  const popularCategoryOrder = ['study', 'coding', 'ai-ml', 'image-design', 'video', 'writing']
  const popularCategories = popularCategoryOrder.map((id) => CATEGORIES.find((c) => c.id === id))

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-mesh" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl animate-drift"
          style={{ background: 'var(--violet)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 top-32 h-64 w-64 rounded-full opacity-30 blur-3xl animate-drift-slow"
          style={{ background: 'var(--cyan)' }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[var(--ink-muted)]">
            <Compass size={14} style={{ color: 'var(--violet)' }} />
            {tools.length}+ tools and growing every week
          </span>

          <h1 className="text-balance mt-6 font-display text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
            Find the Perfect AI Tool for Anything
          </h1>
          <p className="text-balance mx-auto mt-5 max-w-2xl text-base text-[var(--ink-muted)] sm:text-lg">
            Discover AI tools for studying, coding, research, AI/ML, design, video, automation and much more.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            <SearchBar size="lg" autoFocus={false} />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-[var(--ink-faint)]">Popular:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => navigate(`/tools?q=${encodeURIComponent(term)}`)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--ink-muted)] transition-colors hover:border-[var(--violet)] hover:text-[var(--violet)]"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--violet)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Explore Tools <ArrowRight size={16} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        {/* POPULAR CATEGORIES */}
        <section>
          <SectionHeader
            title="Popular Categories"
            subtitle="Jump straight into the area you need help with."
            viewAllTo="/categories"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                toolCount={getToolsByCategory(cat.id, tools).length}
                size={i === 0 ? 'lg' : 'md'}
              />
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section>
          <SectionHeader
            title="Featured AI Tools"
            subtitle="A hand-picked spread of the most useful tools right now."
            viewAllTo="/tools?sort=popular"
          />
          <ToolRow tools={featuredTools} favoritesApi={favoritesApi} />
        </section>

        {/* FREE TOOLS */}
        <section>
          <SectionHeader
            title="Best Free AI Tools"
            subtitle="No credit card, no catch — start using these right away."
            viewAllTo="/free-tools"
          />
          <ToolRow tools={freeTools} favoritesApi={favoritesApi} />
        </section>

        {/* B.TECH STUDENTS */}
        <section>
          <SectionHeader
            title="AI Tools for B.Tech Students"
            subtitle="Study, coding, research and placement prep, curated for engineering students."
            viewAllTo="/students"
          />
          <ToolRow tools={studentTools} favoritesApi={favoritesApi} />
        </section>

        {/* CODING */}
        <section>
          <SectionHeader
            title="Coding & Development Tools"
            subtitle="Ship code faster with AI pair programmers and debuggers."
            viewAllTo="/categories/coding"
          />
          <ToolRow tools={codingTools} favoritesApi={favoritesApi} />
        </section>

        {/* AI/ML */}
        <section>
          <SectionHeader
            title="AI & Machine Learning Tools"
            subtitle="Model platforms, training environments and LLM tooling."
            viewAllTo="/categories/ai-ml"
          />
          <ToolRow tools={aimlTools} favoritesApi={favoritesApi} />
        </section>

        {/* RECENTLY ADDED */}
        <section>
          <SectionHeader
            title="Recently Added Tools"
            subtitle="The newest additions to a directory that never stops growing."
            viewAllTo="/tools?sort=newest"
          />
          <ToolRow tools={recentTools} favoritesApi={favoritesApi} />
        </section>
      </div>
    </div>
  )
}
