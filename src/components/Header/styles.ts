import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 20,
    width: 32,
    height: 32,
  },
  text: {
    fontSize: 20,
    lineHeight: 25,
    color: Colors.titleText,
    fontFamily: Fonts.openSansSemiBold,
  },
})
