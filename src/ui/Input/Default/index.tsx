import { Colors } from '@/constants'
import { useField } from '@/hooks'
import React, { useCallback, useState } from 'react'
import { Input as RNEInput } from 'react-native-elements'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const Default = ({
  errorMessage,
  secureTextEntry,
  isSecure,
  showSecureEntryIcon,
  containerPropStyle,
  onBlur,
  rightIcon,
  touched,
  inputStyle,
  inputContainerStyle,
  setSecureTextEntry,
  multiline,
  numberOfLines,
  ...otherProps
}: any) => {
  const { colors }: any = useTheme()
  const [secureEntry, setSecureEntry] = useState(secureTextEntry)
  const handleRightIconPress = useCallback(() => {
    if (setSecureTextEntry) {
      setSecureTextEntry()
    }
    setSecureEntry((currentSecureValue: any) => !currentSecureValue)
  }, [setSecureTextEntry])

  const { handleFocus, handleBlur, error } = useField({ onBlur, touched, errorMessage })

  const icon =
    showSecureEntryIcon && !rightIcon
      ? {
          type: 'ionicon',
          name: secureEntry ? 'eye-outline' : 'eye',
          color: Colors.iconEyes,
          onPress: handleRightIconPress,
          size: 29,
        }
      : rightIcon

  return (
    <RNEInput
      {...otherProps}
      numberOfLines={numberOfLines}
      multiline={multiline}
      onFocus={handleFocus}
      onBlur={handleBlur}
      errorMessage={error}
      rightIcon={icon}
      secureTextEntry={!!(secureEntry || isSecure)}
      placeholderTextColor={Colors.silver}
      containerStyle={[styles.containerStyle, containerPropStyle]}
      inputStyle={[styles.inputStyle, inputStyle, multiline && styles.multilineInput, { color: colors.text }]}
      inputContainerStyle={[
        styles.inputContainerStyle,
        inputContainerStyle,
        error && styles.inputContainerErrorStyle,
        multiline && styles.multilineInput,
        { backgroundColor: colors.input, borderColor: colors.inputBorder },
      ]}
      labelStyle={[styles.labelStyle, error && styles.labelErrorStyle, { color: colors.text }]}
      errorStyle={styles.errorStyle}
      rightIconContainerStyle={styles.rightIconContainerStyle}
      allowFontScaling={false}
    />
  )
}
