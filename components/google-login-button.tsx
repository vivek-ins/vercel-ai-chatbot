'use client'

import * as React from 'react'
import { LoginButton } from '@/components/login-button'

interface GoogleLoginButtonProps extends React.ComponentProps<typeof LoginButton> {
  text?: string
  showGoogleIcon?: boolean
}

export function GoogleLoginButton({
  text = 'Login with Google',
  showGoogleIcon = true,
  ...props
}: GoogleLoginButtonProps) {
  return (
    <LoginButton
      provider="google"
      text={text}
      showGoogleIcon={showGoogleIcon}
      {...props}
    />
  )
} 