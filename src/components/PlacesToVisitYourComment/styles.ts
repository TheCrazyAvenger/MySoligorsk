import { Colors, Fonts } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },
  comment: {
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    marginBottom: 20,
    padding: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentTitle: {
    fontFamily: Fonts.openSansBold,
    color: Colors.black,
    textTransform: 'uppercase',
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentGrade: {
    flexDirection: 'row',
    marginBottom: 2,
  },
})
