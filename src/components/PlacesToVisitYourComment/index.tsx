import { Colors, Fonts } from '@/constants'
import { Typography } from '@/ui'
import { AirbnbRating } from '@rneui/themed'
import React from 'react'
import { Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  handleSetGrade: (...args: any) => any
  grade: number
  comment: any
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

export const PlacesToVisitYourComment = ({ handleSetGrade, grade, comment }: Props) => {
  return (
    <View>
      <View style={styles.container}>
        <Typography.Default style={styles.contentTitle}>Ваш отзыв</Typography.Default>
        <Typography.Default mb={20} style={{ fontSize: 15 }}>
          Поделитесь вашими впечатлениями
        </Typography.Default>
        {comment ? (
          <View style={styles.comment}>
            <View style={styles.commentSection}>
              <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
              <View>
                <Typography.Default mb={3} style={{ fontFamily: Fonts.openSansSemiBold, fontSize: 15 }}>
                  {comment.user}
                </Typography.Default>
                <View style={styles.commentGrade}>
                  {Array.from(Array(5).keys()).map((item) => {
                    const isColored = item < comment.grade
                    return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.iconGrey} />
                  })}
                  <Typography.Description lineH={16} ml={5}>
                    {comment.commentDate}
                  </Typography.Description>
                </View>
              </View>
            </View>
            {comment.comment ? (
              <Typography.Default style={{ fontSize: 14 }}>{comment.comment}</Typography.Default>
            ) : null}
          </View>
        ) : (
          <Animatable.View animation={zoomIn} duration={700} delay={100}>
            <View style={styles.reviewHeader}>
              <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
              <AirbnbRating
                onFinishRating={handleSetGrade}
                showRating={false}
                defaultRating={grade}
                size={35}
                selectedColor={'orange'}
              />
            </View>
          </Animatable.View>
        )}
      </View>
    </View>
  )
}
