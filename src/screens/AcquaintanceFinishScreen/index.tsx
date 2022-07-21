import { FormWrapper } from '@/components'
import { setUser } from '@/slices'
import { setIsRegistered } from '@/slices/authentication'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export const AcquaintanceFinishScreen = () => {
  const route: any = useRoute()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { firstname }: any = route.params?.data

  const handleSubmit = async () => {
    setIsLoading(true)

    const uid = auth().currentUser?.uid
    const email = auth().currentUser?.email

    firestore()
      .collection('Users')
      .doc(uid)
      .set(route.params.data)
      .then(() => {
        auth()
          .currentUser?.updateProfile({
            displayName: firstname,
          })
          .then(async () => {
            auth().currentUser?.reload()
            auth().currentUser?.getIdToken(true)
            const { firstname, lastname, interests } = route.params.data
            await dispatch(setUser({ firstname, lastname, email, interests }))
            dispatch(setIsRegistered(false))
          })
          .catch(() => {
            setError('Что-то пошло не так')
            setIsLoading(false)
          })
      })
      .catch(() => {
        setError('Что-то пошло не так')
        setIsLoading(false)
      })
  }

  return (
    <FormWrapper
      title={`Приятно было познакомиться, ${firstname}`}
      description={
        'Спасибо, что уделили свое время. Мы подобрали наиболее интересные места, связанные с вашими увлечениями. Давайте посмотрим!'
      }
      onContinue={handleSubmit}
      loading={isLoading}
      error={error}
    />
  )
}
