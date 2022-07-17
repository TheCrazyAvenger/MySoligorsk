import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  labelStyle: {
    fontFamily: Fonts.openSansRegular,
    color: Colors.grey,
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '400',
  },
  labelErrorStyle: {
    color: Colors.error,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 17,
    marginTop: 6,
  },
  suggestionsListContainerStyle: {
    borderRadius: 30,
    marginTop: 5,
    overflow: 'hidden',
  },
  inputContainerErrorStyle: {
    borderColor: Colors.error,
  },
  rightIconContainerStyle: {
    marginRight: 12,
  },
})
