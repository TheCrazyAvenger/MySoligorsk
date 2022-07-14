import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  inner: {
    paddingHorizontal: 20,
  },
  buttons: {
    backgroundColor: Colors.white,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  reviewHeader: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
