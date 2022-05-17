import { FormWrapper } from '@/components'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const EmailVerificationScreen = () => {
  const navigation = useNavigation<any>()

  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
  }, [])

  const handleSendAgain = () => {}

  return (
    <FormWrapper
      scrollViewStyle={{ opacity }}
      title={'Подтверждение Email'}
      description={
        'В течение минуты вам будет выслано письмо на указаный Email, перейдите по ссылке из письма, чтобы подтвердить свою регистрацию'
      }
      onContinue={handleSendAgain}
      buttonTitle={'Отпрвить еще раз'}
    />
  )
}
