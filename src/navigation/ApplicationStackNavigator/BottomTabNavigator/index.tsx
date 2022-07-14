import { Screens } from '@/constants'
import { BusesScreen, HomeScreen, MenuScreen } from '@/screens'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

const Tab = createMaterialBottomTabNavigator()

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator shifting labeled barStyle={styles.navigator}>
      <Tab.Screen
        name={Screens.home}
        component={HomeScreen}
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={`home${focused ? '' : '-outline'}`} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.buses}
        component={BusesScreen}
        options={{
          title: 'Транспорт',
          tabBarIcon: ({ color, focused }) => <Icon name={`bus${focused ? '' : '-outline'}`} size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name={Screens.menu}
        component={MenuScreen}
        options={{
          title: 'Меню',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={`menu${focused ? '' : '-outline'}`} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
