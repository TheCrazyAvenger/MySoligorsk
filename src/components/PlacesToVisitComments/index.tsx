import { Colors, Fonts, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  data: { user: string; grade: number; comment: string; date: string }[]
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

export const PlacesToVisitComments = ({ data }: Props) => {
  const navigation = useNavigation<any>()

  const threeComments = useMemo(() => data.slice(0, 3), [data])
  const commentsSize = useMemo(() => data.length, [data])

  const handleGoToComments = () => {
    navigation.navigate(Screens.placesToVisitComments, { data })
  }

  return (
    <View style={styles.container}>
      <Typography.Default mb={10} style={styles.contentTitle}>{`Отзывы ${
        commentsSize !== 0 ? `(${commentsSize})` : ''
      }`}</Typography.Default>
      {data.length === 0 ? (
        <View style={[styles.comment, styles.noReviews]}>
          <Icon name={'chatbubbles-outline'} size={50} color={Colors.black} />
          <Typography.Default style={{ fontFamily: Fonts.openSansSemiBold, fontSize: 15 }}>
            Нет отзывов
          </Typography.Default>
        </View>
      ) : (
        threeComments.map((item, i) => {
          const { user, comment, grade, date } = item

          const commentDate = new Date(date).toLocaleDateString()

          return (
            <Animatable.View animation={zoomIn} key={i} duration={700} delay={100} style={styles.comment}>
              <View style={styles.commentSection}>
                <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
                <View>
                  <Typography.Default mb={3} style={{ fontFamily: Fonts.openSansSemiBold, fontSize: 15 }}>
                    {user}
                  </Typography.Default>
                  <View style={styles.commentGrade}>
                    {Array.from(Array(5).keys()).map((item) => {
                      const isColored = item < grade
                      return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.iconGrey} />
                    })}
                    <Typography.Description lineH={16} ml={5}>
                      {commentDate}
                    </Typography.Description>
                  </View>
                </View>
              </View>
              {comment ? <Typography.Default style={{ fontSize: 14 }}>{comment}</Typography.Default> : null}
            </Animatable.View>
          )
        })
      )}
      {commentsSize !== 0 && (
        <TouchableOpacity onPress={handleGoToComments}>
          <Typography.Default textAlign={'center'} mb={3} style={{ fontFamily: Fonts.openSansSemiBold, fontSize: 15 }}>
            Все отзывы
          </Typography.Default>
        </TouchableOpacity>
      )}
    </View>
  )
}
