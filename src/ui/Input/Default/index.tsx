import { Colors } from '@/constants'
import { useField } from '@/hooks'
import React, { useCallback, useState } from 'react'
import { Input as RNEInput } from 'react-native-elements'
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
      inputStyle={[styles.inputStyle, inputStyle, multiline && styles.multilineInput]}
      inputContainerStyle={[
        styles.inputContainerStyle,
        inputContainerStyle,
        error && styles.inputContainerErrorStyle,
        multiline && styles.multilineInput,
      ]}
      labelStyle={[styles.labelStyle, error && styles.labelErrorStyle]}
      errorStyle={styles.errorStyle}
      rightIconContainerStyle={styles.rightIconContainerStyle}
      allowFontScaling={false}
    />
  )
}
