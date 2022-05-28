import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#629FFA',
    borderRadius: 30,
    padding: 15,
  },
  disabledErrorButton: {
    backgroundColor: Colors.disabledError,
    borderColor: Colors.disabledError,
  },
  disabledButton: {
    backgroundColor: Colors.disabledPrimary,
    borderColor: Colors.disabledPrimary,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.openSansBold,
    lineHeight: 24,
    textAlign: 'center',
  },
  disabledText: {
    color: Colors.white,
  },

  // outline styles
  outlinedButton: {
    backgroundColor: '#A4CFF7',
  },
  outlinedText: {
    color: Colors.white,
  },
  disabledOutlinedButton: {
    backgroundColor: Colors.disabledPrimary,
  },
  disabledOutlinedText: {
    color: Colors.white,
  },
})
