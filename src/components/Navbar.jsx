import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Moon, PlusCircle, Search, Sparkles, Sun, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { logout } from '../lib/otpAuth'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/categories', label: 'Categories' },
  { to: '/tools?sort=popular', label: 'Popular Tools' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/students', label: 'For Students' },
  { to: '/categories/ai-ml', label: 'AI/ML' },
  { to: '/categories/coding', label: 'Coding' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/about', label: 'About' },
]

function AccountMenu({ onNavigate }) {
  const { user, profile, isAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (!user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
      >
        <User size={16} />
        Sign in
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--border-strong)]"
      >
        <User size={16} />
        {profile?.name?.split(' ')[0] || 'Account'}
      </button>
      {open && (
        <div
          className="card-surface absolute right-0 mt-2 w-56 rounded-xl p-2 text-sm"
          style={{ boxShadow: 'var(--shadow)' }}
        >
          <div className="px-3 py-2">
            <p className="truncate font-medium text-[var(--ink)]">{profile?.name || 'Your account'}</p>
            <p className="truncate text-xs text-[var(--ink-faint)]">{profile?.email || profile?.phone}</p>
          </div>
          {isAdmin && (
            <Link
              to="/admin/add-tool"
              onClick={() => {
                setOpen(false)
                onNavigate?.()
              }}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-[var(--ink-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--ink)]"
            >
              <PlusCircle size={15} /> Add a tool
            </Link>
          )}
          <button
            type="button"
            onClick={async () => {
              await logout()
              setOpen(false)
              onNavigate?.()
              navigate('/')
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[var(--rose)] hover:bg-[var(--surface-soft)]"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 glass border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" onClick={() => setMobileOpen(false)}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg, var(--violet), var(--cyan))' }}
          >
            <Sparkles size={18} />
          </span>
          <span className="font-display text-lg font-semibold text-[var(--ink)]">AI Tools Hub</span>
        </NavLink>

        <nav className="hidden items-center gap-1 xl:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-[var(--violet)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => navigate('/tools')}
            className="rounded-lg p-2 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--ink)]"
          >
            <Search size={19} />
          </button>
          <button
            type="button"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={onToggleTheme}
            className="rounded-lg p-2 text-[var(--ink-muted)] transition-colors hover:bg-[var(--surface-soft)] hover:text-[var(--ink)]"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <div className="hidden sm:block">
            <AccountMenu />
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-lg p-2 text-[var(--ink-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--ink)] xl:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-[var(--border)] px-4 py-3 xl:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? 'bg-[var(--surface-soft)] text-[var(--violet)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-[var(--border)] pt-2 sm:hidden">
              <AccountMenu onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
