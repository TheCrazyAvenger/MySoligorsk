import { Colors } from '@/constants'
import { Divider, Typography } from '@/ui'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { styles } from './styles'

type Params = {
  data: { user: string; grade: number; comment: string; date: string }[]
}

export const PlacesToVisitCommentsScreen = () => {
  const route = useRoute<any>()

  const { data }: Params = route.params

  return (
    <ScrollView style={styles.container}>
      {data.map((item, i) => {
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
    </ScrollView>
  )
}
