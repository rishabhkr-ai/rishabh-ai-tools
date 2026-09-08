import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar({
  size = 'md',
  placeholder = 'Search AI tools, categories, or a use case…',
  autoFocus = false,
  onSearch,
}) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = value.trim()
    if (onSearch) {
      onSearch(q)
      return
    }
    navigate(q ? `/tools?q=${encodeURIComponent(q)}` : '/tools')
  }

  const isLarge = size === 'lg'

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div
        className={`glass flex w-full items-center gap-3 rounded-2xl transition-colors focus-within:border-[var(--violet)] ${
          isLarge ? 'px-5 py-4' : 'px-4 py-2.5'
        }`}
      >
        <Search size={isLarge ? 22 : 18} className="shrink-0 text-[var(--ink-faint)]" />
        <input
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (onSearch) onSearch(e.target.value)
          }}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label="Search AI tools"
          className={`w-full bg-transparent text-[var(--ink)] outline-none placeholder:text-[var(--ink-faint)] ${
            isLarge ? 'text-base md:text-lg' : 'text-sm'
          }`}
        />
        {isLarge && (
          <button
            type="submit"
            className="hidden shrink-0 rounded-xl bg-[var(--violet)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:block"
          >
            Search
          </button>
        )}
      </div>
    </form>
  )
}
