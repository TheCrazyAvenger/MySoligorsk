import { Typography } from '@/ui'
import React from 'react'
import { Linking, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FastImage from 'react-native-fast-image'
import { styles } from './styles'

type Props = {
  item: any
  index: number
}

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

export const PlacesToVisitContentItem = ({ item, index }: Props) => {
  const { width } = useWindowDimensions()

  return (
    <Animatable.View animation={zoomIn} duration={700} delay={300 + index * 100}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.itemContainer, { width: width * 0.33, height: width * 0.5 }]}
        onPress={() => Linking.openURL(item.onPress)}
      >
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
          <Typography.Default numberOfLines={2} lineH={19} mt={2} style={styles.itemTitle}>
            {item.title}
          </Typography.Default>
          <Typography.Description mt={3}>{item.description}</Typography.Description>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  )
}
