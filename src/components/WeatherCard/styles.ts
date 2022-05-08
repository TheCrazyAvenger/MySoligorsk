import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  card: {
    padding: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  watherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  conditions: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
