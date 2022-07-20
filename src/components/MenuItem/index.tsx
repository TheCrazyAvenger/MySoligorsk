import { Colors, Fonts } from '@/constants'
import { selectDarkTheme } from '@/selectors/applicationSettings'
import { Divider, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View } from 'react-native'
import { Switch, TouchableRipple } from 'react-native-paper'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSelector } from 'react-redux'
import { styles } from './styles'

type Props = {
  title: string
  data: {
    title: string
    color: string
    icon: string
    screen?: null | string
    id: number
    onPress?: (...args: any) => any
    switch?: boolean
    switchValue?: boolean
  }[]
}

export const MenuItem = ({ data, title }: Props) => {
  const darkTheme = useSelector(selectDarkTheme)
  const navigation = useNavigation<any>()

  const progress = useDerivedValue(() => {
    return darkTheme ? withTiming(1) : withTiming(0)
  })

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], ['#F3EDF7', '#2A2831'])
    return { backgroundColor }
  })

  const handleNavigate = (screen: string) => navigation.navigate(screen)

  return (
    <>
      <Typography.Default mt={20} mb={5} ml={10} type='semiBold' color={Colors.grey}>
        {title}
      </Typography.Default>
      <Animated.View style={[styles.container, rStyle]}>
        {data.map((item) => {
          return (
            <View key={item.id}>
              {item.id !== 0 && <Divider style={styles.divider} />}
              <TouchableRipple
                borderless
                onPress={() => (item.screen ? handleNavigate(item.screen) : item.onPress ? item.onPress() : {})}
                style={styles.menuItemWrapper}
              >
                <View style={styles.menuItemInner}>
                  <View style={styles.menuItemContent}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                      <Icon name={item.icon} size={20} color={Colors.white} />
                    </View>
                    <Typography.H4 ml={8} style={{ fontFamily: Fonts.openSansRegular }}>
                      {item.title}
                    </Typography.H4>
                  </View>
                  {item.switch ? (
                    <Switch value={item.switchValue} onChange={item.onPress} color={Colors.primary} />
                  ) : (
                    <Icon name='chevron-forward' size={20} color={Colors.grey} />
                  )}
                </View>
              </TouchableRipple>
            </View>
          )
        })}
      </Animated.View>
    </>
  )
}
