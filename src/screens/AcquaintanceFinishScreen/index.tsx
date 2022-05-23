import { FormWrapper } from '@/components'
import auth from '@react-native-firebase/auth'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'

export const AcquaintanceFinishScreen = () => {
  const navigation = useNavigation<any>()
  const route: any = useRoute()

  const { firstname }: any = route.params?.data

  const handleSubmit = () => {
    console.log(route.params.data)
    auth()
      .currentUser?.updateProfile({
        displayName: firstname,
      })
      .then(() => {
        auth().currentUser?.reload()
        auth().currentUser?.getIdToken(true)
      })
  }

  return (
    <FormWrapper
      title={`Приятно было познакомиться, ${firstname}`}
      description={
        'Спасибо, что уделили свое время. Мы подобрали наиболее интересные места, связанные с вашими увлечениями. Давайте посмотрим!'
      }
      onContinue={handleSubmit}
    />
  )
}
