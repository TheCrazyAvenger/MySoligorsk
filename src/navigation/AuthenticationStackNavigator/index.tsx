import { Screens } from '@/constants'
import { SignInScreen, SignUpScreen, WelcomeScreen } from '@/screens'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React from 'react'

const Stack = createNativeStackNavigator()

const authenticationStackNavigatorScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade_from_bottom',
}

export const AuthenticationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={authenticationStackNavigatorScreenOptions}>
      <Stack.Screen name={Screens.welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.signUp} component={SignUpScreen} />
      <Stack.Screen name={Screens.signIn} component={SignInScreen} />
    </Stack.Navigator>
  )
}
