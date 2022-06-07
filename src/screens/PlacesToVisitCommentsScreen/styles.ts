import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
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
