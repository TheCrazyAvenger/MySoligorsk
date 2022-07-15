import { TabBar } from '@/constants'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  navigator: {
    borderTopColor: 'transparent',
    elevation: 0,
  },
  tabBarButton: {
    top: TabBar.tabBarOffset,
  },
})
