import { Colors } from '@/constants'
import { getOffset } from '@/helpers'
import { TextPropsTypes } from '@/ui'
import React from 'react'
import { Text as RNText } from 'react-native'
import { styles } from './styles'

export const H2: React.FC<TextPropsTypes> = ({
  children,
  style,
  color = Colors.titleText,
  size = 25,
  lineH = 34,
  textAlign = 'auto',
  ...rest
}) => {
  return (
    <RNText
      style={[
        styles.text,
        {
          color: color,
          fontSize: size,
          lineHeight: lineH,
          textAlign: textAlign,
        },
        style,
        getOffset(rest),
      ]}
      {...rest}
    >
      {children}
    </RNText>
  )
}
