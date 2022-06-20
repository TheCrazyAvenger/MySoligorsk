import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginVertical: 10,
  },
  socialItem: {
    marginLeft: 20,
    marginTop: 21,
    borderRadius: 10,
    width: 40,
    height: 40,
    backgroundColor: Colors.iconGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
