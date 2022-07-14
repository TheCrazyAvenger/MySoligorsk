import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingRight: 20,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  commentGrade: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: 'auto',
    alignSelf: 'flex-start',
    paddingVertical: 7,
  },
})
