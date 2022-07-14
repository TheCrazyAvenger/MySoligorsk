import { Colors, Fonts, Screens } from '@/constants'
import { useGetImage } from '@/hooks'
import { Skeleton, Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { styles } from './styles'

type Props = {
  data: any
  places: any
}

export const PlacesToVisitSimilarPlaces = ({ data, places }: Props) => {
  const navigation = useNavigation<any>()

  return (
    <View style={styles.content}>
      <Typography.H4 ml={20} mb={10}>
        Похожие места
      </Typography.H4>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data.map((item: any, i: number) => {
          const { title, category, workingHours } = item
          const isLast = i === data.length - 1

          const { uri, loading } = useGetImage({ placeName: title })

          const currentDay = new Date().getDay()
          const currentWorkingHours = workingHours[currentDay]
          const { open, close } = currentWorkingHours

          const [like, setLike] = useState(item.id === 1 ? true : false)

          const handleLike = () => setLike((prev) => !prev)
          const handleGoToDetails = () => navigation.replace(Screens.placestoVisitDetails, { data: item, places })

          return loading ? (
            <Skeleton key={title} width={230} height={320} />
          ) : (
            <TouchableRipple
              key={i}
              borderless
              onPress={handleGoToDetails}
              style={[styles.container, { marginRight: isLast ? 20 : 0 }]}
            >
              <ImageBackground
                style={[StyleSheet.absoluteFillObject, styles.image]}
                source={{ uri }}
                resizeMode={'cover'}
              >
                <View style={styles.imageInner}>
                  <Typography.H2 style={styles.title} color={Colors.white}>
                    {title}
                  </Typography.H2>
                  <Typography.Default color={Colors.white} style={{ fontFamily: Fonts.openSansSemiBold }}>
                    {category}
                  </Typography.Default>

                  <View style={styles.hoursContainer}>
                    <Typography.SmallDescription style={{ fontFamily: Fonts.openSansSemiBold }} size={11}>
                      {open} - {close}
                    </Typography.SmallDescription>
                  </View>
                  <View style={styles.likeButton}>
                    <TouchableRipple onPress={handleLike} borderless style={{ borderRadius: 20 }}>
                      <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
                    </TouchableRipple>
                  </View>
                </View>
              </ImageBackground>
            </TouchableRipple>
          )
        })}
      </ScrollView>
    </View>
  )
}
