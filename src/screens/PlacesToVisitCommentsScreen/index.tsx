import { Colors, Fonts } from '@/constants'
import { Divider, Typography } from '@/ui'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView, View } from 'react-native'
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
            <Typography.Default mb={3} style={{ fontFamily: Fonts.openSansSemiBold, fontSize: 16 }}>
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
            <Typography.Default style={{ fontSize: 16 }}>{comment}</Typography.Default>

            {i !== data.length - 1 && <Divider />}
          </View>
        )
      })}
    </ScrollView>
  )
}
