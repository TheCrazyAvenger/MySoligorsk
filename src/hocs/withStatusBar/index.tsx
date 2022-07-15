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
          StatusBar.setBarStyle('light-content')
          break
        case Screens.placesToVisitPhoto:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(Colors.black)
          }
          StatusBar.setBarStyle('light-content')
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
        <StatusBar backgroundColor={'white'} translucent barStyle='dark-content' />
        <Screen {...props} />
      </View>
    )
  }
}
