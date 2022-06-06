import { useGetWeatherQuery } from '@/api'
import { HomeHeader, PlacesToVisit, TabBarScreenLayout, WeatherCard } from '@/components'
import { Spinner } from '@/ui'
import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './styles'

export const HomeScreen = () => {
  const { data: weatheeData, isLoading } = useGetWeatherQuery({})

  if (isLoading) {
    return <Spinner />
  }

  return (
    <TabBarScreenLayout>
      <ScrollView style={styles.container}>
        <HomeHeader />
        <PlacesToVisit />
        {weatheeData && <WeatherCard data={weatheeData} />}
      </ScrollView>
    </TabBarScreenLayout>
  )
}
