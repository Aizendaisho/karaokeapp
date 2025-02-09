// components/layout/AuthModal.tsx
'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { GithubIcon, GoogleIcon } from './Icons'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function AuthModal({
  open,
  onOpenChange,
  type
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: 'signin' | 'signup'
}) {
  const router = useRouter()

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent' // Necesario para Google
        }
      }
    })

    if (error) {
      toast.error('Error de autenticación', {
        description: error.message
      })
    } else {
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {type === 'signin' ? 'Bienvenido de nuevo' : 'Únete a la comunidad'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleOAuthLogin('google')}
            variant="outline"
            className="w-full gap-2"
          >
            <GoogleIcon />
            Continuar con Google
          </Button>
          
          <Button
            onClick={() => handleOAuthLogin('github')}
            variant="outline"
            className="w-full gap-2"
          >
            <GithubIcon />
            Continuar con GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}