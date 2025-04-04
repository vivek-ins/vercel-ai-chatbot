'use client'

import * as React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import { IconGitHub, IconGoogle, IconSpinner } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  showGoogleIcon?: boolean
  text?: string
  provider?: 'github' | 'google'
}

export function LoginButton({
  text = 'Login with GitHub',
  showGithubIcon = true,
  showGoogleIcon = true,
  provider = 'github',
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  if (
    (provider === 'github' && process.env.NEXT_PUBLIC_AUTH_GITHUB !== 'true') ||
    (provider === 'google' && process.env.NEXT_PUBLIC_AUTH_GOOGLE !== 'true')
  ) {
    return null
  }

  const handleLogin = async () => {
    setIsLoading(true)
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/api/auth/callback` }
    })
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? (
        <IconSpinner className="mr-2 animate-spin" />
      ) : provider === 'github' && showGithubIcon ? (
        <IconGitHub className="mr-2" />
      ) : provider === 'google' && showGoogleIcon ? (
        <IconGoogle className="mr-2" />
      ) : null}
      {text}
    </Button>
  )
}
