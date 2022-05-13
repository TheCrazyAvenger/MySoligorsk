import { Screens } from '@/constants'
import { SignUpScreen, WelcomeScreen } from '@/screens'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator()

const authenticationStackNavigatorScreenOptions = {
  headerShown: false,
}
export const AuthenticationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={authenticationStackNavigatorScreenOptions}>
      <Stack.Screen name={Screens.welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.signUp} component={SignUpScreen} />
    </Stack.Navigator>
  )
}
