import { FormWrapper } from '@/components'
import { Screens } from '@/constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'

export const AcquaintanceBirthDateScreen = () => {
  const [birthDate, setBirthDate] = useState(new Date())
  const navigation = useNavigation<any>()
  const route = useRoute()

  const handleGoNext = () => {
    navigation.navigate(Screens.acquaintanceInterests, {
      data: { ...route.params, birthDate: birthDate.toLocaleDateString() },
    })
  }

  const isContinueButtonDisabled = new Date('2010-01-01') <= birthDate

  return (
    <FormWrapper title={'Когда вы родились?'} onContinue={handleGoNext} disabledContinueBtn={isContinueButtonDisabled}>
      <DatePicker
        date={birthDate}
        style={{ alignSelf: 'center' }}
        maximumDate={new Date()}
        minimumDate={new Date('1920-01-01')}
        onDateChange={setBirthDate}
        mode='date'
      />
    </FormWrapper>
  )
}
