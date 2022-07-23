import { useGetWeatherQuery } from '@/api'
import { HomeHeader, PlacesToVisit, TabBarScreenLayout, WeatherCard } from '@/components'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ScrollView, StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { styles } from './styles'

export const HomeScreen = () => {
  const { data: weatheeData, isLoading } = useGetWeatherQuery({})

  const { dark, colors } = useTheme()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor(colors.background)
      StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
    }
  }, [isFocused])

  return (
    <TabBarScreenLayout>
      <ScrollView style={styles.container}>
        <HomeHeader />
        <PlacesToVisit />
        <WeatherCard loading={isLoading} data={weatheeData} />
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </TabBarScreenLayout>
  )
}
