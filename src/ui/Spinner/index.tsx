import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  style?: StyleProp<ViewStyle>
}

export const Spinner = ({ style }: Props) => {
  const { colors } = useTheme()
  return (
    <LottieView
      style={[styles.container, { backgroundColor: colors.background }, style]}
      source={require('@/assets/spinner.json')}
      autoPlay
      loop
    />
  )
}
