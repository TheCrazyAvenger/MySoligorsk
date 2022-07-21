import { TabBarScreenLayout } from '@/components'
import { mapDarkStyle } from '@/constants'
import { Typography } from '@/ui'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { StatusBar, StyleSheet, useWindowDimensions } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const BusesScreen = () => {
  const { height } = useWindowDimensions()
  const bottomSheetRef: any = useRef()

  const isFocused = useIsFocused()

  useEffect(() => {
    bottomSheetRef?.current?.close()
  }, [isFocused])

  const { dark, colors }: any = useTheme()

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor(colors.navigation)
      StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
    }
  }, [isFocused])

  return (
    <GestureHandlerRootView style={[StyleSheet.absoluteFillObject]}>
      <TabBarScreenLayout>
        <StatusBar translucent backgroundColor={'transparent'} />
        <MapView
          customMapStyle={dark ? mapDarkStyle : []}
          scrollEnabled
          zoomEnabled
          showsUserLocation
          region={{
            latitude: 52.7910032,
            longitude: 27.5361309,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={[StyleSheet.absoluteFillObject]}
        />
        <BottomSheet
          backgroundStyle={{ backgroundColor: colors.background }}
          handleIndicatorStyle={{ backgroundColor: colors.text }}
          ref={bottomSheetRef}
          index={-1}
          snapPoints={[150, height - 100]}
        >
          <BottomSheetScrollView contentContainerStyle={styles.container}>
            <Typography.H2 style={styles.headerTitle}>Транспорт</Typography.H2>
          </BottomSheetScrollView>
        </BottomSheet>
      </TabBarScreenLayout>
    </GestureHandlerRootView>
  )
}
