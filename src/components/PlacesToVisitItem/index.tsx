import { Colors, Fonts, placesToVisitTheme, Screens } from '@/constants'
import { useGetImage } from '@/hooks'
import { Skeleton, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

type Props = {
  data: {
    title: string
    category: string
    image: any
    id: number
    workingHours: { id: number; day: string; open: string; close: string }[]
  }
  isLast: boolean
  index: number
  scrollX: Animated.Value
  places: any
}

export const PlacesToVisitItem = ({ data, isLast, index, scrollX, places }: Props) => {
  if (!data) {
    return (
      <Skeleton
        style={[{ marginLeft: 10, paddingHorizontal: 0 }]}
        width={placesToVisitTheme.ITEM_WIDTH}
        height={placesToVisitTheme.ITEM_HEIGHT}
      />
    )
  }

  const navigation = useNavigation<any>()
  const { FULL_SIZE, ITEM_WIDTH, ITEM_HEIGHT } = placesToVisitTheme

  const { title, category, id, workingHours } = data
  const [like, setLike] = useState(id === 1 ? true : false)

  const currentDay = new Date().getDay()
  const currentWorkingHours = workingHours[currentDay]
  const { open, close } = currentWorkingHours

  const handleLike = () => setLike((prev) => !prev)
  const handleGoToDetails = () => navigation.navigate(Screens.placestoVisitDetails, { data, places })

  const inputRange = [(index - 1) * FULL_SIZE, index * FULL_SIZE, (index + 1) * FULL_SIZE]
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
  })
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1.2, 1],
  })
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  })

  const { uri, loading } = useGetImage({ placeName: title })

  return (
    <View style={styles.content}>
      {loading || !data ? (
        <Skeleton
          style={[{ marginLeft: 10, paddingHorizontal: 0 }]}
          width={placesToVisitTheme.ITEM_WIDTH}
          height={placesToVisitTheme.ITEM_HEIGHT}
        />
      ) : (
        <TouchableRipple
          borderless
          onPress={handleGoToDetails}
          style={[styles.container, { marginRight: isLast ? ITEM_WIDTH : 0 }]}
        >
          <View style={styles.content}>
            <Animated.Image
              style={[StyleSheet.absoluteFillObject, styles.image, { transform: [{ scale }] }]}
              source={{ uri }}
              resizeMode={'cover'}
            />
            <Animated.View style={[styles.imageInner, { transform: [{ scale }] }]}>
              <Animated.Text style={[styles.title, { transform: [{ translateX }] }]}>{title}</Animated.Text>
              <Animated.Text style={[styles.subTitle, { transform: [{ translateX }] }]}>{category}</Animated.Text>
              <Animated.View style={[styles.hoursContainer, { opacity }]}>
                <Typography.SmallDescription style={{ fontFamily: Fonts.openSansSemiBold }} size={11}>
                  {open} - {close}
                </Typography.SmallDescription>
              </Animated.View>
              <Animated.View style={[styles.likeButton, { opacity }]}>
                <TouchableRipple onPress={handleLike} borderless style={{ borderRadius: 20 }}>
                  <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
                </TouchableRipple>
              </Animated.View>
            </Animated.View>
          </View>
        </TouchableRipple>
      )}
      {isLast && (
        <Typography.Default style={{ position: 'absolute', right: ITEM_WIDTH / 2.8, top: ITEM_HEIGHT / 2 }}>
          Больше
        </Typography.Default>
      )}
    </View>
  )
}
