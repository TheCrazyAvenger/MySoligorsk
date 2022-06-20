import { Colors } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGrey,
    marginVertical: 15,
  },
})
