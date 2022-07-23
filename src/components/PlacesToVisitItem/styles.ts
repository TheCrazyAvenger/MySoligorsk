import { Colors, Fonts, placesToVisitTheme } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: placesToVisitTheme.ITEM_WIDTH,
    height: placesToVisitTheme.ITEM_HEIGHT,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginLeft: placesToVisitTheme.SPACING,
  },
  image: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: placesToVisitTheme.RADIUS,
  },
  imageInner: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 20,
    paddingTop: 55,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontFamily: Fonts.openSansBold,
    width: placesToVisitTheme.ITEM_WIDTH * 0.7,
    textTransform: 'uppercase',
    lineHeight: 36,
    color: Colors.white,
    fontSize: 30,
  },
  subTitle: {
    fontFamily: Fonts.openSansSemiBold,
    color: Colors.white,
    fontSize: 14,
  },
  likeButton: {
    position: 'absolute',
    bottom: 50,
    right: 40,
  },
  hoursContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 53,
    left: 40,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 30,
  },
})
