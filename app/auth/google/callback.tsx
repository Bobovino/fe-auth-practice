'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'

const GoogleCallback = () => {
  const router = useRouter()
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const accessToken = urlParams.get('accessToken')

      if (accessToken) {
        // Store the access token and navigate to the homepage
        setAccessToken(accessToken)
        localStorage.setItem('accessToken', accessToken)
        router.push('/')
      } else {
        // Handle the error and redirect to login
        console.error('Google authentication failed')
        router.push('/auth/login')
      }
    }

    handleGoogleCallback()
  }, [router, setAccessToken])

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center mt-[8dvh] px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
          Completing Google Sign In...
        </h2>
      </div>
    </div>
  )
}

export default GoogleCallback
