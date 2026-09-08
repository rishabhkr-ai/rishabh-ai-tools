import ToolCard from '../components/ToolCard'
import { getStudentTools } from '../data/tools'

const NEED_SECTIONS = [
  {
    id: 'study',
    emoji: '📚',
    title: 'Study',
    match: (t) => t.category === 'study' && ['Writing Assistant', 'Exam Preparation', 'Flashcards', 'Quiz Generator'].includes(t.subcategory),
  },
  {
    id: 'coding',
    emoji: '💻',
    title: 'Coding',
    match: (t) => t.category === 'coding',
  },
  {
    id: 'maths',
    emoji: '🧮',
    title: 'Mathematics',
    match: (t) => t.subcategory === 'Mathematics',
  },
  {
    id: 'research',
    emoji: '🔬',
    title: 'Research',
    match: (t) => t.subcategory === 'Research Tools',
  },
  {
    id: 'pdf-notes',
    emoji: '📄',
    title: 'PDF & Notes',
    match: (t) => ['PDF Summarizer', 'Notes Generator'].includes(t.subcategory),
  },
  {
    id: 'presentations',
    emoji: '📊',
    title: 'Presentations',
    match: (t) => t.subcategory === 'PPT Generator',
  },
  {
    id: 'assignments',
    emoji: '📝',
    title: 'Assignments',
    match: (t) => ['Assignment Help', 'Homework Help'].includes(t.subcategory),
  },
  {
    id: 'placement',
    emoji: '🎯',
    title: 'Placement Preparation',
    match: (t) => t.category === 'coding' && t.subcategory === 'DSA',
  },
  {
    id: 'career',
    emoji: '💼',
    title: 'Resume & Career',
    match: (t) => t.category === 'career',
  },
]

const TOOLKIT_IDS = [
  'chatgpt',
  'github-copilot',
  'notion-ai',
  'wolfram-alpha',
  'gamma',
  'quillbot',
  'otter-ai',
  'teal',
]

function NeedSection({ section, tools, favoritesApi }) {
  const sectionTools = tools.filter(section.match)
  return (
    <section id={section.id} className="scroll-mt-24">
      <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-semibold text-[var(--ink)]">
        <span aria-hidden="true">{section.emoji}</span> {section.title}
      </h3>
      {sectionTools.length === 0 ? (
        <div className="card-surface rounded-2xl p-6 text-sm text-[var(--ink-muted)]">
          No tools tagged for this yet — new tools are added regularly, so check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sectionTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favoritesApi.isFavorite(tool.id)}
              onToggleFavorite={favoritesApi.toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default function BTechStudents({ tools, favoritesApi }) {
  const toolkit = TOOLKIT_IDS.map((id) => tools.find((t) => t.id === id)).filter(Boolean)
  const allStudentTools = getStudentTools(tools)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">🎓 AI Tools for B.Tech Students</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {allStudentTools.length} tools in the directory are currently marked student-recommended, organized below by
          what you're actually trying to get done.
        </p>
      </div>

      {/* Quick jump nav */}
      <div className="mb-12 flex flex-wrap gap-2">
        {NEED_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)]"
          >
            {s.emoji} {s.title}
          </a>
        ))}
      </div>

      {/* ESSENTIAL TOOLKIT */}
      <section className="mb-16">
        <h2 className="mb-1 font-display text-2xl font-semibold text-[var(--ink)]">
          ⭐ Essential AI Toolkit for Every B.Tech Student
        </h2>
        <p className="mb-6 text-sm text-[var(--ink-muted)]">
          Covers learning to program, understanding tough concepts, taking notes, researching, presenting, exam prep,
          building projects, and getting placement-ready.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {toolkit.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isFavorite={favoritesApi.isFavorite(tool.id)}
              onToggleFavorite={favoritesApi.toggleFavorite}
            />
          ))}
        </div>
      </section>

      <div className="space-y-14">
        {NEED_SECTIONS.map((section) => (
          <NeedSection key={section.id} section={section} tools={tools} favoritesApi={favoritesApi} />
        ))}
      </div>
    </div>
  )
}
