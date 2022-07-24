import { addresses, Screens } from '@/constants'
import { AcquaintanceAddressForm } from '@/forms'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'

export const AcquaintanceAddressScreen = () => {
  const route: any = useRoute()
  const navigation = useNavigation<any>()
  const initialValues = { street: '', house: '' }
  const [unknownAddressModal, setUnknownAddressModal] = useState(false)
  const handleCloseModal = () => setUnknownAddressModal(false)

  const handleGoNext = async (values: any) => {
    const { street, house } = values

    const isAddressExsist = await addresses.find((item) => item.title === street)
    const isHouseExsist = await isAddressExsist?.houses.find((item) => item === house)

    if (!isAddressExsist || !isHouseExsist) {
      setUnknownAddressModal(true)
    } else {
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
  }
  const handleSkip = () =>
    navigation.navigate(Screens.acquaintanceFinish, {
      data: { ...route.params?.data, address: null },
    })

  return (
    <AcquaintanceAddressForm
      unknownAddressModal={unknownAddressModal}
      handleCloseModal={handleCloseModal}
      handleSkip={handleSkip}
      onSubmit={handleGoNext}
      initialValues={initialValues}
    />
  )
}
