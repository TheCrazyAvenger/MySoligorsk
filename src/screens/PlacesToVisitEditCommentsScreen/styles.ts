import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
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
