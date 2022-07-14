import { Colors, Fonts } from '@/constants'
import { Divider, Typography } from '@/ui'
import React from 'react'
import { View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
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
  }[]
}

export const MenuItem = ({ data, title }: Props) => {
  return (
    <>
      <Typography.Default mt={20} mb={5} ml={10} type='semiBold' color={Colors.iconGrey}>
        {title}
      </Typography.Default>
      <View style={styles.container}>
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
                  <Icon name='chevron-forward' size={20} color={Colors.iconGrey} />
                </View>
              </TouchableRipple>
            </View>
          )
        })}
      </View>
    </>
  )
}
