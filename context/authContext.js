import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from 'supabase'

export const AuthContext = createContext({
  user: null,
  isLoading: true,
  handleGoogleLogin: () => {},
  handleLogout: () => {}
})

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.session()

      setUser(session?.user ?? null)
      setIsLoading(false)

      await supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      })
    }
    getSession()
  }, [])

  const value = {
    handleGoogleLogin: async () => {
      setIsLoading(true)
      await supabase.auth.signIn({
        provider: 'google'
      })
      setIsLoading(false)
    },
    handleLogout: async () => {
      setIsLoading(true)
      await supabase.auth.signOut()
      setIsLoading(false)
    },
    user,
    isLoading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
