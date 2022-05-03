import { useFocusEffect, useRoute } from '@react-navigation/native'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'

export const withStatusBar = (Screen: any) => {
  return (props: any) => {
    const route = useRoute()
    useFocusEffect(() => {
      switch (route.name) {
        // case Screens.home:
        //   if (Platform.OS === 'android') {
        //     StatusBar.setBackgroundColor(Colors.primary)
        //   }
        //   StatusBar.setBarStyle('light-content')
        //   break
        default:
          if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('white')
          }
          StatusBar.setBarStyle('dark-content')
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
