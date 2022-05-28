import { Colors } from '@/constants'
import { useField } from '@/hooks'
import React from 'react'
import { Dimensions } from 'react-native'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { styles } from './styles'

export const Select = ({
  dataSet,
  errorMessage,
  containerPropStyle,
  placeholder,
  onBlur,
  rightIcon,
  touched,
  inputStyle,
  rightButtonsContainerStyle,
  inputContainerStyle,
  suggestionsListContainerStyle,
  numberOfLines,
  ...otherProps
}: any) => {
  const { handleFocus, handleBlur, error } = useField({ onBlur, touched, errorMessage })

  return (
    <AutocompleteDropdown
      {...otherProps}
      dataSet={dataSet}
      clearOnFocus={false}
      bottomOffset={300}
      closeOnBlur={false}
      closeOnSubmit={true}
      onFocus={handleFocus}
      onBlur={handleBlur}
      debounce={200}
      emptyResultText='Нет результатов'
      suggestionsListMaxHeight={Dimensions.get('window').height * 0.25}
      inputHeight={57}
      errorMessage={error}
      textInputProps={{
        placeholder,
        placeholderTextColor: Colors.silver,
        allowFontScaling: false,
        autoCorrect: false,
      }}
      suggestionsListContainerStyle={{ ...styles.suggestionsListContainerStyle, ...suggestionsListContainerStyle }}
      inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle, error && styles.inputContainerErrorStyle]}
      rightButtonsContainerStyle={{ ...styles.rightIconContainerStyle, ...rightButtonsContainerStyle }}
      allowFontScaling={false}
    />
  )
}
