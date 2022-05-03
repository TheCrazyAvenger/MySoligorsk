import { Colors, Screens } from '@/constants'
import { HomeScreen } from '@/screens'
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

const CustomTabBarButton = ({ customStyle, ...props }: any) => {
  const newProps = {
    ...props,
    style: [...props.style, customStyle],
    activeOpacity: 1,
  }
  return <TouchableOpacity {...newProps} />
}

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets()
  const isIosFillLine = Platform.OS === 'ios' && insets.bottom > 30

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabelStyle: { marginBottom: isIosFillLine ? 20 : 15 },
    tabBarActiveTintColor: Colors.iconRed,
    tabBarInactiveTintColor: Colors.grey,
    tabBarStyle: styles.navigator,
    // tabBarItemStyle: [{ padding: isIosFillLine ? 10 : 0 }],
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={Screens.home}
        component={HomeScreen}
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size} />,
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} customStyle={[styles.tabBarButton, { height: isIosFillLine ? 90 : 60 }]} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
