import { SignUpNamesForm } from '@/forms'
import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'

export const SignUpScreen = () => {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initialValues = { email: '', password: '' }

  const handleSubmit = (values: any) => {
    setIsLoading(true)
    setError('')

    const { email, password } = values

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.code === 'auth/email-already-in-use') {
          return setError('Этот адрес электронной почты уже используется')
        }

        if (error.code === 'auth/invalid-email') {
          return setError('Этот адрес электронной почты недействителен')
        }

        return setError('Что-то пошло не так')
      })
  }

  return <SignUpNamesForm onSubmit={handleSubmit} initialValues={initialValues} loading={loading} error={error} />
}
