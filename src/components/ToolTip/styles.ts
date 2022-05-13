import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tooltipMessageText: {
    fontFamily: Fonts.openSansRegular,
    fontSize: 13,
    color: Colors.black,
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
