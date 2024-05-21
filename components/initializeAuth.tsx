'use client'

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
