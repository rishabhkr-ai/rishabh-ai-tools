import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'
import { TOOLS as STATIC_TOOLS } from '../data/tools'

// The static, hand-verified TOOLS array (src/data/tools.js) never changes at
// runtime. Once Firebase is configured, tools added by the admin through
// /admin/add-tool are stored in the Firestore `tools` collection and are
// merged in live here — so every page that calls useAllTools() automatically
// sees new tools the moment the admin adds them, no redeploy needed.
export function useAllTools() {
  const [adminTools, setAdminTools] = useState([])
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!isFirebaseConfigured) return undefined
    const q = query(collection(db, 'tools'), orderBy('dateAdded', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setAdminTools(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      () => setLoading(false), // e.g. rules not deployed yet — fail quietly, static list still works
    )
    return unsubscribe
  }, [])

  const staticIds = new Set(STATIC_TOOLS.map((t) => t.id))
  const merged = [...STATIC_TOOLS, ...adminTools.filter((t) => !staticIds.has(t.id))]

  return { tools: merged, loading }
}
