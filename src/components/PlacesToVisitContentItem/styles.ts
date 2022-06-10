import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding: 10,
    marginRight: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: '63%',
    borderRadius: 10,
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: Fonts.openSansBold,
  },
})
