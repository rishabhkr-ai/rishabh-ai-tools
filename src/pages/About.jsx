import { Link } from 'react-router-dom'

import { CATEGORIES } from '../data/categories'

export default function About({ tools }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">About AI Tools Hub</h1>
      <p className="mt-4 text-[var(--ink-muted)]">
        AI Tools Hub is a directory built for B.Tech students, engineering students, programmers, developers, AI/ML
        learners and researchers who want one place to discover, compare and save AI tools — instead of relying on
        scattered recommendations from social media.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card-surface rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--violet)]">{tools.length}+</p>
          <p className="mt-1 text-xs text-[var(--ink-muted)]">Tools listed</p>
        </div>
        <div className="card-surface rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--cyan)]">{CATEGORIES.length}</p>
          <p className="mt-1 text-xs text-[var(--ink-muted)]">Categories</p>
        </div>
        <div className="card-surface rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--mint)]">
            {tools.filter((t) => t.pricing !== 'Paid').length}
          </p>
          <p className="mt-1 text-xs text-[var(--ink-muted)]">Free or freemium</p>
        </div>
        <div className="card-surface rounded-xl p-4 text-center">
          <p className="font-display text-2xl font-semibold text-[var(--amber)]">
            {tools.filter((t) => t.studentRecommended).length}
          </p>
          <p className="mt-1 text-xs text-[var(--ink-muted)]">Student-recommended</p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-xl font-semibold text-[var(--ink)]">A directory that keeps growing</h2>
      <p className="mt-3 text-[var(--ink-muted)]">
        New AI tools launch constantly, so this is not meant to be a finished, permanent list — it's a scalable system.
        Every tool lives in one structured data file with a consistent shape (name, category, pricing, official link,
        tags and more), so adding the next hundred tools is as simple as adding the next one.
      </p>

      <h2 id="suggest-a-tool" className="mt-10 scroll-mt-24 font-display text-xl font-semibold text-[var(--ink)]">
        Suggesting a tool
      </h2>
      <p className="mt-3 text-[var(--ink-muted)]">
        This build ships with a documented template for adding tools consistently — matching each one to a real,
        verified official website, the right category, and honest pricing and audience tags. Nothing is added without
        a genuine, official source.
      </p>

      <h2 className="mt-10 font-display text-xl font-semibold text-[var(--ink)]">Disclaimer</h2>
      <p className="mt-3 text-[var(--ink-muted)]">
        This directory helps users discover AI tools. Tool availability, pricing and features may change over time.
        AI Tools Hub is not affiliated with, and does not officially endorse, any of the tools listed here — always
        check a tool's own site for its current terms before signing up.
      </p>

      <Link
        to="/tools"
        className="mt-10 inline-flex rounded-xl bg-[var(--violet)] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Browse the directory
      </Link>
    </div>
  )
}
