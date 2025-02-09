// lib/useUser.ts
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  return { user, loading }
}