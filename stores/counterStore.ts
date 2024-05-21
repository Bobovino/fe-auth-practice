import { create } from 'zustand'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface CounterState {
  counter: number
  setCounter: (counter: number) => void
  increment: () => void
  decrement: () => void
  reset: () => void
  fetchCounter: (userId: string) => Promise<void>
  submitCounter: (userId: string) => Promise<void>
}

export const useCounterStore = create<CounterState>()(
    (set, get) => ({
      counter: 0,
      setCounter: (counter: number) => set({ counter }),
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      decrement: () => set((state) => ({ counter: state.counter - 1 })),
      reset: () => set({ counter: 0 }),
      fetchCounter: async (userId: string) => {
        try {
          const token = localStorage.getItem('accessToken')
          if (!token) throw new Error('No access token found')

          const res = await fetch(`${API_BASE_URL}/api/counter/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (!res.ok) throw new Error(`Error: ${res.statusText}`)

          const data = await res.json()
          set({ counter: data.counter })
        } catch (error) {
          console.error('Failed to fetch counter:', error)
        }
      },
      submitCounter: async (userId: string) => {
        try {
          const { counter } = get()
          const token = localStorage.getItem('accessToken')
          if (!token) throw new Error('No access token found')

          const res = await fetch(`${API_BASE_URL}/api/counter`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId, counter })
          })

          if (!res.ok) throw new Error(`Error: ${res.statusText}`)
        } catch (error) {
          console.error('Failed to submit counter:', error)
        }
      }
    }),
)
