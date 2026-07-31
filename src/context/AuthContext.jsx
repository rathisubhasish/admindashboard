import { createContext, useCallback, useContext, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'admindashboard.auth.email'

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => localStorage.getItem(STORAGE_KEY))

  const login = useCallback((loginEmail) => {
    localStorage.setItem(STORAGE_KEY, loginEmail)
    setEmail(loginEmail)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setEmail(null)
  }, [])

  const value = { email, isAuthenticated: Boolean(email), login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
