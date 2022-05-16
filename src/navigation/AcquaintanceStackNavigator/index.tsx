import { Screens } from '@/constants'
import {
  AcquaintanceAboutScreen,
  AcquaintanceBirthDateScreen,
  AcquaintanceInterestsScreen,
  AcquaintanceNamesScreen,
  AcquaintanceStartScreen,
} from '@/screens'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

const Stack = createStackNavigator()

const acquaintanceStackNavigatorOptions = {
  headerShown: false,
}

export const AcquaintanceStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={acquaintanceStackNavigatorOptions}>
      <Stack.Screen name={Screens.acquaintanceStart} component={AcquaintanceStartScreen} />
      <Stack.Screen name={Screens.acquaintanceNames} component={AcquaintanceNamesScreen} />
      <Stack.Screen name={Screens.acquaintanceAbout} component={AcquaintanceAboutScreen} />
      <Stack.Screen name={Screens.acquaintanceBirthDate} component={AcquaintanceBirthDateScreen} />
      <Stack.Screen name={Screens.acquaintanceInterests} component={AcquaintanceInterestsScreen} />
    </Stack.Navigator>
  )
}
