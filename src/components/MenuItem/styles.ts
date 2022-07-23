import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 0,
    justifyContent: 'flex-end',
    marginLeft: 42,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  menuItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
