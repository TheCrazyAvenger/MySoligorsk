import { HomeHeader, PlacesToVisit, TabBarScreenLayout } from '@/components'
import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './styles'

export const HomeScreen = () => {
  return (
    <TabBarScreenLayout>
      <ScrollView style={styles.container}>
        <HomeHeader />
        <PlacesToVisit />
      </ScrollView>
    </TabBarScreenLayout>
  )
}
