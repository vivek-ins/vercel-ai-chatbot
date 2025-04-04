'use client'

import * as React from 'react'
import { LoginButton } from '@/components/login-button'

interface GitHubLoginButtonProps extends React.ComponentProps<typeof LoginButton> {
  text?: string
  showGithubIcon?: boolean
}

export function GitHubLoginButton({
  text = 'Login with GitHub',
  showGithubIcon = true,
  ...props
}: GitHubLoginButtonProps) {
  return (
    <LoginButton
      provider="github"
      text={text}
      showGithubIcon={showGithubIcon}
      {...props}
    />
  )
} 