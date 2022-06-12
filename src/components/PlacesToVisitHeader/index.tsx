import { Colors } from '@/constants'
import { Typography } from '@/ui'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

export const PlacesToVisitHeader = ({ animatedIndex, title }: BottomSheetBackdropProps | any) => {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const HEADER_MIN_HEIGHT = height * 0.1

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    zIndex: 100,
  }))

  const containerStyle = useMemo(
    () => [styles.header, containerAnimatedStyle, { height: HEADER_MIN_HEIGHT, paddingTop: insets.top }],
    [containerAnimatedStyle]
  )

  const handleGoBack = () => navigation.goBack()

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity style={[{ marginLeft: 20 }]} onPress={handleGoBack}>
        <Icon name='arrow-back' color={Colors.black} size={30} />
      </TouchableOpacity>
      <Typography.H3 ml={10} style={styles.contentTitle}>
        {title}
      </Typography.H3>
    </Animated.View>
  )
}
