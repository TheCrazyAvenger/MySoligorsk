import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    // paddingVertical: 130,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  text: {
    textAlign: 'center',
  },
})
