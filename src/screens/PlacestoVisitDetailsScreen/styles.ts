import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 20,
  },
  image: {
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: -1,
  },
  backButton: {
    position: 'absolute',
    zIndex: 0,
    left: 20,
  },
  title: {
    fontFamily: Fonts.openSansBold,
    textTransform: 'uppercase',
    lineHeight: 76,
    color: Colors.white,
    fontSize: 70,
    marginLeft: -5,
  },
  subTitle: {
    fontFamily: Fonts.openSansSemiBold,
    color: Colors.white,
    fontSize: 22,
  },
  header: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  itemImage: {
    width: '100%',
    height: '63%',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: Fonts.openSansBold,
  },
})
