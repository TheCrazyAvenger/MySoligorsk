import { Colors, TabBar } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  navigator: {
    borderTopColor: 'transparent',
    backgroundColor: Colors.white,
    shadowColor: 'black',
    height: TabBar.tabBarHeight,
    borderTopLeftRadius: TabBar.buttonRadius,
    borderTopRightRadius: TabBar.buttonRadius,
    elevation: 60,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
  },
  tabBarButton: {
    top: TabBar.tabBarOffset,
  },
})
