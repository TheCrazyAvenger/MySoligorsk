import { Colors, Screens } from '@/constants'
import { useGetComments } from '@/hooks'
import { Button, Divider, Spinner, Typography } from '@/ui'
import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

interface IComment {
  user: string
  grade: number
  comment: string
  date: string
}

export const PlacesToVisitCommentsScreen = () => {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const { colors } = useTheme()

  const { title } = route.params
  const { comments: data, userComment, loading } = useGetComments({ placeName: title, size: 100 })

  if (loading) {
    return <Spinner />
  }

  const handleEditComment = () => {
    navigation.navigate(Screens.placesToVisitEditComments, {
      isEdit: userComment ? true : false,
      comment: userComment ?? null,
      title,
      grade: userComment?.grade ?? 0,
    })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        {data.map((item: IComment, i: number) => {
          const { user, comment, grade, date } = item

          return (
            <View key={i}>
              {i !== 0 && <Divider />}
              <View style={styles.commentSection}>
                <Image style={styles.avatar} source={require('@/assets/images/logo.png')} />
                <View>
                  <Typography.Default mb={3} type='semiBold'>
                    {user}
                  </Typography.Default>
                  <View style={styles.commentGrade}>
                    {Array.from(Array(5).keys()).map((item) => {
                      const isColored = item < grade
                      return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.grey} />
                    })}
                    <Typography.Subtitle mt={2} ml={5}>
                      {date}
                    </Typography.Subtitle>
                  </View>
                </View>
              </View>
              {comment ? (
                <Typography.Description mt={5} mh={20}>
                  {comment}
                </Typography.Description>
              ) : null}
            </View>
          )
        })}
      </ScrollView>
      <View style={{ backgroundColor: colors.navigation }}>
        <Button icon={'chatbubble'} buttonStyle={styles.button} onPress={handleEditComment}>
          {userComment ? (!userComment?.comment ? 'Добавить комментарий' : 'Редактировать') : 'Написать отзыв'}
        </Button>
      </View>
    </View>
  )
}
