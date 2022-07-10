import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content-nonexpo'
import { styles } from './styles'

type Props = {
  width?: number | string
  height?: number | string
  style?: StyleProp<ViewStyle>
}

export const Skeleton = ({ width = '100%', height = '100%', style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <SkeletonContent
        animationDirection='horizontalLeft'
        containerStyle={[styles.skeleton, { width, height }]}
        isLoading={true}
        layout={[{ key: 'item', width: '100%', height: '100%', marginBottom: 6 }]}
      ></SkeletonContent>
    </View>
  )
}
