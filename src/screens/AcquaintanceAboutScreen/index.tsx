import { FormWrapper } from '@/components'
import { Colors, Fonts, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group'
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

export const AcquaintanceAboutScreen = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null)
  const route = useRoute()
  const navigation = useNavigation<any>()

  const handleGoNext = () =>
    navigation.navigate(Screens.acquaintanceBirthDate, { data: { ...route.params, location: selectedCheckbox } })

  const handleSetAbout = (id: string) => {
    if (id === '0' || id === '1') {
      setSelectedCheckbox('local')
    } else {
      setSelectedCheckbox('visitor')
    }
  }

  return (
    <FormWrapper
      style={styles.container}
      title={'Расскажите о себе'}
      onContinue={handleGoNext}
      disabledContinueBtn={!selectedCheckbox}
    >
      <BouncyCheckboxGroup
        data={data}
        style={{ flexDirection: 'column' }}
        onChange={(selectedItem: ICheckboxButton) => {
          const index = JSON.stringify(selectedItem.id)
          handleSetAbout(index)
        }}
      />
    </FormWrapper>
  )
}
