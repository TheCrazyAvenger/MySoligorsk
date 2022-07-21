import { Colors, Screens } from '@/constants'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'

export const withStatusBar = (Screen: any) => {
  return (props: any) => {
    const route = useRoute()
    const { colors, dark }: any = useTheme()

    useFocusEffect(() => {
      switch (route.name) {
        case Screens.placestoVisitDetails:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent')
          }
          StatusBar.setTranslucent(true)
          StatusBar.setBarStyle('light-content')
          break
        case Screens.placesToVisitPhoto:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(Colors.black)
          }
          StatusBar.setBarStyle('light-content')
          break
        case Screens.buses:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent')
          }
          StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
          break
        case Screens.welcome:
        case Screens.signIn:
        case Screens.signUp:
        case Screens.emailVerification:
        case Screens.acquaintanceAbout:
        case Screens.acquaintanceAddress:
        case Screens.acquaintanceBirthDate:
        case Screens.acquaintanceFinish:
        case Screens.acquaintanceInterests:
        case Screens.acquaintanceNames:
        case Screens.acquaintanceStart:
        case Screens.completeScreen:
        case Screens.menu:
        case Screens.home:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.background)
          }
          StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
          break
        default:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.navigation)
          }
          StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
      }
    })

    return (
      <View style={{ flex: 1 }}>
        <Screen {...props} />
      </View>
    )
  }
}
