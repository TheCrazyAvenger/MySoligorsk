import { selectUser } from '@/selectors'
import { selectDarkTheme } from '@/selectors/applicationSettings'
import { Typography } from '@/ui'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Image, StatusBar, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Account } from './components/Account'
import { Interface } from './components/Interface'
import { Other } from './components/Other'
import { styles } from './styles'

export const MenuScreen = () => {
  const { firstname, lastname, email, avatar } = useSelector(selectUser)
  const insets = useSafeAreaInsets()

  const darkTheme = useSelector(selectDarkTheme)

  const progress = useDerivedValue(() => {
    return darkTheme ? withTiming(1) : withTiming(0)
  })

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], ['#fff', '#1C1B1F'])
    return { backgroundColor }
  })

  const { dark, colors } = useTheme()
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor(colors.background)
      StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
    }
  }, [isFocused])

  return (
    <Animated.ScrollView style={rStyle} contentContainerStyle={[styles.container, { marginTop: insets.top + 50 }]}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} resizeMode={'contain'} source={{ uri: avatar }} />
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
    </Animated.ScrollView>
  )
}
