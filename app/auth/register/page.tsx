'use client'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const register = useAuthStore((state) => state.register)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(username, email, password)
  }

  return (
    <form  onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          className='text-black'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          className='text-black'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className='text-black'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
