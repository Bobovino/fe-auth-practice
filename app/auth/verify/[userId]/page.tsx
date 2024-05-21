'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

const VerifyEmail = () => {
  const router = useRouter()
  const { userId } = useParams()
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    if (userId) {
      const verifyEmail = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify/${userId}`)
          if (response.status === 200) {
            console.log("The response is: " + response.data)
            setMessage(response.data)
            // Redirect to login page after 3 seconds
            setTimeout(() => {
              router.push('/auth/login')
            }, 3000)
          } else {
            console.log("Failed to verify email. Please try again. " + response.data)
            setMessage('Failed to verify email. Please try again.')
          }
        } catch (error) {
          console.error(error)
          setMessage('An error occurred during the verification process.')
        }
      }

      verifyEmail()
    }else{}
    
  }, [userId])
    
  
  

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  )
}

export default VerifyEmail
