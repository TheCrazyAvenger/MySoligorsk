import { Colors, TabBar } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  navigator: {
    borderTopColor: 'transparent',
    backgroundColor: Colors.white,
    elevation: 0,
  },
  tabBarButton: {
    top: TabBar.tabBarOffset,
  },
})
