import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentTitle: {
    fontFamily: Fonts.openSansBold,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  reviewHeader: {
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentText: {
    fontFamily: Fonts.openSansSemiBold,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
