import { Fonts } from '@/constants'
import { getOffset } from '@/helpers'
import { TextPropsTypes } from '@/ui'
import React from 'react'
import { Text as RNText } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const Default: React.FC<TextPropsTypes> = ({
  children,
  style,
  color,
  size = 15,
  lineH = 22,
  textAlign = 'auto',
  type = 'regular',
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
          fontFamily: type === 'regular' ? Fonts.openSansRegular : Fonts.openSansSemiBold,
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
