import { Colors } from '@/constants'
import React, { ReactNode } from 'react'
import { ActivityIndicator, GestureResponderEvent, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
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
  icon?: string
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
  icon,
}) => {
  return (
    <TouchableRipple
      borderless
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
      <View style={styles.buttonInner}>
        {icon ? <Icon name={icon} color={Colors.white} size={25} style={{ marginRight: 7 }} /> : null}
        <Text
          style={[
            styles.text,
            outlined && styles.outlinedText,
            (disabled || loading) && styles.disabledText,
            (disabled || loading) && outlined && styles.disabledOutlinedText,
            icon ? { fontSize: 15 } : null,
            textStyle,
          ]}
        >
          {loading ? <ActivityIndicator color={Colors.white} /> : children}
        </Text>
      </View>
    </TouchableRipple>
  )
}
