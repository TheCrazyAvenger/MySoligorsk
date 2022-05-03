import { HomeScreen } from '@/screens'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets()
  const isIosFillLine = Platform.OS === 'ios' && insets.bottom > 30

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabelStyle: { marginBottom: isIosFillLine ? 20 : 8 },
    // tabBarStyle: styles.navigator,
    // tabBarItemStyle: [styles.tabBarItemStyle, { padding: isIosFillLine ? 10 : 0 }],
    // tabBarActiveTintColor: getTabBarIconColor(true),
    // tabBarInactiveTintColor: getTabBarIconColor(false),
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={screenOptions} />
    </Tab.Navigator>
  )
}
