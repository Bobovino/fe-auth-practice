'use client'

//This component is made so that the app checks if
// the user is already logged in with tokens

import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'

const InitializeAuth = () => {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return null
}

export default InitializeAuth
