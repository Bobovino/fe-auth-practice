'use client'
import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/authStore"
import { useCounterStore } from "@/stores/counterStore"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { user } = useAuthStore()
  const { counter, fetchCounter } = useCounterStore()
  const [counterValue, setCounterValue] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCounterData = async () => {
      if (user) {
        await fetchCounter(user.id)
        setCounterValue(counter)
      }
    }

    if (user) {
      fetchCounterData()
    } else {
      router.push("/login")
    }
  }, [user, fetchCounter, router, counter])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl mb-4">User Dashboard</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Counter Value:</strong> {counterValue !== null ? counterValue : "Loading..."}</p>
    </div>
  )
}