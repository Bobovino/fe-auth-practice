'use client'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore((state) => state.login)
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response=await login(email, password)
    if (response) {
        router.push('/')
    }else{
      alert("Could not login")
    }
  }

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center mt-[8dvh] px-6 py-12 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<img
					className='mx-auto h-10 w-auto'
					alt='5head'
				/>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight '>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit}>
          <div className='m-2'>
            <label className='m-2'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='m-2'>
            <label className='m-2'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="'w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50'
          >" type="submit">Login</button>
        </form>
        <div className='mt-4 text-center'>
          <Link href='/auth/passwordreset/request' className='text-sm text-indigo-600 hover:text-indigo-500'>
            Forgot password?
          </Link>
        </div>
        <div className='mt-4'>
          <button
            onClick={loginWithGoogle}
            className='w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50'
          >
            Sign in with Google
          </button>
        </div>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Don&apos;t have an account?{' '}
          <Link
            href='/auth/register'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
