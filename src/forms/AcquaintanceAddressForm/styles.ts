import { Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  errorsContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  error: {
    marginHorizontal: 20,
    marginBottom: 4,
    fontFamily: Fonts.openSansRegular,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
})
