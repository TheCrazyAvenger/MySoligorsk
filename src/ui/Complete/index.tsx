import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { styles } from './styles'

type Props = {
  style?: StyleProp<ViewStyle>
}

export const Complete = ({ style }: Props) => {
  return (
    <LottieView style={[styles.container, style]} source={require('@/assets/complete.json')} autoPlay loop={false} />
  )
}
