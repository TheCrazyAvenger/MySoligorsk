import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#A4CFF7',
    marginBottom: 20,
    width: 120,
    height: 120,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    paddingVertical: 7,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
})
