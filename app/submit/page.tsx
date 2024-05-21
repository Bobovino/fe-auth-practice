"use client"
import { useEffect } from "react"
import { useCounterStore } from "@/stores/counterStore"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"

export default function Submit() {
  const { counter, increment, decrement, reset, fetchCounter, submitCounter } = useCounterStore()
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const fetchCounterData = async () => {
      if (user) {
        await fetchCounter(user.id)
      }
    }

    if (user) {
      fetchCounterData()
    } else {
      router.push("/login")
    }
  }, [user, fetchCounter, router])

  const handleSubmit = async () => {
    if (user) {
      await submitCounter(user.id)
      alert("Counter value submitted successfully")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl mb-4">Submit Counter</h1>
      <div className="flex items-center space-x-4">
        <button onClick={decrement} className="p-2 bg-red-500 text-white">-</button>
        <span className="text-2xl">{counter}</span>
        <button onClick={increment} className="p-2 bg-green-500 text-white">+</button>
      </div>
      <button onClick={reset} className="p-2 bg-gray-500 text-white">Reset</button>
      <button onClick={handleSubmit} className="p-2 bg-blue-500 text-white">Submit</button>
    </div>
  )
}
