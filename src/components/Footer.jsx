import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg, var(--violet), var(--cyan))' }}
              >
                <Sparkles size={16} />
              </span>
              <span className="font-display text-base font-semibold text-[var(--ink)]">AI Tools Hub</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--ink-muted)]">
              Discover the best AI tools for students, developers and creators — one growing, searchable directory.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--ink)]">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-muted)]">
              <li><Link to="/categories" className="hover:text-[var(--ink)]">Categories</Link></li>
              <li><Link to="/tools?sort=popular" className="hover:text-[var(--ink)]">Popular Tools</Link></li>
              <li><Link to="/free-tools" className="hover:text-[var(--ink)]">Free Tools</Link></li>
              <li><Link to="/tools" className="hover:text-[var(--ink)]">All Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--ink)]">Students</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-muted)]">
              <li><Link to="/students" className="hover:text-[var(--ink)]">For Students</Link></li>
              <li><Link to="/categories/ai-ml" className="hover:text-[var(--ink)]">AI/ML Tools</Link></li>
              <li><Link to="/categories/coding" className="hover:text-[var(--ink)]">Coding Tools</Link></li>
              <li><Link to="/favorites" className="hover:text-[var(--ink)]">Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--ink)]">About</h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--ink-muted)]">
              <li><Link to="/about" className="hover:text-[var(--ink)]">About AI Tools Hub</Link></li>
              <li><Link to="/about#suggest-a-tool" className="hover:text-[var(--ink)]">Suggest a tool</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--ink-faint)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AI Tools Hub. Not affiliated with the tools listed here.</p>
          <p className="max-w-xl">
            This directory helps users discover AI tools. Tool availability, pricing and features may change over time.
          </p>
        </div>
      </div>
    </footer>
  )
}
