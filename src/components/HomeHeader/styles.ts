import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: Colors.grey,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  titleinner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  weather: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontFamily: Fonts.openSansSemiBold,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: Fonts.openSansBold,
    color: Colors.grey,
  },
  headerSubtitile: {
    fontSize: 22,
    fontFamily: Fonts.openSansBold,
    color: Colors.black,
  },
})
