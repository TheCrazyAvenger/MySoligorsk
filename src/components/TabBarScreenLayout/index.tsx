import { Colors } from '@/constants'
import { useFocusEffect, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'

export const TabBarScreenLayout = ({ children }: any) => {
  const insets = useSafeAreaInsets()
  const [backgroundColor, setBackgroundColor] = useState('white')
  const isIosFillLine = Platform.OS === 'ios' && insets.bottom > 30

  const route = useRoute()

  useFocusEffect(() => {
    switch (route.name) {
      // case Screens.home:
      //   setBackgroundColor(Colors.primary)
      //   break
      default:
        setBackgroundColor(Colors.white)
    }
  })

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            // paddingBottom: 54 - 22 + (isIosFillLine ? 30 : 0),
            marginTop: insets.top,
          },
        ]}
      >
        {children}
      </View>
    </View>
  )
}
