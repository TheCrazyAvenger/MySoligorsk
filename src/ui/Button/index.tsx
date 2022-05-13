import React, { ReactNode } from 'react'
import { GestureResponderEvent, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { styles } from './styles'

export type ButtonProps = {
  children: ReactNode
  onPress?: (event: GestureResponderEvent) => void
  disabled?: boolean
  outlined?: boolean
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  loading?: boolean
  error?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  outlined,
  buttonStyle,
  textStyle,
  disabled,
  loading,
  error,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outlined && styles.outlinedButton,
        (disabled || loading) && (error ? styles.disabledErrorButton : styles.disabledButton),
        (disabled || loading) && outlined && styles.disabledOutlinedButton,
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text
        style={[
          styles.text,
          outlined && styles.outlinedText,
          (disabled || loading) && styles.disabledText,
          (disabled || loading) && outlined && styles.disabledOutlinedText,
          textStyle,
        ]}
      >
        {loading ? 'Loading...' : children}
      </Text>
    </TouchableOpacity>
  )
}
