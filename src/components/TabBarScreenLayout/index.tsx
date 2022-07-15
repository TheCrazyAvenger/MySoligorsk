import { useFocusEffect, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'

export const TabBarScreenLayout = ({ children }: any) => {
  const insets = useSafeAreaInsets()
  const [backgroundColor, setBackgroundColor] = useState('white')

  const route = useRoute()

  const { colors } = useTheme()

  useFocusEffect(() => {
    switch (route.name) {
      // case Screens.home:
      //   setBackgroundColor(Colors.primary)
      //   break
      default:
        setBackgroundColor(colors.background)
    }
  })

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View style={[styles.container, {}]}>{children}</View>
    </View>
  )
}
