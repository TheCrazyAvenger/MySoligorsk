import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    left: 20,
  },
  title: {
    fontFamily: Fonts.openSansBold,
    textTransform: 'uppercase',
    lineHeight: 76,
    color: Colors.white,
    fontSize: 70,
  },
  subTitle: {
    fontFamily: Fonts.openSansSemiBold,
    color: Colors.white,
    fontSize: 22,
  },
  contentTitle: {
    fontFamily: Fonts.openSansBold,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  itemContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 10,
    marginRight: 20,
    marginVertical: 10,
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
