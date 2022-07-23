import { Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: Fonts.openSansBold,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
})
