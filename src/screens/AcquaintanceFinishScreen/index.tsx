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
      .set({
        ...route.params.data,
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/mysoligorsk-80c01.appspot.com/o/avatars%2Fblank-profile.png?alt=media&token=27da88d9-dc49-4cab-80aa-8f25a14dd203',
      })
      .then(() => {
        auth()
          .currentUser?.updateProfile({
            displayName: firstname,
          })
          .then(async () => {
            auth().currentUser?.reload()
            auth().currentUser?.getIdToken(true)
            const { firstname, lastname, interests } = route.params.data
            await dispatch(
              setUser({
                firstname,
                lastname,
                email,
                interests,
                avatar:
                  'https://firebasestorage.googleapis.com/v0/b/mysoligorsk-80c01.appspot.com/o/avatars%2Fblank-profile.png?alt=media&token=27da88d9-dc49-4cab-80aa-8f25a14dd203',
              })
            )
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
