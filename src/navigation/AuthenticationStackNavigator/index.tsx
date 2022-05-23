import { Screens } from '@/constants'
import { SignInScreen, SignUpScreen, WelcomeScreen } from '@/screens'
import { selectIsRegistered } from '@/selectors'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const authenticationStackNavigatorScreenOptions = {
  headerShown: false,
}

export const AuthenticationStackNavigator = () => {
  const isRegistered = useSelector(selectIsRegistered)

  return (
    <Stack.Navigator screenOptions={authenticationStackNavigatorScreenOptions}>
      <Stack.Screen name={Screens.welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.signUp} component={SignUpScreen} />
      <Stack.Screen name={Screens.signIn} component={SignInScreen} />
    </Stack.Navigator>
  )
}
