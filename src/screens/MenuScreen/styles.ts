import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    backgroundColor: Colors.lightGrey,
    borderRadius: 70,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: Fonts.openSansBold,
  },
})
