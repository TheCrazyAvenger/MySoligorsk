import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerStyle: {},
  tooltipMessageText: {
    fontFamily: Fonts.openSansRegular,
    fontSize: 13,
    alignSelf: 'center',
    marginHorizontal: 2,
  },
  tooltipMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    width: 16,
    height: 16,
    borderColor: Colors.primary,
    borderRadius: 8,
    borderWidth: 0.8,
  },
})
