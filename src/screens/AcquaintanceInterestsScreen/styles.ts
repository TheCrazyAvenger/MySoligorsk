import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  nextButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
  },
  interestsContainer: {
    // paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 80,
  },
  interestsItem: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  interestsItemSelected: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 10,
  },
})
