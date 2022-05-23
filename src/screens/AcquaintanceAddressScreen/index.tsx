import { Screens } from '@/constants'
import { AcquaintanceAddressForm } from '@/forms'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'

export const AcquaintanceAddressScreen = () => {
  const route: any = useRoute()
  const navigation = useNavigation<any>()
  const initialValues = { street: '', house: '' }

  const handleGoNext = (values: any) => {
    const { street, house } = values

    navigation.navigate(Screens.acquaintanceFinish, {
      data: {
        ...route.params?.data,
        address: {
          street,
          house,
        },
      },
    })
  }
  const handleSkip = () =>
    navigation.navigate(
      navigation.navigate(Screens.acquaintanceFinish, {
        data: { ...route.params, address: null },
      })
    )

  return <AcquaintanceAddressForm handleSkip={handleSkip} onSubmit={handleGoNext} initialValues={initialValues} />
}
