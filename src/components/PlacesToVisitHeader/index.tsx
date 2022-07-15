import { Fonts } from '@/constants'
import { Typography } from '@/ui'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

export const PlacesToVisitHeader = ({ animatedIndex, title }: BottomSheetBackdropProps | any) => {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const HEADER_MIN_HEIGHT = height * 0.1
  const { colors }: any = useTheme()

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    zIndex: 100,
  }))

  const containerStyle = useMemo(
    () => [
      styles.header,
      containerAnimatedStyle,
      { height: HEADER_MIN_HEIGHT, paddingTop: insets.top, backgroundColor: colors.navigation },
    ],
    [containerAnimatedStyle]
  )

  const handleGoBack = () => navigation.goBack()

  return (
    <Animated.View style={containerStyle}>
      <TouchableRipple borderless style={[styles.back, { top: insets.top + 15 }]} onPress={handleGoBack}>
        <Icon name='arrow-back' color={colors.text} size={27} />
      </TouchableRipple>
      <Typography.H3 size={19} style={{ fontFamily: Fonts.openSansBold }}>
        {title}
      </Typography.H3>
    </Animated.View>
  )
}
