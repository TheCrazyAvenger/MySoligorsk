import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container: {
    overflow: 'hidden',
    width: 230,
    height: 320,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: Colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1,
  },
  imageInner: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontFamily: Fonts.openSansBold,
  },
  likeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  hoursContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 20,
    height: 27,
    left: 20,
    paddingHorizontal: 9,
    borderRadius: 30,
  },
})
