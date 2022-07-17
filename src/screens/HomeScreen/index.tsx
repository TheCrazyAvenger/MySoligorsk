import { useGetWeatherQuery } from '@/api'
import { HomeHeader, PlacesToVisit, TabBarScreenLayout, WeatherCard } from '@/components'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { styles } from './styles'

export const HomeScreen = () => {
  const { data: weatheeData, isLoading } = useGetWeatherQuery({})

  return (
    <TabBarScreenLayout>
      <ScrollView style={styles.container} contentContainerStyle={{ marginTop: 30 }}>
        <HomeHeader />
        <PlacesToVisit />
        <WeatherCard loading={isLoading} data={weatheeData} />
        <View style={{ marginBottom: 20 }} />
      </ScrollView>
    </TabBarScreenLayout>
  )
}
