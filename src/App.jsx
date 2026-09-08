import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { useFavorites } from './hooks/useFavorites'
import { useAllTools } from './hooks/useAllTools'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import AllTools from './pages/AllTools'
import CategoriesIndex from './pages/CategoriesIndex'
import CategoryPage from './pages/CategoryPage'
import ToolDetails from './pages/ToolDetails'
import FreeTools from './pages/FreeTools'
import BTechStudents from './pages/BTechStudents'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminAddTool from './pages/AdminAddTool'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

function AppShell() {
  const { theme, toggleTheme } = useTheme()
  const favoritesApi = useFavorites()
  const { tools } = useAllTools() // static verified tools + any admin-added tools, merged live

  return (
    <div className="flex min-h-screen flex-col bg-mesh bg-[var(--bg)]">
      <ScrollToTop />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/tools" element={<AllTools tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/tools/:id" element={<ToolDetails tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/categories" element={<CategoriesIndex tools={tools} />} />
          <Route path="/categories/:id" element={<CategoryPage tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/free-tools" element={<FreeTools tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/students" element={<BTechStudents tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/favorites" element={<Favorites tools={tools} favoritesApi={favoritesApi} />} />
          <Route path="/about" element={<About tools={tools} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/add-tool" element={<AdminAddTool />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  )
}
