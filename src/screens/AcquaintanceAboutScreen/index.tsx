import { FormWrapper } from '@/components'
import { Fonts, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group'
import { useTheme } from 'react-native-paper'

const renderText = (text: string) => {
  return <Typography.Label style={{ fontFamily: Fonts.openSansRegular }}>{text}</Typography.Label>
}

export const AcquaintanceAboutScreen = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<{ name: string; value: string } | null>(null)
  const route: any = useRoute()
  const navigation = useNavigation<any>()
  const { colors } = useTheme()

  const handleGoNext = () =>
    navigation.navigate(Screens.acquaintanceBirthDate, { data: { ...route.params?.data, location: selectedCheckbox } })

  const data: any = [
    {
      id: 0,
      fillColor: '#629FFA',
      text: renderText('Я здесь живу'),
      title: 'Я здесь живу',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 1,
      fillColor: '#629FFA',
      text: renderText('Я здесь живу, но учусь/работаю в другом городе'),
      title: 'Я здесь живу, но учусь/работаю в другом городе',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 2,
      fillColor: '#629FFA',
      text: renderText('Я здесь учусь, но живу/работаю в другом городе'),
      title: 'Я здесь учусь, но живу/работаю в другом городе',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
    {
      id: 3,
      fillColor: '#629FFA',
      text: renderText('Я турист'),
      title: 'Я турист',
      textStyle: { textDecorationLine: 'none', color: colors.text },
      style: { marginBottom: 15, marginRight: 40 },
    },
  ]

  const handleSetAbout = (id: string) => {
    if (id === '0' || id === '1') {
      setSelectedCheckbox({ value: 'local', name: data[+id].title })
    } else {
      setSelectedCheckbox({ value: 'visitor', name: data[+id].title })
    }
  }

  return (
    <FormWrapper title={'Расскажите о себе'} onContinue={handleGoNext} disabledContinueBtn={!selectedCheckbox}>
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
