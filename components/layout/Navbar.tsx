// components/layout/Navbar.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from '@/lib/useUser'
import { AuthModal } from '@/components/layout/AuthModal'
import { useTheme } from 'next-themes'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function Navbar() {
  const { user, loading } = useUser()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authType, setAuthType] = useState<'signin' | 'signup'>('signup')
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      toast.error('Error al cerrar sesión', {
        description: error.message
      })
    } else {
      router.refresh()
      router.push('/')
    }
  }

  if (loading) return null

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-background/90 backdrop-blur-md border-b z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold text-foreground">KaraokeFun</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground font-medium">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Cerrar sesión
                </Button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setAuthType('signin')
                    setAuthModalOpen(true)
                  }}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => {
                    setAuthType('signup')
                    setAuthModalOpen(true)
                  }}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        type={authType}
      />
    </>
  )
}