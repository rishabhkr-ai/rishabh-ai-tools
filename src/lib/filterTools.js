import { getCategoryById } from '../data/categories'

// "Best for" is a derived, heuristic grouping (the tool data itself does not
// carry this field) so the filter stays meaningful without inventing data.
const BEST_FOR_MATCHERS = {
  Students: (tool) => tool.studentRecommended,
  Developers: (tool) => tool.category === 'coding' || tool.category === 'ai-ml',
  Designers: (tool) => tool.category === 'image-design',
  Researchers: (tool) => tool.category === 'study' && /research/i.test(tool.subcategory),
  'Content Creators': (tool) => ['writing', 'video', 'audio-voice'].includes(tool.category),
}

export function matchesSearch(tool, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true
  const category = getCategoryById(tool.category)
  const haystack = [
    tool.name,
    tool.description,
    tool.subcategory,
    category?.name,
    ...(tool.tags || []),
  ]
    .join(' ')
    .toLowerCase()
  // supports simple multi-word queries like "AI for C++ coding" by requiring
  // every significant word to appear somewhere in the tool's searchable text
  return q.split(/\s+/).filter(Boolean).every((word) => haystack.includes(word))
}

export function filterTools(tools, { query = '', pricing = [], bestFor = [], category = 'all' } = {}) {
  return tools.filter((tool) => {
    if (category !== 'all' && tool.category !== category) return false
    if (pricing.length && !pricing.includes(tool.pricing)) return false
    if (bestFor.length && !bestFor.some((label) => BEST_FOR_MATCHERS[label]?.(tool))) return false
    return matchesSearch(tool, query)
  })
}

export function sortTools(tools, sort = 'popular') {
  const copy = [...tools]
  if (sort === 'newest') return copy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
  if (sort === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name))
  return copy.sort((a, b) => b.popularity - a.popularity)
}
