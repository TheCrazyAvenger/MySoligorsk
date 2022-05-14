import { FormWrapper } from '@/components'
import { Colors, Fonts } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { styles } from './styles'

const renderText = (text: string) => {
  return (
    <Typography.Label color={Colors.black} style={{ fontFamily: Fonts.openSansRegular }}>
      {text}
    </Typography.Label>
  )
}

const data: any = [
  {
    id: 0,
    fillColor: '#629FFA',
    text: renderText('Я здесь живу'),
    textStyle: { textDecorationLine: 'none' },
    style: { marginBottom: 15, marginRight: 40 },
  },
  {
    id: 1,
    fillColor: '#629FFA',
    text: renderText('Я здесь живу, но учусь/работаю в другом городе'),
    textStyle: { textDecorationLine: 'none' },
    style: { marginBottom: 15, marginRight: 40 },
  },
  {
    id: 2,
    fillColor: '#629FFA',
    text: renderText('Я здесь учусь, но живу/работаю в другом городе'),
    textStyle: { textDecorationLine: 'none' },
    style: { marginBottom: 15, marginRight: 40 },
  },
  {
    id: 3,
    fillColor: '#629FFA',
    text: renderText('Я турист'),
    textStyle: { textDecorationLine: 'none' },
    style: { marginBottom: 15, marginRight: 40 },
  },
]

export const AcquaintanceBirthDateScreen = () => {
  const [birthDate, setBirthDate] = useState(new Date())
  const navigation = useNavigation<any>()
  const route = useRoute()
  console.log(route.params, birthDate)
  const handleGoNext = () => {}

  const isContinueButtonDisabled = new Date('2010-01-01') <= birthDate

  return (
    <FormWrapper
      style={styles.container}
      title={'Когда вы родились?'}
      onContinue={handleGoNext}
      disabledContinueBtn={isContinueButtonDisabled}
    >
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
