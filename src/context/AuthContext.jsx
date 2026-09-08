import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { ADMIN_UID, auth, db, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  // Track the signed-in Firebase user.
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Live-sync that user's profile document (name, email, dob, phone) from Firestore.
  useEffect(() => {
    if (!user) {
      setProfile(null)
      return undefined
    }
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      setProfile(snap.exists() ? snap.data() : null)
    })
    return unsubscribe
  }, [user])

  const isAdmin = Boolean(user && ADMIN_UID && user.uid === ADMIN_UID)

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
