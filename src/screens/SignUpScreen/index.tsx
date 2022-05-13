import { SignUpNamesForm } from '@/forms'
import { setLogin } from '@/slices/authentication'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { styles } from './styles'

export const SignUpScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const handleAnonymous = () => dispatch(setLogin({ deviceId: '1' }))

  const initialValues = { email: '', password: '' }

  const handleSubmit = (values: any) => {
    console.log(values)
    handleAnonymous()
  }

  return (
    <View style={styles.container}>
      <Typography.TitleText lineH={50.73} style={[styles.text]} size={38}>
        Регистрация
      </Typography.TitleText>
      <SignUpNamesForm onSubmit={handleSubmit} initialValues={initialValues} />
    </View>
  )
}
