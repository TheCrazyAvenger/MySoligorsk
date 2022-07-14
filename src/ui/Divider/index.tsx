import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { styles } from './styles'

type Props = {
  style?: StyleProp<ViewStyle>
}

export const Divider = ({ style }: Props) => {
  return <View style={[styles.line, style]} />
}
