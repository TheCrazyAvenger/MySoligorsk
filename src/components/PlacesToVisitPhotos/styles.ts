import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  seeAllContainer: {
    height: 200,
    width: 200,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  seeAll: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.grey,
  },
})
