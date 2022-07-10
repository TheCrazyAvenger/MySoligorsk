import { Typography } from '@/ui'
import React from 'react'
import { Linking, useWindowDimensions, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableRipple } from 'react-native-paper'
import { styles } from './styles'

type Props = {
  item: any
  index: number
}

export const PlacesToVisitContentItem = ({ item }: Props) => {
  const { width } = useWindowDimensions()

  return (
    <TouchableRipple
      borderless
      style={[styles.container, { width: width * 0.33, height: width * 0.5 }]}
      onPress={() => Linking.openURL(item.onPress)}
    >
      <View style={{ flex: 1 }}>
        <FastImage
          style={styles.itemImage}
          source={
            item.image ?? {
              uri: item.imageUri,
            }
          }
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={{ justifyContent: 'space-between', flex: 1 }}>
          <Typography.Default numberOfLines={2} lineH={19} mt={2} type='semiBold'>
            {item.title}
          </Typography.Default>
          <Typography.Subtitle mt={3}>{item.description}</Typography.Subtitle>
        </View>
      </View>
    </TouchableRipple>
  )
}
