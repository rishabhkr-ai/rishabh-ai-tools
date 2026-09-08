import CategoryCard from '../components/CategoryCard'
import { CATEGORIES } from '../data/categories'
import { getToolsByCategory } from '../data/tools'

export default function CategoriesIndex({ tools }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-[var(--ink)]">Categories</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Every tool in the directory is organized into one of these categories, each broken down further into focused
          subcategories.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} toolCount={getToolsByCategory(cat.id, tools).length} />
        ))}
      </div>
    </div>
  )
}
