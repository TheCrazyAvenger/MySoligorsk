import { TabBarScreenLayout } from '@/components'
import { selectUser } from '@/selectors'
import { Typography } from '@/ui'
import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Account } from './components/Account'
import { Interface } from './components/Interface'
import { Other } from './components/Other'
import { styles } from './styles'

export const MenuScreen = () => {
  const { firstname, lastname, email } = useSelector(selectUser)
  const insets = useSafeAreaInsets()

  return (
    <TabBarScreenLayout>
      <ScrollView contentContainerStyle={[styles.container, { marginTop: insets.top + 50 }]}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} resizeMode={'contain'} source={require('@/assets/images/logo.png')} />
          </View>
          <Typography.H4 mt={10}>
            {firstname} {lastname}
          </Typography.H4>
          <Typography.Label mt={5}>{email}</Typography.Label>
        </View>
        <Interface />
        <Account />
        <Other />
        <View style={{ marginBottom: 90 }} />
      </ScrollView>
    </TabBarScreenLayout>
  )
}
