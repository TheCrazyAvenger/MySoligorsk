import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  mapContainer: {
    padding: 20,
    paddingTop: 10,
  },
  mapView: {
    overflow: 'hidden',
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 10,
    elevation: 5,
  },
})
