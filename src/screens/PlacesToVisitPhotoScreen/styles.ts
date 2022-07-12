import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
    height: 60,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2,
  },
  imageContainer: {
    height: 200,
    margin: 2,
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    left: 20,
    top: 40,
    borderRadius: 20,
  },
  rightButton: {
    position: 'absolute',
    zIndex: 100,
    right: 20,
    top: 40,
    borderRadius: 20,
  },
})
