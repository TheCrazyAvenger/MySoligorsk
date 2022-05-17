import { Screens } from '@/constants'
import {
  AcquaintanceAboutScreen,
  AcquaintanceBirthDateScreen,
  AcquaintanceInterestsScreen,
  AcquaintanceNamesScreen,
  AcquaintanceStartScreen,
  EmailVerificationScreen,
} from '@/screens'
import { selectIsWaitForVerification } from '@/selectors/applicationSettings'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

const acquaintanceStackNavigatorOptions = {
  headerShown: false,
}

export const AcquaintanceStackNavigator = () => {
  const isWaitForVerification = useSelector(selectIsWaitForVerification)

  return (
    <Stack.Navigator screenOptions={acquaintanceStackNavigatorOptions}>
      {isWaitForVerification && <Stack.Screen name={Screens.emailVerification} component={EmailVerificationScreen} />}
      <Stack.Screen name={Screens.acquaintanceStart} component={AcquaintanceStartScreen} />
      <Stack.Screen name={Screens.acquaintanceNames} component={AcquaintanceNamesScreen} />
      <Stack.Screen name={Screens.acquaintanceAbout} component={AcquaintanceAboutScreen} />
      <Stack.Screen name={Screens.acquaintanceBirthDate} component={AcquaintanceBirthDateScreen} />
      <Stack.Screen name={Screens.acquaintanceInterests} component={AcquaintanceInterestsScreen} />
    </Stack.Navigator>
  )
}
