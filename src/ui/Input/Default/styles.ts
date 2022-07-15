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
    borderColor: '#D1CBCB',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingLeft: 17,
    marginTop: 6,
    height: 57,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 130,
  },
  inputContainerErrorStyle: {
    borderColor: Colors.error,
  },
  containerStyle: {
    paddingHorizontal: 0,
    marginBottom: 2,
  },
  inputStyle: {
    color: Colors.contentText,
    fontFamily: Fonts.openSansRegular,
    fontSize: 16,
    lineHeight: 22,
  },
  errorStyle: {
    color: Colors.error,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 0,
    fontFamily: Fonts.openSansRegular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
  rightIconContainerStyle: {
    marginRight: 12,
  },
})
