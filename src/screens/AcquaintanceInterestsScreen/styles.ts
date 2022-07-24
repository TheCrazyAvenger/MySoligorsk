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
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 80,
  },
  interestsItem: {
    marginHorizontal: 15,
    width: 85,
  },
  icon: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestsItemSelected: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 10,
  },
})
