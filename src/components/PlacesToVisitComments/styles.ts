import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  contentTitle: {
    fontFamily: Fonts.openSansBold,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  noReviews: {
    alignItems: 'center',
    marginTop: 30,
  },
  commentGrade: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  line: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.black,
    marginVertical: 10,
  },
})
