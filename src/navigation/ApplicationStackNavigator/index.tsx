import { Navigators } from '@/constants'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { BottomTabNavigator } from './BottomTabNavigator'

const Stack = createStackNavigator()

const bottomTabNavigatorOptions = {
  headerShown: false,
}

export const ApplicationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Navigators.bottomTabs} component={BottomTabNavigator} options={bottomTabNavigatorOptions} />
    </Stack.Navigator>
  )
}
