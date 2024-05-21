import { create } from 'zustand'
import axios from 'axios'
import jwt, { JwtPayload } from 'jsonwebtoken'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface User {
  id: string
  email: string
  username: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  setAccessToken: (token: string) => void
  initialize: () => void
  renewAccessToken: () => Promise<boolean>
  login: (email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => void
  register: (username: string, email: string, password: string) => Promise<boolean>
  requestPasswordReset: (email: string) => Promise<boolean>
  resetPassword: (token: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  setAccessToken: (token) => {
    set({ accessToken: token })
    localStorage.setItem('accessToken', token)
  },
  initialize: () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      try {
        const decodedToken = jwt.decode(accessToken) as JwtPayload | null
        if (!decodedToken) {
          throw new Error('Invalid token')
        }
        const currentTime = Math.floor(Date.now() / 1000)
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          set({
            user: { id: decodedToken.id, email: decodedToken.email, username: decodedToken.username },
            accessToken
          })
        } else {
          get().renewAccessToken().then((success) => {
            if (!success) {
              get().logout()
            }
          })
        }
      } catch (error) {
        console.error('Failed to decode access token:', error)
        get().renewAccessToken().then((success) => {
          if (!success) {
            get().logout()
          }
        })
      }
    } else {
      get().renewAccessToken().then((success) => {
        if (!success) {
          get().logout()
        }
      })
    }
  },
  renewAccessToken: async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/renewaccesstoken`, {}, { withCredentials: true })
      if (res.status === 200) {
        const { accessToken } = res.data
        const decodedToken = jwt.decode(accessToken) as JwtPayload | null
        if (!decodedToken) {
          throw new Error('Invalid token')
        }
        set({
          user: { id: decodedToken.id, email: decodedToken.email, username: decodedToken.username },
          accessToken
        })
        localStorage.setItem('accessToken', accessToken)
        return true
      } else {
        get().logout()
        return false
      }
    } catch (error) {
      console.error(error)
      get().logout()
      return false
    }
  },
  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { email, password }, { withCredentials: true })
      if (res.status === 200) {
        const { user, accessToken } = res.data
        set({ user, accessToken })
        localStorage.setItem('accessToken', accessToken)
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  },
  loginWithGoogle: () => {
    window.location.href = `${API_BASE_URL}/auth/google`
  },
  register: async (username, email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, { username, email, password }, { withCredentials: true })
      if (res.status === 200) {
        const { user } = res.data
        set({ user })
        return true
      }
      return false
    } catch (error) {
      console.error(error)
      return false
    }
  },
  requestPasswordReset: async (email) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/request-reset`, { email }, { withCredentials: true })
      return res.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  },
  resetPassword: async (token, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { password }, { withCredentials: true })
      return res.status === 200
    } catch (error) {
      console.error(error)
      return false
    }
  },
  logout: () => {
    set({ user: null, accessToken: null })
    localStorage.removeItem('accessToken')
    document.cookie = 'refreshToken=; Max-Age=0; path=/'
  },
}))
