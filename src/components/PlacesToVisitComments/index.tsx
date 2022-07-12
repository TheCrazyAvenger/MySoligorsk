import { Colors, Screens } from '@/constants'
import { Divider, Typography } from '@/ui'
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
      <Typography.H4 ml={20} mb={10}>
        Отзывы
      </Typography.H4>
      {threeComments.map((item, i) => {
        const { user, comment, grade, date } = item

        const commentDate = new Date(date).toLocaleDateString()

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
                    return <Icon key={item} name={'star'} size={16} color={isColored ? 'orange' : Colors.iconGrey} />
                  })}
                  <Typography.Subtitle mt={2} ml={5}>
                    {commentDate}
                  </Typography.Subtitle>
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
      })}
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
