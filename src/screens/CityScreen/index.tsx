import { TabBarScreenLayout } from '@/components'
import { Typography } from '@/ui'
import React from 'react'
import { ScrollView } from 'react-native'
import { styles } from './styles'

export const CityScreen = () => {
  return (
    <TabBarScreenLayout>
      <ScrollView style={styles.container}>
        <Typography.H2 style={styles.headerTitle}>Город</Typography.H2>
      </ScrollView>
    </TabBarScreenLayout>
  )
}
