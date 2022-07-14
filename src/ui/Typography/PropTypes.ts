import { StyleProp, TextProps as RNTextProps, TextStyle } from 'react-native'

export type TextPropsTypes = {
  style?: StyleProp<TextStyle>
  color?: any
  size?: any
  lineH?: any
  textAlign?: String
  underline?: StyleProp<Boolean>
  type?: 'regular' | 'semiBold'
  pa?: any
  pv?: any
  ph?: any
  pt?: any
  pr?: any
  pb?: any
  pl?: any
  ma?: any
  mv?: any
  mh?: any
  mt?: any
  mr?: any
  mb?: any
  ml?: any
} & RNTextProps
