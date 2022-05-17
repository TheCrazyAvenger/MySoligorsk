import { FormWrapper } from '@/components'
import { Screens } from '@/constants'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

const regTooltipMessage =
  'Регистрация позволит нам подобрать информацию и места, подходящие именно вам. А также вы сможете не потерять свои данные, например, при заходе в приложение с другого девайса'
const regTooltipTitle = 'Для чего нам нужна эта информация?'

export const AcquaintanceStartScreen = () => {
  const navigation = useNavigation<any>()

  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: false }).start()
  }, [])

  const handleGoNext = () => navigation.navigate(Screens.acquaintanceNames)

  return (
    <FormWrapper
      scrollViewStyle={{ opacity }}
      title={'Давайте познакомимся'}
      description={
        'Приложение будет развиваться, и со временем, вы сможете находить людей с похожими увлечениями, и составлять себе компанию!'
      }
      showTooltip={true}
      tooltipTitle={regTooltipTitle}
      tooltipMessage={regTooltipMessage}
      onContinue={handleGoNext}
    />
  )
}
