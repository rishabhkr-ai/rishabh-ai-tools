import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Loader2, ShieldAlert } from 'lucide-react'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data/categories'

const EMPTY_FORM = {
  id: '',
  name: '',
  description: '',
  category: CATEGORIES[0].id,
  subcategory: CATEGORIES[0].subcategories[0],
  tags: '',
  pricing: 'Freemium',
  officialWebsite: '',
  studentRecommended: false,
  featured: false,
  popularity: 50,
}

export default function AdminAddTool() {
  const { user, loading, isAdmin } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [status, setStatus] = useState('idle') // idle | saving | done | error
  const [error, setError] = useState('')

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
        <ShieldAlert size={32} className="text-[var(--rose)]" />
        <h1 className="mt-4 font-display text-xl font-semibold text-[var(--ink)]">Admins only</h1>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          Only the site owner's account can add new tools to the directory.
        </p>
      </div>
    )
  }

  const category = CATEGORIES.find((c) => c.id === form.category)

  const update = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: value }))
  }

  const handleCategoryChange = (e) => {
    const cat = CATEGORIES.find((c) => c.id === e.target.value)
    setForm((f) => ({ ...f, category: cat.id, subcategory: cat.subcategories[0] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const id = form.id.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
    if (!id || !form.name.trim() || !form.description.trim() || !form.officialWebsite.trim()) {
      setError('id, name, description and official website are required.')
      return
    }
    if (!/^https?:\/\//.test(form.officialWebsite.trim())) {
      setError('Official website must be a real https:// link — never invent a URL.')
      return
    }

    setStatus('saving')
    try {
      await setDoc(doc(db, 'tools', id), {
        id,
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        subcategory: form.subcategory,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        pricing: form.pricing,
        officialWebsite: form.officialWebsite.trim(),
        logo: null,
        studentRecommended: form.studentRecommended,
        featured: form.featured,
        popularity: Number(form.popularity) || 50,
        dateAdded: new Date().toISOString().split('T')[0],
        verified: true,
        addedBy: user.uid,
        createdAt: serverTimestamp(),
      })
      setStatus('done')
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err?.message || 'Could not save this tool. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Add a new AI tool</h1>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        Only visible to you. New tools appear across the site immediately — no redeploy needed. Only add real tools
        with a real official website.
      </p>

      <form onSubmit={handleSubmit} className="card-surface mt-6 flex flex-col gap-4 rounded-2xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Unique ID (kebab-case)</label>
            <input value={form.id} onChange={update('id')} placeholder="e.g. some-new-tool" className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Tool name</label>
            <input value={form.name} onChange={update('name')} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Description</label>
          <textarea value={form.description} onChange={update('description')} rows={3} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Category</label>
            <select value={form.category} onChange={handleCategoryChange} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)]">
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-[var(--surface)]">{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Subcategory</label>
            <select value={form.subcategory} onChange={update('subcategory')} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)]">
              {category.subcategories.map((s) => (
                <option key={s} value={s} className="bg-[var(--surface)]">{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Official website (real link only)</label>
          <input value={form.officialWebsite} onChange={update('officialWebsite')} placeholder="https://example.com" className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Tags (comma-separated)</label>
          <input value={form.tags} onChange={update('tags')} placeholder="e.g. writing, students, free" className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Pricing</label>
            <select value={form.pricing} onChange={update('pricing')} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)]">
              <option className="bg-[var(--surface)]">Free</option>
              <option className="bg-[var(--surface)]">Freemium</option>
              <option className="bg-[var(--surface)]">Paid</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Popularity (0-100)</label>
            <input type="number" min="0" max="100" value={form.popularity} onChange={update('popularity')} className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]" />
          </div>
          <div className="flex flex-col justify-end gap-2 pb-1">
            <label className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
              <input type="checkbox" checked={form.studentRecommended} onChange={update('studentRecommended')} className="h-4 w-4 accent-[var(--violet)]" /> Student pick
            </label>
            <label className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
              <input type="checkbox" checked={form.featured} onChange={update('featured')} className="h-4 w-4 accent-[var(--violet)]" /> Featured
            </label>
          </div>
        </div>

        {error && <p className="text-sm text-[var(--rose)]">{error}</p>}
        {status === 'done' && <p className="text-sm text-[var(--mint)]">Tool added — it's live on the site now.</p>}

        <button
          type="submit"
          disabled={status === 'saving'}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--violet)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'saving' && <Loader2 size={16} className="animate-spin" />}
          Add tool
        </button>
      </form>
    </div>
  )
}
