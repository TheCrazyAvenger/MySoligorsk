import { Colors, Fonts } from '@/constants'
import { Divider, Typography } from '@/ui'
import React from 'react'
import { View } from 'react-native'
import { Switch, TouchableRipple, useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  title: string
  data: {
    title: string
    color: string
    icon: string
    moveTo: null | string
    id: number
    onPress?: (...args: any) => any
    switch?: boolean
    switchValue?: boolean
  }[]
}

export const MenuItem = ({ data, title }: Props) => {
  const { colors }: any = useTheme()
  return (
    <>
      <Typography.Default mt={20} mb={5} ml={10} type='semiBold' color={Colors.grey}>
        {title}
      </Typography.Default>
      <View style={[styles.container, { backgroundColor: colors.navigation }]}>
        {data.map((item) => {
          return (
            <View key={item.id}>
              {item.id !== 0 && <Divider style={styles.divider} />}
              <TouchableRipple
                borderless
                onPress={() => (item.onPress ? item.onPress() : {})}
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
      </View>
    </>
  )
}
