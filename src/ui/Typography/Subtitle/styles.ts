import { Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.openSansRegular,
    fontWeight: '400',
  },

  textUnderline: {
    textDecorationLine: 'underline',
  },
})
