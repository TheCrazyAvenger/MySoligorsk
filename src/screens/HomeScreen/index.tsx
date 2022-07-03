import { useGetWeatherQuery } from '@/api'
import { HomeHeader, PlacesToVisit, TabBarScreenLayout, WeatherCard } from '@/components'
import { Spinner } from '@/ui'
import React from 'react'
import { ScrollView } from 'react-native'
import * as Animatable from 'react-native-animatable'
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
        <Animatable.View animation={'fadeInUp'} duration={1000} delay={100}>
          {weatheeData && <WeatherCard data={weatheeData} />}
        </Animatable.View>
      </ScrollView>
    </TabBarScreenLayout>
  )
}
