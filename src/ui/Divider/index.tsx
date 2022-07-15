import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  style?: StyleProp<ViewStyle>
}

export const Divider = ({ style }: Props) => {
  const { colors }: any = useTheme()
  return <View style={[styles.line, { backgroundColor: colors.lightGrey }, style]} />
}
