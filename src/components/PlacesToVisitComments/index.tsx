import { Colors, Screens } from '@/constants'
import { Typography } from '@/ui'
import { useNavigation } from '@react-navigation/native'
import React, { useMemo } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Props = {
  data: { user: string; grade: number; comment: string; date: string }[]
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
      <Typography.H4 ml={20} mb={10}>{`Отзывы ${commentsSize !== 0 ? `(${commentsSize})` : ''}`}</Typography.H4>
      {data.length === 0 ? (
        <View style={styles.noReviews}>
          <Icon name={'chatbubbles-outline'} size={50} color={Colors.black} />
          <Typography.Default type='semiBold'>Нет отзывов</Typography.Default>
        </View>
      ) : (
        threeComments.map((item, i) => {
          const { user, comment, grade, date } = item

          const commentDate = new Date(date).toLocaleDateString()

          return (
            <View key={i}>
              {i !== 0 && <View style={styles.line} />}
              <View style={styles.commentSection}>
                <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
                <View>
                  <Typography.Default mb={3} type='semiBold'>
                    {user}
                  </Typography.Default>
                  <View style={styles.commentGrade}>
                    {Array.from(Array(5).keys()).map((item) => {
                      const isColored = item < grade
                      return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.iconGrey} />
                    })}
                    <Typography.Description ml={5}>{commentDate}</Typography.Description>
                  </View>
                </View>
              </View>
              {comment ? (
                <Typography.Description mt={5} ml={20}>
                  {comment}
                </Typography.Description>
              ) : null}
            </View>
          )
        })
      )}
      {commentsSize !== 0 && (
        <TouchableOpacity onPress={handleGoToComments}>
          <Typography.Default textAlign={'center'} mt={15} mb={3} type='semiBold'>
            Все отзывы
          </Typography.Default>
        </TouchableOpacity>
      )}
    </View>
  )
}
