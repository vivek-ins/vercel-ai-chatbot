'use client'

import * as React from 'react'
import { GitHubLoginButton } from '@/components/github-login-button'
import { GoogleLoginButton } from '@/components/google-login-button'
import { cn } from '@/lib/utils'

interface AuthButtonsProps extends React.ComponentProps<'div'> {
  showGithub?: boolean
  showGoogle?: boolean
  className?: string
}

export function AuthButtons({
  showGithub = true,
  showGoogle = true,
  className,
  ...props
}: AuthButtonsProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {showGithub && <GitHubLoginButton />}
      {showGoogle && <GoogleLoginButton />}
    </div>
  )
} 