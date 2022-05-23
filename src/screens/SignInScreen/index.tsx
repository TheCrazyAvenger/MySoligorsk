import { SignInForm } from '@/forms'
import auth from '@react-native-firebase/auth'
import React, { useState } from 'react'

export const SignInScreen = () => {
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const initialValues = { email: '', password: '' }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    setError('')

    const { email, password } = values

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        if (error.code === 'auth/wrong-password') {
          return setError('Пароль недействителен или у пользователя нет пароля')
        }

        if (error.code === 'auth/user-not-found') {
          return setError('Нет записи пользователя, соответствующей этому идентификатору. Пользователь мог быть удален')
        }

        return setError('Что-то пошло не так')
      })
  }

  return <SignInForm onSubmit={handleSubmit} initialValues={initialValues} loading={loading} error={error} />
}
