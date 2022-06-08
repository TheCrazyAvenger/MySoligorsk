import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.white,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
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
    color: Colors.black,
    textTransform: 'uppercase',
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
  secondHeader: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '63%',
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: Fonts.openSansBold,
  },
  mapContainer: {
    padding: 20,
    paddingTop: 10,
  },
  mapView: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
