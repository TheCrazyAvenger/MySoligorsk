import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentTitle: {
    fontFamily: Fonts.openSansBold,
    color: Colors.black,
    textTransform: 'uppercase',
  },
})
