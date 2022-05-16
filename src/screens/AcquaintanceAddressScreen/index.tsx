import { Screens } from '@/constants'
import { AcquaintanceNamesForm } from '@/forms'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

export const AcquaintanceAddressScreen = () => {
  const navigation = useNavigation<any>()
  const initialValues = { street: '', house: '' }

  const handleGoNext = (values: any) => navigation.navigate(Screens.acquaintanceAbout, { data: values })

  return <AcquaintanceNamesForm onSubmit={handleGoNext} initialValues={initialValues} />
}
