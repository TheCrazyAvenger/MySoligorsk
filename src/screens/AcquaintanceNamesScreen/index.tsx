import { Screens } from '@/constants'
import { AcquaintanceNamesForm } from '@/forms'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const AcquaintanceNamesScreen = () => {
  const navigation = useNavigation<any>()
  const initialValues = { firstname: '', lastname: '' }

  const handleGoNext = (values: any) => navigation.navigate(Screens.acquaintanceAbout, { data: values })

  return <AcquaintanceNamesForm onSubmit={handleGoNext} initialValues={initialValues} />
}
