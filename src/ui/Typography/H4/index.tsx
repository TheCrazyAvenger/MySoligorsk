import { getOffset } from '@/helpers'
import { TextPropsTypes } from '@/ui'
import React from 'react'
import { Text as RNText } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const H4: React.FC<TextPropsTypes> = ({
  children,
  style,
  color,
  size = 18,
  lineH = 22,
  textAlign = 'auto',
  ...rest
}) => {
  const { colors } = useTheme()

  return (
    <RNText
      style={[
        styles.text,
        {
          color: color ?? colors.text,
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
