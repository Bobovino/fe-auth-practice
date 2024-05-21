'use client'
import Link from 'next/link'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-white">Home</p>
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link href="/submit">
                <p className="text-white">Submit</p>
              </Link>
              <Link href="/dashboard">
                <p className="text-white">Dashboard</p>
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <p className="text-white">Login</p>
              </Link>
              <Link href="/auth/register">
                <p className="text-white">Register</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
