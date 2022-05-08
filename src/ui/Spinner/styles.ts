import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
