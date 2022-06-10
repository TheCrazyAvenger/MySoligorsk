import { Colors, Fonts, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SharedElement } from 'react-navigation-shared-element'
import { styles } from './styles'

type Props = {
  data: any
  places: any
}

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
}

export const PlacesToVisitSimilarPlaces = ({ data, places }: Props) => {
  const navigation = useNavigation<any>()

  return (
    <View style={styles.content}>
      <Typography.Default ml={20} mb={10} style={styles.contentTitle}>
        Похожие места
      </Typography.Default>
      <ScrollView horizontal>
        {data.map((item: any, i: number) => {
          const { title, image, category, workingHours } = item
          const isLast = i === data.length - 1

          const currentDay = new Date().getDay()
          const currentWorkingHours = workingHours[currentDay - 1]
          const { open, close } = currentWorkingHours

          const [like, setLike] = useState(item.id === 1 ? true : false)

          const handleLike = () => setLike((prev) => !prev)
          const handleGoToDetails = () => navigation.replace(Screens.placestoVisitDetails, { data: item, places })

          return (
            <Animatable.View
              key={i}
              animation={zoomIn}
              duration={700}
              delay={100 + i * 100}
              style={[styles.container, { marginLeft: 20, marginRight: isLast ? 20 : 0 }]}
            >
              <TouchableOpacity activeOpacity={0.7} onPress={handleGoToDetails} style={[styles.container]}>
                <SharedElement id={`item.${data.id}.photo`} style={[StyleSheet.absoluteFillObject]}>
                  <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={image} resizeMode={'cover'} />
                </SharedElement>
                <View style={styles.imageInner}>
                  <SharedElement id={`item.${item.id}.title`}>
                    <Typography.H2 style={styles.title} color={Colors.white}>
                      {title}
                    </Typography.H2>
                  </SharedElement>
                  <SharedElement id={`item.${item.id}.subTitle`}>
                    <Typography.Description pt={5} style={{ fontFamily: Fonts.openSansSemiBold }} color={Colors.white}>
                      {category}
                    </Typography.Description>
                  </SharedElement>

                  <Typography.Default style={styles.time}>
                    {open} - {close}
                  </Typography.Default>
                  <View style={styles.likeButton}>
                    <TouchableOpacity onPress={handleLike} activeOpacity={0.7}>
                      <Icon name={like ? 'favorite' : 'favorite-outline'} size={30} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          )
        })}
      </ScrollView>
    </View>
  )
}
