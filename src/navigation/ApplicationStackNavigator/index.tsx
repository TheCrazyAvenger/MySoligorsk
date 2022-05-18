import { Navigators, Screens } from '@/constants'
import { EmailVerificationScreen } from '@/screens'
import { selectIsWaitForVerification } from '@/selectors/applicationSettings'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'
import { BottomTabNavigator } from './BottomTabNavigator'

const Stack = createStackNavigator()

const bottomTabNavigatorOptions = {
  headerShown: false,
}

export const ApplicationStackNavigator = () => {
  const isWaitForVerification = useSelector(selectIsWaitForVerification)

  return (
    <Stack.Navigator>
      {isWaitForVerification && (
        <Stack.Screen
          name={Screens.emailVerification}
          options={{ headerShown: false }}
          component={EmailVerificationScreen}
        />
      )}
      <Stack.Screen name={Navigators.bottomTabs} component={BottomTabNavigator} options={bottomTabNavigatorOptions} />
    </Stack.Navigator>
  )
}
